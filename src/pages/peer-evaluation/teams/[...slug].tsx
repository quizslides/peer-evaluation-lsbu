import React, { useEffect, useState } from "react";

import { useApolloClient } from "@apollo/client";
import { Form, Formik } from "formik";
import { MUIDataTableColumn, MUIDataTableOptions } from "mui-datatables";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { array, number, object, string } from "yup";

import {
  Base,
  Button,
  ConfirmationDialog,
  DataTable,
  DataTableDeleteActionButtonIcon,
  IconButtonWrapper,
  PageTitle,
  SelectFieldFormDataTable,
  TextFieldFormDataTable,
  WarningUnsavedForm,
} from "@/components";
import DataTableMarkActionButtonIcon from "@/components/DataTableMarkActionButtonIcon/DataTableMarkActionButtonIcon";
import { PeerEvaluationNavigationFab } from "@/containers";
import { FieldWrapper } from "@/forms/style";
import client from "@/graphql/client";
import { SaveIcon } from "@/icons";
import deletePeerEvaluationStudentTeam from "@/requests/direct/mutation/deletePeerEvaluationStudentTeam";
import peerEvaluationStudentTeamExist from "@/requests/direct/query/peerEvaluationStudentTeamExist";
import useUpdatePeerEvaluationStudentTeam from "@/requests/hooks/mutations/useUpdatePeerEvaluationStudentTeam";
import useUpdatePeerEvaluationStudentTeamCalculateResultsTable from "@/requests/hooks/mutations/useUpdatePeerEvaluationStudentTeamCalculateResultsTable";
import useGetPeerEvaluationStudentTeams from "@/requests/hooks/query/useGetPeerEvaluationStudentTeams";
import routing from "@/routing";
import { ArrayObject } from "@/types/object";
import { RoleScope, errorNotification, loadingNotification, successNotification } from "@/utils";
import {
  ObjectArray,
  ObjectNormalizedType,
  getMergedKeyValuesObject,
  getNormalizedObjectArray,
  getRangeNumberObject,
  objectToArrayOfObject,
} from "@/utils/form";

interface IPeerEvaluationStudentTableForm {
  marks: [
    {
      mark: number | string;
    }
  ];
  names: [
    {
      name: string;
    }
  ];
  ids: [
    {
      id: string;
    }
  ];
  comments: [
    {
      comment: string;
    }
  ];
}

