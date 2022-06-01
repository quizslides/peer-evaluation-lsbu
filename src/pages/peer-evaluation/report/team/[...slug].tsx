import React, { useEffect, useState } from "react";

import { MUIDataTableColumn, MUIDataTableOptions } from "mui-datatables";
import { NextPage } from "next";
import { useRouter } from "next/router";

import {
  Base,
  Button,
  ConfirmationDialog,
  DataTable,
  DataTableAddActionButtonIcon,
  Error,
  IconButtonWrapper,
  PageTitle,
} from "@/components";
import { PeerEvaluationNavigationFab } from "@/containers";
import { RoleScope } from "@/utils";

const testId = "page-report-team";

const ReportTeam: NextPage = () => {
  const [isRedirecting, setRedirecting] = useState(false);

  const isLoading = isRedirecting;

  const { push, query, isFallback } = useRouter();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [tableData, setTableData] = useState<any>(null);

  const tableColumns: MUIDataTableColumn[] = [
    {
      name: "email",
      label: "Email",
    },
    {
      name: "averageCriteriaScore",
      label: "averageCriteriaScore",
    },
    {
      name: "averageCriteriaScoreByTeamMember",
      label: "averageCriteriaScoreByTeamMember",
    },
    {
      name: "systemCalculatedMark",
      label: "systemCalculatedMark",
    },
    {
      name: "systemAdjustedMark",
      label: "systemAdjustedMark",
    },
    {
      name: "comments",
      label: "Comments",
    },
  ];

  const tableOptions: MUIDataTableOptions = {
    textLabels: {
      body: {
        noMatch: "Sorry, no results available",
      },
    },
    responsive: "simple",
    tableBodyMaxHeight: "100%",
    selectableRowsHeader: true,
    rowHover: true,
    download: false,
    draggableColumns: {
      enabled: true,
    },
    search: true,
    viewColumns: false,
    print: false,
    rowsPerPage: 100,
  };

  useEffect(() => {
    const slug = query.slug;

    if (Array.isArray(slug)) {
      const peerEvaluationId = slug[0];

      const teamName = slug[1];

      fetch(`${window.location.origin}/api/mark-calculations`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          peerEvaluationId,
          teamName,
        }),
      })
        .then((response) => response.json())
        .then((data) => setTableData(data));
    }
  }, [query.slug]);

  return (
    <Base topLeftComponent="menu" loading={isLoading}>
      <PageTitle title={"Report Team"} testId={`${testId}-title`} variant="h4" margin="2em" />

      {tableData && (
        <DataTable
          testId={`${testId}-datatable`}
          isVisible
          title={"Peer Evaluation Teaching Members"}
          data={tableData}
          columns={tableColumns}
          options={tableOptions}
        />
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
