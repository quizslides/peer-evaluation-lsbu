import React, { useEffect, useState } from "react";

import { MUIDataTableColumn, MUIDataTableOptions } from "mui-datatables";
import { NextPage } from "next";
import { useRouter } from "next/router";

import { Base, DataTable, DataTableRefreshActionButtonIcon, PageTitle } from "@/components";
import PeerEvaluationStudentTeamResultCard from "@/containers/PeerEvaluationStudentTeamResultCard";
import useGetPeerEvaluationStudentTeamCalculatedResultsTable from "@/requests/hooks/query/useGetPeerEvaluationStudentTeamCalculatedResultsTable";
import { RoleScope } from "@/utils";

const testId = "page-report-team";

const ReportTeam: NextPage = () => {
  const { query } = useRouter();

  const [getPeerEvaluationStudentTeamCalculatedResultsTable, { loading: loadingQuery, error, data, refetch }] =
    useGetPeerEvaluationStudentTeamCalculatedResultsTable("GetPeerEvaluationStudentTeamCalculatedResultsTable");

  // TODO: Fix any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [tableData, setTableData] = useState<any>(null);

  const [tableColumns, setTableColumns] = useState<MUIDataTableColumn[] | null>(null);

  const [peerEvaluationId, setPeerEvaluationId] = useState<string | null>(null);

  const [peerEvaluationTeamName, setPeerEvaluationTeamName] = useState<string | null>(null);

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
      <DataTableRefreshActionButtonIcon
        onClick={onRefreshTable}
        testId={`${testId}-refresh-peer-evaluation-table`}
        toolTipLabel={"Refresh"}
      />
    ),
  };

  const onRefreshTable = () => {
    if (peerEvaluationId && peerEvaluationTeamName) {
      refetch({
        where: {
          peerEvaluationId: peerEvaluationId,
          peerEvaluationStudentTeamName: peerEvaluationTeamName,
        },
      });
    }
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

      setTableColumns([
        ...initialTableColumns,
        ...data.peerEvaluationStudentTeamCalculatedResultsTable.studentsColumnList,
      ]);

      const tableData = JSON.parse(data.peerEvaluationStudentTeamCalculatedResultsTable.table);

      setTableData(tableData);
    }
  }, [data]);

  const isLoading = loadingQuery;

  return (
    <Base topLeftComponent="menu" loading={isLoading} error={!!error}>
      <PageTitle title={"Report Team"} testId={`${testId}-title`} variant="h4" margin="2em" />
      {tableColumns && tableData && data && (
        <>
          <PeerEvaluationStudentTeamResultCard
            teamName={data.peerEvaluationStudentTeamCalculatedResultsTable.teamName}
            mark={data.peerEvaluationStudentTeamCalculatedResultsTable.mark}
            updatedAt={data.peerEvaluationStudentTeamCalculatedResultsTable.updatedAt}
          />
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