const Teams: NextPage = () => {
  const apolloClient = useApolloClient();

  const { push, query } = useRouter();

  const [isRedirecting, setRedirecting] = useState(false);

  const [peerEvaluationId, setPeerEvaluationId] = useState<string | null>(null);

  const [peerEvaluationTableFormInitialState, setPeerEvaluationTableFormInitialState] =
    useState<IPeerEvaluationStudentTableForm | null>(null);

  const [getPeerEvaluationStudentTeams, { loading: loadingFetch, data, refetch }] = useGetPeerEvaluationStudentTeams(
    "useGetPeerEvaluationStudentTeams"
  );

  const [updatePeerEvaluationStudentTeamCalculateResultsTable] =
    useUpdatePeerEvaluationStudentTeamCalculateResultsTable("UpdatePeerEvaluationStudentTeamCalculateResultsTable");

  const [deletePeerEvaluationStudentTeamId, setDeletePeerEvaluationStudentTeamId] = useState<string | null>(null);

  const [isDeletePeerEvaluationStudentTeamConfirmationOpen, setDeletePeerEvaluationStudentTeamConfirmationOpen] =
    useState(false);

  const [updatePeerEvaluationStudentTeam] = useUpdatePeerEvaluationStudentTeam("UseUpdatePeerEvaluationStudentTeam");

  const rangeSelectField = getRangeNumberObject(100, 0);

  const onViewResultsPeerEvaluationTeam = (teamName: string) => {
    setRedirecting(true);
    push({
      pathname: `${routing.peerEvaluation.result.team}/${peerEvaluationId}/${teamName}`,
    });
  };

  const peerEvaluationStudentTeamsColumnOrder = ["_", "id", "name", "mark", "__"];

  interface IPeerEvaluationStudentTeam {
    id: string;
    name: string;
    mark: string;
  }

  const onCalculateMarks = async () => {
    if (peerEvaluationId) {
      await updatePeerEvaluationStudentTeamCalculateResultsTable({
        variables: {
          where: {
            peerEvaluationId: peerEvaluationId,
          },
        },
      });

      await refetch();
    }
  };

  const onDeletePeerEvaluationColumnAccept = async () => {
    loadingNotification("Deleting team", "DeletePeerEvaluationStudentTeam");

    const { errors } = await deletePeerEvaluationStudentTeam(
      apolloClient,
      peerEvaluationId || "",
      deletePeerEvaluationStudentTeamId || ""
    );

    if (errors?.length) {
      errorNotification("Whoops... You cannot delete a team with students", "DeletePeerEvaluationStudentTeam");
    } else {
      successNotification("Team deleted successfully", "DeletePeerEvaluationStudentTeam");
    }

    await refetch();

    setDeletePeerEvaluationStudentTeamConfirmationOpen(false);
  };

  const onColumnDeleteSelection = (data: ArrayObject) => {
    const dataColumn = getMergedKeyValuesObject(
      peerEvaluationStudentTeamsColumnOrder,
      data
    ) as unknown as IPeerEvaluationStudentTeam;

    setDeletePeerEvaluationStudentTeamId(dataColumn.id);
    setDeletePeerEvaluationStudentTeamConfirmationOpen(true);
  };

  const validationSchema = object({
    marks: array().of(
      object().shape({
        mark: number().required("Mark is required"),
      })
    ),
    names: array().of(
      object().shape({
        name: string()
          .min(2, "Team name is too short")
          .max(330, "Team name is too long")
          .required("Team name is required")
          .test({
            name: "unique-peer-evaluation-team-name",
            message: "Team name must be unique within the peer evaluation",
            test: async (teamName, fieldData) => {
              const fieldDataSanitized = fieldData.options as { index: number };

              if (peerEvaluationTableFormInitialState?.names[fieldDataSanitized.index].name === teamName) {
                return true;
              }

              if (teamName && peerEvaluationId) {
                const { data } = await peerEvaluationStudentTeamExist(client, peerEvaluationId, teamName);

                return !data.findFirstPeerEvaluationStudentTeam;
              }

              // If backend is not or has not responded, the validation should return false as the input will be invalid
              return false;
            },
          }),
      })
    ),
    comments: array().of(
      object().shape({
        comment: string().nullable(),
      })
    ),
  });

  const dataTableColumns: MUIDataTableColumn[] = [
    {
      name: "",
      options: {
        viewColumns: false,
        filter: false,
        sort: false,
        empty: false,
        download: false,
        customBodyRender: (_, tableMeta) => {
          return (
            <FieldWrapper marginBottom="1em">
              <Button
                onClick={() => {
                  const dataTable = tableMeta.currentTableData[tableMeta.rowIndex] as unknown as { data: string };
                  onViewResultsPeerEvaluationTeam(dataTable.data[2] as string);
                }}
                testId={""}
                variant="contained"
              >
                Results
              </Button>
            </FieldWrapper>
          );
        },
      },
    },
    {
      name: "id",
      label: "ID",
      options: {
        display: "excluded",
      },
    },
    {
      name: "name",
      label: "Name",
      options: {
        customBodyRender: (_, tableMeta, updateValue) => (
          <FieldWrapper marginBottom="1em">
            <TextFieldFormDataTable
              updateDataTableFormValue={updateValue}
              validationSchema={validationSchema}
              validationFieldPath={"names.name"}
              testId=""
              name={`names[${tableMeta.rowIndex}].name`}
              props={{
                name: `names[${tableMeta.rowIndex}].name`,
                fullWidth: true,
                label: "Team Name",
                type: "text",
                variant: "outlined",
              }}
            />
          </FieldWrapper>
        ),
      },
    },
    {
      name: "mark",
      label: "Mark",
      options: {
        customBodyRender: (_, tableMeta, updateValue) => (
          <FieldWrapper marginBottom="1em">
            <SelectFieldFormDataTable
              name={`marks[${tableMeta.rowIndex}].mark`}
              options={rangeSelectField}
              props={{
                name: `marks[${tableMeta.rowIndex}].mark`,
                required: true,
                label: "Mark",
                fullWidth: true,
              }}
              testId=""
              updateDataTableFormValue={updateValue}
              validationSchema={validationSchema}
              validationFieldPath={`marks[${tableMeta.rowIndex}].mark`}
            />
          </FieldWrapper>
        ),
      },
    },
    {
      name: "comment",
      label: "Comment",
      options: {
        customBodyRender: (_, tableMeta, updateValue) => (
          <FieldWrapper marginBottom="1em">
            <TextFieldFormDataTable
              updateDataTableFormValue={updateValue}
              validationSchema={validationSchema}
              validationFieldPath={"comments.comment"}
              testId=""
              name={`comments[${tableMeta.rowIndex}].comment`}
              props={{
                name: `comments[${tableMeta.rowIndex}].comment`,
                fullWidth: true,
                multiline: true,
                label: "Comment",
                type: "text",
                variant: "outlined",
              }}
            />
          </FieldWrapper>
        ),
      },
    },
    {
      name: "_count.peerEvaluationStudentList",
      label: "Total Students",
      options: {
        customBodyRender: (value) => <FieldWrapper marginBottom="1em"> {value}</FieldWrapper>,
      },
    },
  ];

  const dataTableOptions: MUIDataTableOptions = {
    textLabels: {
      body: {
        noMatch: "Sorry, no student teams",
      },
    },
    responsive: "simple",
    tableBodyMaxHeight: "100%",
    selectableRows: "single",
    selectableRowsHeader: true,
    rowHover: true,
    download: true,
    sort: false,
    filter: true,
    search: true,
    viewColumns: true,
    pagination: true,
    print: false,
    enableNestedDataAccess: ".",
    draggableColumns: {
      enabled: true,
    },
    rowsPerPage: 100,
    customToolbar: (_) => (
      <>
        <DataTableMarkActionButtonIcon
          onClick={onCalculateMarks}
          testId={"-refresh-peer-evaluation-table"}
          toolTipLabel={"Calculate Marks"}
        />
        <IconButtonWrapper type="submit" testId={""} tooltip={"Save"}>
          <SaveIcon testId="" fontSize="medium" color="inherit" />
        </IconButtonWrapper>
      </>
    ),
    customToolbarSelect: (selectedRows, displayData) => (
      <DataTableDeleteActionButtonIcon
        testId={""}
        toolTipLabel={"Delete"}
        onClick={() => onColumnDeleteSelection(displayData[selectedRows.data[0].index].data)}
      />
    ),
  };

  const isLoading = isRedirecting || loadingFetch || !!!data;

  useEffect(() => {
    const slug = query.slug;

    if (Array.isArray(slug)) {
      setPeerEvaluationId(slug[0]);

      getPeerEvaluationStudentTeams({
        variables: {
          where: {
            peerEvaluationId: {
              equals: slug[0],
            },
          },
        },
      });
    }
  }, [getPeerEvaluationStudentTeams, query.slug]);

  useEffect(() => {
    if (data) {
      const initialValues = {
        marks: objectToArrayOfObject("mark", data.peerEvaluationStudentTeams as unknown as ObjectArray),
        ids: objectToArrayOfObject("id", data.peerEvaluationStudentTeams as unknown as ObjectArray),
        names: objectToArrayOfObject("name", data.peerEvaluationStudentTeams as unknown as ObjectArray),
        comments: objectToArrayOfObject("comment", data.peerEvaluationStudentTeams as unknown as ObjectArray),
      } as unknown as IPeerEvaluationStudentTableForm;

      setPeerEvaluationTableFormInitialState(initialValues);
    }
  }, [data]);

  // TODO: Remove any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = async (data: any) => {
    const dataModuleNormalized = getNormalizedObjectArray(data as unknown as ObjectNormalizedType);

    for (const index in dataModuleNormalized) {
      const { name, mark, comment } = dataModuleNormalized[index];

      const currentName = peerEvaluationTableFormInitialState?.names[index].name;

      await updatePeerEvaluationStudentTeam({
        variables: {
          data: {
            mark: {
              set: mark,
            },
            name: {
              set: name,
            },
            comment: {
              set: comment,
            },
          },
          where: {
            name_peerEvaluationId: {
              peerEvaluationId: peerEvaluationId || "",
              name: currentName || "",
            },
          },
        },
      });
    }
  };

  return (
    <Base topLeftComponent="menu" loading={isLoading}>
      <PageTitle title={"Teams"} testId="page-update-peer-evaluation-title" variant="h4" margin="2em" />

      {data && validationSchema && peerEvaluationTableFormInitialState && (
        <Formik
          initialValues={peerEvaluationTableFormInitialState}
          validationSchema={validationSchema}
          onSubmit={(data) => onSubmit(data)}
        >
          {({ dirty }) => (
            <Form>
              <WarningUnsavedForm areChangesUnsaved={dirty} />
              <DataTable
                testId={"peer-evaluation-students-datatable"}
                isVisible={!!data}
                data={data.peerEvaluationStudentTeams}
                columns={dataTableColumns}
                options={dataTableOptions}
              />
            </Form>
          )}
        </Formik>
      )}

      <ConfirmationDialog
        testId={""}
        isOpen={isDeletePeerEvaluationStudentTeamConfirmationOpen}
        title={"Delete Team"}
        textContent={"Delete team"}
        onAccept={onDeletePeerEvaluationColumnAccept}
        onClose={() => setDeletePeerEvaluationStudentTeamConfirmationOpen(false)}
        closeText={"Cancel"}
        acceptText={"Accept"}
      />

      <PeerEvaluationNavigationFab setRedirecting={() => setRedirecting(true)} />
    </Base>
  );
};

export const getStaticPaths = async () => {
  return { paths: [], fallback: true };
};

export const getStaticProps = () => {
  return {
    props: {
      protected: true,
      roles: [RoleScope.ADMIN, RoleScope.LECTURER],
    },
  };
};

export default Teams;
