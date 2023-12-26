import React, { useEffect, useState } from "react";

import { NextPage, NextPageContext } from "next";

import { Grid, Stack } from "@mui/material";
import { Form, Formik } from "formik";
import { MUIDataTableColumn, MUIDataTableOptions } from "mui-datatables";
import { useRouter } from "next/router";
import { getSession } from "next-auth/react";
import { AnyObjectSchema, array, object } from "yup";

import {
  Base,
  Button,
  ButtonFieldFormDataTablePeerEvaluationValidity,
  DataTable,
  DataTableRefreshActionButtonIcon,
  IconButtonWrapper,
  Message,
  PageTitle,
  WarningUnsavedForm,
} from "@/components";
import DataTableMarkActionButtonIcon from "@/components/DataTableMarkActionButtonIcon/DataTableMarkActionButtonIcon";
import { PeerEvaluationNavigationFab } from "@/containers";
import PeerEvaluationStudentTableDialog from "@/containers/PeerEvaluationStudentTableDialog";
import PeerEvaluationStudentTeamResultCard from "@/containers/PeerEvaluationStudentTeamResultCard";
import { PeerEvaluationResultTeamCommentForm } from "@/forms";
import { IPeerEvaluationResultTeamCommentFormData } from "@/forms/PeerEvaluationResultTeamCommentForm";
import { GradingIcon, SaveIcon, VisibilityOffIcon } from "@/icons";
import useUpdatePeerEvaluationReviewee from "@/requests/hooks/mutations/useUpdatePeerEvaluationReviewee";
import useUpdatePeerEvaluationStudentTeam from "@/requests/hooks/mutations/useUpdatePeerEvaluationStudentTeam";
import useUpdatePeerEvaluationStudentTeamCalculateResultsTableByTeam from "@/requests/hooks/mutations/useUpdatePeerEvaluationStudentTeamCalculateResultsTableByTeam";
import useGetPeerEvaluationStudentTeamCalculatedResultsTable from "@/requests/hooks/query/useGetPeerEvaluationStudentTeamCalculatedResultsTable";
import { CenteredContent } from "@/styles";
import { NextPagePros } from "@/types/pages";
import { RoleScope } from "@/utils";
import { ObjectArray, objectToArrayOfObject } from "@/utils/form";
import { dataStudentToBeExtractedList } from "@/utils/peer-evaluation/result/team";

const testId = "page-lecturer-result-team";

type TTableData = Array<object | number[] | string[]>;

type RowDataStudentTable = {
  comment: string;
  criteriaScoreTotal: number;
  isValid: boolean;
  peerEvaluationReviewId: string;
  studentId: string;
};

interface IPeerEvaluationResultStudentTeamTableForm {
  [x: string]: {
    [x: string]: object;
  }[];
}

