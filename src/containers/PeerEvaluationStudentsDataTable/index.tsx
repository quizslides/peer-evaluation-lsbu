import React, { memo } from "react";

import { MUIDataTableColumn, MUIDataTableOptions } from "mui-datatables";

import { DataTable, DataTableRefreshActionButtonIcon } from "@/components";
import LoadingContainer from "@/containers/LoadingContainer";
import { IPeerEvaluationStudent } from "@/transformers/students";

interface IPeerEvaluationStudentsDataTable {
  data: [IPeerEvaluationStudent] | [] | null;
  onRefreshStudents: () => Promise<void>;
}

const PeerEvaluationStudentsDataTable = ({ data, onRefreshStudents }: IPeerEvaluationStudentsDataTable) => {
  const dataTableColumns: MUIDataTableColumn[] = [
    {
      name: "id",
      label: "ID",
      options: {
        filter: false,
        display: false,
      },
    },
    {
      name: "userName",
      label: "Student Name",
    },
    {
      name: "userEmail",
      label: "Student Email",
      options: {
        filterType: "textField",
      },
    },
    {
      name: "userEmailVerified",
      label: "Student Verified",
      options: {
        display: false,
        filter: false,
      },
    },
    {
      name: "updatedAt",
      label: "Updated",
      options: {
        filter: true,
        display: false,
      },
    },
    {
      name: "averageCriteriaScore",
      label: "Avg Criteria Score",
      options: {
        display: false,
      },
    },
    {
      name: "averageCriteriaScoreByTeamMember",
      label: "Avg Criteria Score by Team Member",
      options: {
        display: false,
      },
    },
    {
      name: "systemCalculatedMark",
      label: "System Calculated Mark",
      options: {
        display: false,
      },
    },
    {
      name: "systemAdjustedMark",
      label: "System Adjusted Mark",
      options: {
        display: false,
      },
    },
    {
      name: "lecturerAdjustedMark",
      label: "Lectured Adjusted Mark",
      options: {
        display: false,
      },
    },
    {
      name: "finalMark",
      label: "finalMark",
    },
    {
      name: "peerEvaluationStudentTeamName",
      label: "Team Name",
    },
    {
      name: "peerEvaluationStudentTeamMark",
      label: "Team Mark",
    },
    {
      name: "peerEvaluationReviewedIsCompleted",
      label: "Peer Evaluation Completed",
    },
  ];

  const dataTableOptions: MUIDataTableOptions = {
    textLabels: {
      body: {
        noMatch: "Sorry, no students",
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
    downloadOptions: {
      filename: `peer_evaluations_students-${new Date().getTime()}.csv`,
    },
    draggableColumns: {
      enabled: true,
    },
    rowsPerPage: 100,
    customToolbar: (_) => (
      <DataTableRefreshActionButtonIcon
        onClick={onRefreshStudents}
        testId={"peer-evaluation-students-refresh-icon"}
        toolTipLabel={"Refresh"}
      />
    ),
  };

  if (!data) {
    return <LoadingContainer loading />;
  }

  return (
    <DataTable
      testId={"peer-evaluation-students-datatable"}
      isVisible={!!data}
      data={data}
      columns={dataTableColumns}
      options={dataTableOptions}
    />
  );
};

export default memo(PeerEvaluationStudentsDataTable);
