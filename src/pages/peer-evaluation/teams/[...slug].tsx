import React, { useEffect, useState } from "react";

import { PeerEvaluationStudentTeam, PeerEvaluationStudentTeamWhereInput } from "@generated/type-graphql";
import { Form, Formik } from "formik";
import { MUIDataTableColumn, MUIDataTableOptions } from "mui-datatables";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { array, number, object, string } from "yup";
import { OptionalObjectSchema } from "yup/lib/object";
import { AnyObject } from "yup/lib/types";

import { Base, Button, DataTable, PageTitle, SelectFieldFormDataTable } from "@/components";
import { PeerEvaluationNavigationFab } from "@/containers";
import { FieldWrapper } from "@/forms/style";
import useUpdatePeerEvaluationStudentTeam from "@/requests/hooks/mutations/useUpdatePeerEvaluationStudentTeam";
import useGetPeerEvaluationStudentTeams from "@/requests/hooks/query/useGetPeerEvaluationStudentTeams";
import routing from "@/routing";
import { RoleScope } from "@/utils";
import {
  ObjectArray,
  ObjectNormalizedType,
  getNormalizedObjectArray,
  getRangeNumberObject,
  objectToArrayOfObject,
} from "@/utils/form";

interface IPeerEvaluationStudentTableForm {
  [x: string]: {
    [x: string]: object;
  }[];
}

const Teams: NextPage = () => {
  const validationSchema = object({
    marks: array().of(
      object().shape({
        mark: number().required("mark is required"),
      })
    ),
  });

  const { push, query, isFallback } = useRouter();

  const [isRedirecting, setRedirecting] = useState(false);

  const [peerEvaluationId, setPeerEvaluationId] = useState<string | null>(null);

  const [peerEvaluationTableFormInitialState, setPeerEvaluationTableFormInitialState] = useState<
    IPeerEvaluationStudentTableForm[] | null
  >(null);

  const [getPeerEvaluationStudentTeams, { loading: loadingFetch, error, data }] = useGetPeerEvaluationStudentTeams(
    "useGetPeerEvaluationStudentTeams"
  );

  const [updatePeerEvaluationStudentTeam, { data: dataUpdated, loading, reset }] = useUpdatePeerEvaluationStudentTeam(
    "useUpdatePeerEvaluationStudentTeam"
  );

  const rangeSelectField = getRangeNumberObject(100, 0);

  const onViewPeerEvaluation = (teamName: string) => {
    setRedirecting(true);
    push({
      pathname: `/peer-evaluation/report/team/${peerEvaluationId}/${teamName}`,
    });
  };

  const dataTableColumns: MUIDataTableColumn[] = [
    {
      name: "",
      options: {
        viewColumns: false,
        filter: false,
        sort: false,
        empty: false,
        customBodyRender: (_, tableMeta) => {
          return (
            <Button
              onClick={() => onViewPeerEvaluation(tableMeta.currentTableData[tableMeta.rowIndex].data[2] as string)}
              testId={""}
              variant="contained"
            >
              Results
            </Button>
          );
        },
      },
    },
    {
      name: "id",
      label: "ID",
    },
    {
      name: "name",
      label: "Name",
    },
    {
      name: "mark",
      label: "Mark",
      options: {
        customBodyRender: (_, tableMeta, updateValue) => (
          <FieldWrapper marginBottom="3em">
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
    pagination: false,
    print: false,
    enableNestedDataAccess: ".",
    draggableColumns: {
      enabled: true,
    },
    rowsPerPage: 100,
    customToolbar: (_) => (
      <Button testId="" variant="contained" type="submit">
        SAVE
      </Button>
    ),
  };

  const isLoading = isRedirecting || loadingFetch;

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
      } as unknown as IPeerEvaluationStudentTableForm[];

      setPeerEvaluationTableFormInitialState(initialValues);
    }
  }, [data]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = async (data: any) => {
    const dataModuleNormalized = getNormalizedObjectArray(data as unknown as ObjectNormalizedType);

    for (const { name, mark } of dataModuleNormalized) {
      await updatePeerEvaluationStudentTeam({
        variables: {
          data: {
            mark: {
              set: mark,
            },
          },
          where: {
            name_peerEvaluationId: {
              peerEvaluationId: peerEvaluationId || "",
              name: name,
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
          {() => (
            <Form>
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