const ReportTeam: NextPage<NextPagePros> = ({ session }) => {
  const { query } = useRouter();

  const [tableData, setTableData] = useState<TTableData | null>(null);

  const [isQueryLoading, setIsQueryLoading] = useState<boolean>(true);

  const [resultsAvailable, setResultsAvailable] = useState<boolean | null>(null);

  const [areMarksCalculated, setAreMarksCalculated] = useState<boolean | null>(null);

  const [tableColumns, setTableColumns] = useState<MUIDataTableColumn[] | null>(null);

  const [peerEvaluationId, setPeerEvaluationId] = useState<string | null>(null);

  const [peerEvaluationTeamName, setPeerEvaluationTeamName] = useState<string | null>(null);

  const [studentIdDialog, setStudentIdDialog] = useState<string | null>(null);

  const [studentTableDialogOpen, setStudentTableDialogOpen] = useState<boolean>(false);

  const [isRedirecting, setRedirecting] = useState(false);

  const [tableFormInitialState, setTableFormInitialState] = useState<IPeerEvaluationResultStudentTeamTableForm[]>([]);

  const [validationSchemaState, setValidationSchemaState] = useState<AnyObjectSchema | null>(null);

  const [updatePeerEvaluationStudentTeamCalculateResultsTableByTeam] =
    useUpdatePeerEvaluationStudentTeamCalculateResultsTableByTeam(
      "UpdatePeerEvaluationStudentTeamCalculateResultsTableByTeam"
    );

  const [getPeerEvaluationStudentTeamCalculatedResultsTable, { loading: loadingQuery, error, data, refetch }] =
    useGetPeerEvaluationStudentTeamCalculatedResultsTable("GetPeerEvaluationStudentTeamCalculatedResultsTable");

  const [updatePeerEvaluationStudentTeam] = useUpdatePeerEvaluationStudentTeam("UpdatePeerEvaluationStudentTeam");

  const [updatePeerEvaluationReviewee] = useUpdatePeerEvaluationReviewee("useUpdatePeerEvaluationReviewee");

  const tableOptions: MUIDataTableOptions = {
    textLabels: {
      body: {
        noMatch: "Sorry, no results available",
      },
    },
    responsive: "simple",
    tableBodyMaxHeight: "100%",
    selectableRows: "none",
    selectableRowsHeader: true,
    rowHover: true,
    download: true,
    draggableColumns: {
      enabled: true,
    },
    search: false,
    viewColumns: false,
    print: false,
    pagination: false,
    sort: false,
    filter: false,
    downloadOptions: {
      filename: `peer_evaluation_${peerEvaluationId}_team_${peerEvaluationTeamName}_${new Date().getTime()}.csv`,
    },
    customToolbar: (_) => (
      <>
        <DataTableMarkActionButtonIcon
          onClick={onCalculateMarksTrigger}
          testId={`${testId}-refresh-peer-evaluation-table`}
          toolTipLabel={"Calculate Marks"}
        />
        <DataTableRefreshActionButtonIcon
          onClick={onRefreshTable}
          testId={`${testId}-refresh-peer-evaluation-table`}
          toolTipLabel={"Refresh"}
        />
        <IconButtonWrapper type="submit" testId={""} tooltip={"Save"}>
          <SaveIcon testId="" fontSize="medium" color="inherit" />
        </IconButtonWrapper>
      </>
    ),
    // TODO: Move away from here
    onDownload: (buildHead, buildBody, columns, tableData) => {
      const projectDetails = `"Team Name","${data?.peerEvaluationStudentTeamCalculatedResultsTable.teamName}"
"Mark","${data?.peerEvaluationStudentTeamCalculatedResultsTable.mark}"
"Updated At","${data?.peerEvaluationStudentTeamCalculatedResultsTable.updatedAt}"`;

      const tableDataObjects = tableData.slice(0, -5);

      for (const tableDataObject of tableDataObjects) {
        const tableDataArray = [];
        for (const column in tableDataObject.data) {
          const columnNumber = Number(column);

          let value = null;

          if (columnNumber === 0) {
            value = tableDataObject.data[column].studentName;
          } else if (tableDataObject.data[column]) {
            value = tableDataObject.data[column].criteriaScoreTotal;
          } else {
            value = null;
          }

          tableDataArray.push(value);
        }

        tableDataObject.data = tableDataArray;

        const resultIndex = tableData.findIndex(({ index }: { index: number }) => index === tableDataObject.index);

        tableData[resultIndex] = tableDataObject;
      }

      const header = buildHead(columns);

      const body = buildBody(tableData);

      return projectDetails + "\n\n" + header + body;
    },
  };

  const onRefreshTable = async () => {
    if (peerEvaluationId && peerEvaluationTeamName) {
      await refetch({
        where: {
          peerEvaluationId: peerEvaluationId,
          peerEvaluationStudentTeamName: peerEvaluationTeamName,
        },
      });
    }
  };

  const onCalculateMarksTrigger = async () => {
    if (peerEvaluationId && peerEvaluationTeamName) {
      await updatePeerEvaluationStudentTeamCalculateResultsTableByTeam({
        variables: {
          where: {
            peerEvaluationId: peerEvaluationId,
            peerEvaluationStudentTeamName: peerEvaluationTeamName,
          },
        },
      });

      await onRefreshTable();
    }
  };

  const onSaveCommentForm = async ({ comment }: IPeerEvaluationResultTeamCommentFormData) => {
    await updatePeerEvaluationStudentTeam({
      variables: {
        data: {
          comment: {
            set: comment || "",
          },
        },
        where: {
          name_peerEvaluationId: {
            peerEvaluationId: peerEvaluationId || "",
            name: peerEvaluationTeamName || "",
          },
        },
      },
    });

    await onCalculateMarksTrigger();
  };

  const openStudentPeerEvaluationDialog = (studentId: string) => {
    setStudentIdDialog(studentId);
    setStudentTableDialogOpen(true);
  };

  const updateValidityPeerEvaluationReviewee = async (peerEvaluationRevieweeId: string, isValid: boolean) => {
    await updatePeerEvaluationReviewee({
      variables: {
        data: {
          isValid: {
            set: isValid,
          },
        },
        where: {
          id: peerEvaluationRevieweeId,
        },
      },
    });
  };

  const onSaveTableForm = async (tableDataForm: IPeerEvaluationResultStudentTeamTableForm[]) => {
    const listPromises = [];

    for (const studentIdTable in tableDataForm) {
      for (const rowData of tableDataForm[studentIdTable] as unknown as []) {
        const rowDataValues = rowData[studentIdTable.slice(0, -1)];
        if (typeof rowDataValues === "object" && rowDataValues !== null) {
          const rowDataSanitized = rowDataValues as RowDataStudentTable;
          listPromises.push(
            updateValidityPeerEvaluationReviewee(rowDataSanitized.peerEvaluationReviewId, rowDataSanitized.isValid)
          );
        }
      }
    }

    await Promise.all(listPromises);
    await onCalculateMarksTrigger();
  };

  const updatePeerEvaluationStudentTableDialogState = (state: boolean) => {
    setStudentTableDialogOpen(state);
    setStudentIdDialog(null);
  };

  useEffect(() => {
    const slug = query.slug;

    if (Array.isArray(slug)) {
      const peerEvaluationId = slug[0];

      const teamName = slug[1];

      setPeerEvaluationId(peerEvaluationId);

      setPeerEvaluationTeamName(teamName);

      getPeerEvaluationStudentTeamCalculatedResultsTable({
        variables: {
          where: {
            peerEvaluationId: peerEvaluationId,
            peerEvaluationStudentTeamName: teamName,
          },
        },
      });
    }
  }, [getPeerEvaluationStudentTeamCalculatedResultsTable, query.slug]);

  useEffect(() => {
    if (data) {
      const defaultColumnsDataTable = dataStudentToBeExtractedList.flatMap(({ columnName }) => columnName);

      const initialTableColumns: MUIDataTableColumn[] = [
        {
          name: "studentName",
          label: "Student Name",
          options: {
            setCellProps: () => ({ style: { minWidth: "100px", width: "100px" } }),
            setCellHeaderProps: () => ({ align: "left" }),
            customBodyRender: (columnData) => {
              if (typeof columnData === "string" && defaultColumnsDataTable.includes(columnData)) {
                return columnData;
              }

              return (
                <Button
                  variant={"outlined"}
                  testId={""}
                  onClick={() => openStudentPeerEvaluationDialog(columnData.studentId)}
                  size="small"
                  style={{
                    fontSize: "1rem",
                  }}
                >
                  {columnData.studentName}
                </Button>
              );
            },
          },
        },
      ];

      if (
        data.peerEvaluationStudentTeamCalculatedResultsTable.studentsColumnList &&
        data.peerEvaluationStudentTeamCalculatedResultsTable.table
      ) {
        const studentsColumnList = data.peerEvaluationStudentTeamCalculatedResultsTable.studentsColumnList.map(
          (data) =>
            ({
              ...data,
              options: {
                setCellProps: () => ({ style: { minWidth: "100px", width: "100px" } }),
                setCellHeaderProps: () => ({ align: "center" }),
                customBodyRender: (columnData, tableMeta, updateValue) => {
                  if (typeof columnData === "object" && columnData !== null) {
                    if (columnData.criteriaScoreTotal === null) {
                      return null;
                    }

                    return (
                      <ButtonFieldFormDataTablePeerEvaluationValidity
                        name={`[${data.name}s].[${tableMeta.rowIndex}].[${data.name}]`}
                        props={{
                          variant: "outlined",
                          testId: "",
                        }}
                        criteriaScoreTotal={columnData.criteriaScoreTotal}
                        updateDataTableFormValue={updateValue}
                        formValue={columnData}
                      />
                    );
                  }

                  // TODO: Button Final Mark
                  return (
                    <Button
                      variant="text"
                      fullWidth
                      testId={""}
                      size="small"
                      style={{
                        fontSize: "1rem",
                        color: "black",
                      }}
                      disabled
                    >
                      {columnData}
                    </Button>
                  );
                },
              },
            }) as MUIDataTableColumn
        );

        setTableColumns([...initialTableColumns, ...studentsColumnList]);

        const tableData = JSON.parse(data.peerEvaluationStudentTeamCalculatedResultsTable.table) as TTableData;

        const studentColumnList = data.peerEvaluationStudentTeamCalculatedResultsTable.studentsColumnList.flatMap(
          ({ name }) => name
        );

        const initialValues = Object.assign(
          {},
          ...studentColumnList.map((columnName) => ({
            [`${columnName}s`]: objectToArrayOfObject(columnName, tableData as unknown as ObjectArray),
          }))
        );

        const columnsStudentValidation = studentColumnList.map((columnName) => ({
          [`${columnName}s`]: array().of(
            object().shape({
              [columnName]: object().nullable().notRequired(),
            })
          ),
        })) as [{}];

        const validationSchema = object({
          ...Object.assign(...columnsStudentValidation),
        });

        setValidationSchemaState(validationSchema);

        setTableFormInitialState(initialValues);

        setTableData(tableData);

        setAreMarksCalculated(true);

        setResultsAvailable(true);
      } else if (!data.peerEvaluationStudentTeamCalculatedResultsTable.isAvailable) {
        setResultsAvailable(false);
      } else if (!data.peerEvaluationStudentTeamCalculatedResultsTable.areMarksCalculated) {
        setAreMarksCalculated(false);
      }

      setIsQueryLoading(false);
    }
  }, [data]);

  const isLoading = loadingQuery || isQueryLoading || isRedirecting;

  return (
    <Base topLeftComponent="menu" loading={isLoading} error={!!error}>
      <PageTitle title={"Results"} testId={`${testId}-title`} variant="h4" margin="2em" />

      <PeerEvaluationNavigationFab setRedirecting={() => setRedirecting(true)} />

      {resultsAvailable !== null && !resultsAvailable && (
        <CenteredContent>
          <Stack direction="column" justifyContent="center" alignItems="center" spacing={2}>
            <VisibilityOffIcon testId={`${testId}-visibility-off-icon`} fontSize="large" />
            <Message testId={"500-error-container-text"}>
              {"Peer Evaluation is not available or does not exist"}
            </Message>
          </Stack>
        </CenteredContent>
      )}

      {areMarksCalculated !== null && !areMarksCalculated && (
        <CenteredContent>
          <Stack direction="column" justifyContent="center" alignItems="center" spacing={2}>
            <GradingIcon testId={`${testId}-grading-icon`} fontSize="large" />
            <Message testId={`${testId}-calculate-marks-message`}>
              {"Peer Evaluation marks have not been calculated"}
            </Message>
            <Button
              size="large"
              testId={`${testId}-calculate-marks`}
              variant="contained"
              onClick={onCalculateMarksTrigger}
            >
              Calculate Marks
            </Button>
          </Stack>
        </CenteredContent>
      )}

      {tableColumns && tableData && data && (
        <>
          <Grid container direction={{ xs: "column", md: "row" }} justifyContent="space-between" alignItems="center">
            <PeerEvaluationStudentTeamResultCard
              teamName={data.peerEvaluationStudentTeamCalculatedResultsTable.teamName}
              mark={data.peerEvaluationStudentTeamCalculatedResultsTable.mark}
              updatedAt={data.peerEvaluationStudentTeamCalculatedResultsTable.updatedAt}
            />
            <PeerEvaluationResultTeamCommentForm
              comment={data.peerEvaluationStudentTeamCalculatedResultsTable.comment}
              onSubmitForm={onSaveCommentForm}
              testId={testId}
            />
          </Grid>

          {session && tableFormInitialState && validationSchemaState && (
            <Formik
              initialValues={tableFormInitialState}
              validationSchema={validationSchemaState}
              onSubmit={async (data, { resetForm }) => {
                await onSaveTableForm(data);
                resetForm({
                  values: data,
                });
              }}
            >
              {({ dirty }) => (
                <Form>
                  <WarningUnsavedForm areChangesUnsaved={dirty} />
                  <DataTable
                    testId={`${testId}-datatable`}
                    isVisible
                    data={tableData}
                    columns={tableColumns}
                    options={tableOptions}
                  />

                  {peerEvaluationId && studentIdDialog !== null && (
                    <PeerEvaluationStudentTableDialog
                      session={session}
                      peerEvaluationId={peerEvaluationId}
                      studentId={studentIdDialog}
                      isDialogOpen={studentTableDialogOpen}
                      updateDialogState={updatePeerEvaluationStudentTableDialogState}
                    />
                  )}
                </Form>
              )}
            </Formik>
          )}
        </>
      )}
    </Base>
  );
};

export async function getServerSideProps(context: NextPageContext) {
  return {
    props: {
      session: await getSession(context),
      protected: true,
      roles: [RoleScope.ADMIN, RoleScope.LECTURER],
    },
  };
}

export default ReportTeam;
