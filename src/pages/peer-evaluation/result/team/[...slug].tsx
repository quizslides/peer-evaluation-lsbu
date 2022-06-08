import React, { useEffect, useState } from "react";

import styled from "@emotion/styled";
import { Stack } from "@mui/material";
import { MUIDataTableColumn, MUIDataTableOptions } from "mui-datatables";
import { NextPage } from "next";
import { useRouter } from "next/router";

import { Base, Button, DataTable, DataTableRefreshActionButtonIcon, PageTitle } from "@/components";
import DataTableMarkActionButtonIcon from "@/components/DataTableMarkActionButtonIcon/DataTableMarkActionButtonIcon";
import Typography from "@/components/Typography/Typography";
import PeerEvaluationStudentTeamResultCard from "@/containers/PeerEvaluationStudentTeamResultCard";
import { PeerEvaluationResultTeamCommentForm } from "@/forms";
import { IPeerEvaluationResultTeamCommentFormData } from "@/forms/PeerEvaluationResultTeamCommentForm";
import { GradingIcon, VisibilityOffIcon } from "@/icons";
import useUpdatePeerEvaluationStudentTeam from "@/requests/hooks/mutations/useUpdatePeerEvaluationStudentTeam";
import useUpdatePeerEvaluationStudentTeamCalculateResultsTableByTeam from "@/requests/hooks/mutations/useUpdatePeerEvaluationStudentTeamCalculateResultsTableByTeam";
import useGetPeerEvaluationStudentTeamCalculatedResultsTable from "@/requests/hooks/query/useGetPeerEvaluationStudentTeamCalculatedResultsTable";
import { CenteredContent } from "@/styles";
import { RoleScope } from "@/utils";

const testId = "page-report-team";

const Message = styled(Typography)`
  text-align: center;
  font-weight: 700;
  font-size: 1rem;
  max-width: 200px;
`;

type TTableData = Array<object | number[] | string[]>;

const ReportTeam: NextPage = () => {
  const { query } = useRouter();

  const [updatePeerEvaluationStudentTeamCalculateResultsTableByTeam] =
    useUpdatePeerEvaluationStudentTeamCalculateResultsTableByTeam(
      "UpdatePeerEvaluationStudentTeamCalculateResultsTableByTeam"
    );

  const [getPeerEvaluationStudentTeamCalculatedResultsTable, { loading: loadingQuery, error, data, refetch }] =
    useGetPeerEvaluationStudentTeamCalculatedResultsTable("GetPeerEvaluationStudentTeamCalculatedResultsTable");

  const [tableData, setTableData] = useState<TTableData | null>(null);

  const [isQueryLoading, setIsQueryLoading] = useState<boolean>(true);

  const [resultsAvailable, setResultsAvailable] = useState<boolean | null>(null);

  const [areMarksCalculated, setAreMarksCalculated] = useState<boolean | null>(null);

  const [tableColumns, setTableColumns] = useState<MUIDataTableColumn[] | null>(null);

  const [peerEvaluationId, setPeerEvaluationId] = useState<string | null>(null);

  const [peerEvaluationTeamName, setPeerEvaluationTeamName] = useState<string | null>(null);

  const [updatePeerEvaluationStudentTeam] = useUpdatePeerEvaluationStudentTeam("UseUpdatePeerEvaluationStudentTeam");

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
          onClick={onCalculateMarks}
          testId={`${testId}-refresh-peer-evaluation-table`}
          toolTipLabel={"Calculate Marks"}
        />
        <DataTableRefreshActionButtonIcon
          onClick={onRefreshTable}
          testId={`${testId}-refresh-peer-evaluation-table`}
          toolTipLabel={"Refresh"}
        />
      </>
    ),
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

  const onCalculateMarks = async () => {
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
      const initialTableColumns: MUIDataTableColumn[] = [
        {
          name: "studentName",
          label: "Student Name",
        },
      ];

      if (
        data.peerEvaluationStudentTeamCalculatedResultsTable.studentsColumnList &&
        data.peerEvaluationStudentTeamCalculatedResultsTable.table
      ) {
        setTableColumns([
          ...initialTableColumns,
          ...data.peerEvaluationStudentTeamCalculatedResultsTable.studentsColumnList,
        ]);

        const tableData = JSON.parse(data.peerEvaluationStudentTeamCalculatedResultsTable.table) as TTableData;

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

  const isLoading = loadingQuery || isQueryLoading;

  return (
    <Base topLeftComponent="menu" loading={isLoading} error={!!error}>
      <PageTitle title={"Results"} testId={`${testId}-title`} variant="h4" margin="2em" />
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
            <Message testId={""}>{"Peer Evaluation marks have not been calculated"}</Message>
            <Button size="large" testId="" variant="contained" onClick={onCalculateMarks}>
              Calculate Marks
            </Button>
          </Stack>
        </CenteredContent>
      )}

      {tableColumns && tableData && data && (
        <>
          <Stack direction="row" justifyContent="space-between" alignItems="end" spacing={2}>
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
          </Stack>

          <DataTable
            testId={`${testId}-datatable`}
            isVisible
            data={tableData}
            columns={tableColumns}
            options={tableOptions}
          />
        </>
      )}
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

export default ReportTeam;
