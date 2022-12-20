import React, { useEffect, useState } from "react";

import { useApolloClient } from "@apollo/client";
import { PeerEvaluationTeachingMember } from "@generated/type-graphql";
import { Form, Formik } from "formik";
import { MUIDataTableColumn, MUIDataTableOptions } from "mui-datatables";
import { NextPage, NextPageContext } from "next";
import { getSession } from "next-auth/react";
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
import useGetUserPeerEvaluationTeachingMember from "@/requests/hooks/query/useGetUserPeerEvaluationTeachingMember";
import routing from "@/routing";
import { ArrayObject } from "@/types/object";
import { NextPagePros } from "@/types/pages";
import {
  RoleScope,
  errorNotification,
  loadingNotification,
  peerEvaluationStudentTeamResultComment,
  successNotification,
} from "@/utils";
import {
  ObjectArray,
  ObjectNormalizedType,
  getMergedKeyValuesObject,
  getNormalizedObjectArray,
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

interface IPeerEvaluationStudentTeam {
  id: string;
  name: string;
  mark: string;
}

const baseTestId = "page-lecturer-peer-evaluation";

const Teams: NextPage<NextPagePros> = ({ session }) => {
  const peerEvaluationStudentTeamsColumnOrder = ["_", "id", "name", "mark", "__"];

  const apolloClient = useApolloClient();

  const { push, query } = useRouter();

  const [isRedirecting, setRedirecting] = useState(false);

  const [peerEvaluationId, setPeerEvaluationId] = useState<string | null>(null);

  const [teachingMemberRole, setTeachingMemberRole] = useState<PeerEvaluationTeachingMember["role"]>("VIEWER");

  const [peerEvaluationTableFormInitialState, setPeerEvaluationTableFormInitialState] =
    useState<IPeerEvaluationStudentTableForm | null>(null);

  const [getPeerEvaluationStudentTeams, { loading: loadingFetch, data, refetch }] = useGetPeerEvaluationStudentTeams(
    "useGetPeerEvaluationStudentTeams"
  );

  const [
    getPeerEvaluationTeachingMember,
    { loading: loadingTeachingMember, error: errorTeachingMember, data: dataTeachingMember },
  ] = useGetUserPeerEvaluationTeachingMember("GetUserPeerEvaluationTeachingMember");

  const [updatePeerEvaluationStudentTeamCalculateResultsTable] =
    useUpdatePeerEvaluationStudentTeamCalculateResultsTable("UpdatePeerEvaluationStudentTeamCalculateResultsTable");

  const [deletePeerEvaluationStudentTeamId, setDeletePeerEvaluationStudentTeamId] = useState<string | null>(null);

  const [isDeletePeerEvaluationStudentTeamConfirmationOpen, setDeletePeerEvaluationStudentTeamConfirmationOpen] =
    useState(false);

  const [updatePeerEvaluationStudentTeam] = useUpdatePeerEvaluationStudentTeam("UseUpdatePeerEvaluationStudentTeam");

  const onViewResultsPeerEvaluationTeam = async (teamName: string) => {
    try {
      await push({
        pathname: `${routing.lecturer.peerEvaluation.result.team}/${peerEvaluationId}/${teamName}`,
      });
      setRedirecting(true);
    } catch {}
  };

  const onCalculateMarks = async () => {
    if (peerEvaluationId) {
      await updatePeerEvaluationStudentTeamCalculateResultsTable({
        variables: {
          where: {
            peerEvaluationId: peerEvaluationId,
          },
        },
      });

      await refetchTableStudentTeamsData();
    }
  };

  const onDeletePeerEvaluationColumnAccept = async () => {
    loadingNotification("Deleting team", "DeletePeerEvaluationStudentTeam");

    const peerEvaluationStudentTeamToDelete = data?.peerEvaluationStudentTeams.find(
      ({ id }) => deletePeerEvaluationStudentTeamId === id
    );

    if (
      peerEvaluationStudentTeamToDelete?._count?.peerEvaluationStudentList &&
      peerEvaluationStudentTeamToDelete._count.peerEvaluationStudentList > 0
    ) {
      errorNotification("Whoops... You cannot delete a team with students", "DeletePeerEvaluationStudentTeam");
      setDeletePeerEvaluationStudentTeamConfirmationOpen(false);
      return null;
    }

    const { errors } = await deletePeerEvaluationStudentTeam(apolloClient, deletePeerEvaluationStudentTeamId || "");

    if (errors?.length) {
      errorNotification("Whoops... You cannot delete a team with students", "DeletePeerEvaluationStudentTeam");
    } else {
      successNotification("Team deleted successfully", "DeletePeerEvaluationStudentTeam");
    }

    await refetchTableStudentTeamsData();

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

  const isReadOnlyPeerEvaluation = teachingMemberRole === "VIEWER";

  const validationSchema = object({
    marks: array().of(
      object().shape({
        mark: number().min(0, "Value needs to be higher than 0").max(100, "Value cannot be higher than 100").nullable(),
      })
    ),
    names: array().of(
      object().shape({
        name: string()
          .min(2, "Team name is too short")
          .max(330, "Team name is too long")
          .required("Team name is required")
          .matches(/^\S(?!.*\s{2}).*?\S$/, "Team name cannot start or end with a empty spaces")
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
        comment: peerEvaluationStudentTeamResultComment.comment,
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
                testId={`${baseTestId}-results`}
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
              testId="page-lecturer-peer-evaluation-teams-team-name"
              name={`names[${tableMeta.rowIndex}].name`}
              props={{
                disabled: isReadOnlyPeerEvaluation,
                fullWidth: true,
                label: "Team Name",
                name: `names[${tableMeta.rowIndex}].name`,
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
            <TextFieldFormDataTable
              updateDataTableFormValue={updateValue}
              validationSchema={validationSchema}
              validationFieldPath={"marks.mark"}
              testId="page-lecturer-peer-evaluation-teams-team-mark"
              name={`marks[${tableMeta.rowIndex}].mark`}
              props={{
                disabled: isReadOnlyPeerEvaluation,
                fullWidth: true,
                inputProps: { min: 0, max: 100, step: "0.01" },
                label: "Mark",
                name: `marks[${tableMeta.rowIndex}].mark`,
                type: "number",
                variant: "outlined",
              }}
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
              testId="page-lecturer-peer-evaluation-teams-team-comment"
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
    onTableChange: (action, tableState) => {
      if (action === "propsUpdate") {
        tableState.selectedRows.data = [];
        tableState.selectedRows.lookup = [];
      }
    },
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

  const isLoading = isRedirecting || loadingTeachingMember || loadingFetch || !!!data;

  const isError = !!errorTeachingMember;

  useEffect(() => {
    const slug = query.slug;

    if (Array.isArray(slug) && session) {
      const peerEvaluationIdSlug = slug[0];

      setPeerEvaluationId(peerEvaluationIdSlug);

      getPeerEvaluationStudentTeams({
        variables: {
          where: {
            peerEvaluationId: {
              equals: peerEvaluationIdSlug,
            },
          },
          orderBy: [
            {
              createdAt: "asc",
            },
          ],
        },
      });

      getPeerEvaluationTeachingMember({
        variables: {
          where: {
            userId_peerEvaluationId: {
              peerEvaluationId: peerEvaluationIdSlug,
              userId: session.user.id,
            },
          },
        },
      });
    }
  }, [getPeerEvaluationStudentTeams, getPeerEvaluationTeachingMember, query.slug, session]);

  useEffect(() => {
    if (dataTeachingMember) {
      const teachingMemberRole =
        session?.user.role === "ADMIN" ? "OWNER" : dataTeachingMember.peerEvaluationTeachingMember.role;

      setTeachingMemberRole(teachingMemberRole);
    }
  }, [dataTeachingMember, session?.user.role]);

  useEffect(() => {
    if (data) {
      const formInitialValues = {
        marks: objectToArrayOfObject("mark", data.peerEvaluationStudentTeams as unknown as ObjectArray),
        ids: objectToArrayOfObject("id", data.peerEvaluationStudentTeams as unknown as ObjectArray),
        names: objectToArrayOfObject("name", data.peerEvaluationStudentTeams as unknown as ObjectArray),
        comments: objectToArrayOfObject("comment", data.peerEvaluationStudentTeams as unknown as ObjectArray),
      } as unknown as IPeerEvaluationStudentTableForm;

      setPeerEvaluationTableFormInitialState(formInitialValues);
    }
  }, [data]);

  const refetchTableStudentTeamsData = async () => {
    if (peerEvaluationId) {
      refetch({
        where: {
          peerEvaluationId: {
            equals: peerEvaluationId,
          },
        },
      });
    }
  };

  // TODO: Remove any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = async (data: any) => {
    const dataModuleNormalized = getNormalizedObjectArray(data as unknown as ObjectNormalizedType);

    for (const index in dataModuleNormalized) {
      const { name, mark, comment } = dataModuleNormalized[index];

      const teamName = name as string;

      const currentName = peerEvaluationTableFormInitialState?.names[index].name;

      await updatePeerEvaluationStudentTeam({
        variables: {
          data: {
            mark: {
              set: mark,
            },
            name: {
              set: teamName.trim(),
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

    await refetchTableStudentTeamsData();
  };

  return (
    <Base topLeftComponent="menu" loading={isLoading} error={isError}>
      <PageTitle title={"Teams"} testId="page-update-peer-evaluation-title" variant="h4" margin="2em" />

      {data && validationSchema && peerEvaluationTableFormInitialState && (
        <Formik
          initialValues={peerEvaluationTableFormInitialState}
          validationSchema={validationSchema}
          onSubmit={async (data, { resetForm }) => {
            await onSubmit(data);
            resetForm({
              values: data,
            });
          }}
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

export const getServerSideProps = async (context: NextPageContext) => {
  return {
    props: {
      session: await getSession(context),
      protected: true,
      roles: [RoleScope.ADMIN, RoleScope.LECTURER],
    },
  };
};

export default Teams;
