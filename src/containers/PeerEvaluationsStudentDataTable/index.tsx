import React, { memo } from "react";

import { MUIDataTableColumn, MUIDataTableOptions } from "mui-datatables";

import { Button, DataTable, DataTableRefreshActionButtonIcon } from "@/components";
import { CheckIcon, CloseIcon } from "@/icons";
import { PeerEvaluationsStudentResponse } from "@/pages/api/resolvers/student/peer-evaluations-query";
import { CenteredScope } from "@/styles/global-style";

interface IPeerEvaluationsStudentDashboard {
  data: PeerEvaluationsStudentResponse;
  testId: string;
  onViewPeerEvaluation: (code: string) => void;
  onRefresh: () => void;
}

const PeerEvaluationsStudentDataTable = ({
  data,
  testId,
  onViewPeerEvaluation,
  onRefresh,
}: IPeerEvaluationsStudentDashboard) => {
  const tableColumns: MUIDataTableColumn[] = [
    {
      name: "code",
      label: " ",
      options: {
        filter: false,
        download: false,
        customBodyRender: (code: string) => {
          return (
            <CenteredScope>
              <Button onClick={() => onViewPeerEvaluation(code)} testId={testId} variant="contained">
                Open
              </Button>
            </CenteredScope>
          );
        },
      },
    },
    {
      name: "title",
      label: "Title",
    },
    {
      name: "isCompleted",
      label: "Peer Evaluation Completed",
      options: {
        filter: false,
        customBodyRender: (value: boolean) => {
          if (value) {
            return <CheckIcon testId={testId} />;
          }

          return <CloseIcon testId={testId} />;
        },
      },
    },
    {
      name: "updatedAt",
      label: "Last Updated",
      options: {
        filterType: "textField",
        filter: false,
      },
    },
    {
      name: "submissionsLockDate",
      label: "Submissions Lock Date",
      options: {
        filterType: "textField",
      },
    },
    {
      name: "peerEvaluationStatus",
      label: "Status",
      options: {},
    },
  ];

  const tableOptions: MUIDataTableOptions = {
    textLabels: {
      body: {
        noMatch: "Sorry, no peer evaluations are available.",
      },
    },
    tableBodyMaxHeight: "100%",
    selectableRows: "none",
    selectableRowsHeader: false,
    rowHover: true,
    download: false,
    draggableColumns: {
      enabled: true,
    },
    filter: true,
    search: false,
    viewColumns: false,
    print: false,
    pagination: true,
    rowsPerPage: 10,
    customToolbar: (_) => (
      <DataTableRefreshActionButtonIcon onClick={onRefresh} testId={testId} toolTipLabel={"Refresh"} />
    ),
  };

  return (
    <DataTable
      data={data.peerEvaluationsStudent || []}
      columns={tableColumns}
      options={tableOptions}
      isVisible
      testId={testId}
    />
  );
};

export default memo(PeerEvaluationsStudentDataTable);
