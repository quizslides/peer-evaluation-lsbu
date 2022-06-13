/* eslint-disable react/no-multi-comp */
import React, { memo } from "react";

import { PeerEvaluation } from "@generated/type-graphql";
import { MUIDataTableColumn, MUIDataTableOptions } from "mui-datatables";

import PeerEvaluationCardInfo from "../PeerEvaluationCardInfo";

import { DataTable, Dialog } from "@/components";

enum EditBulkAction {
  UPDATE = "UPDATE",
  CREATE = "CREATE",
}

interface IPeerEvaluationStudentTeamActionsDialog {
  isOpen: boolean;
  peerEvaluationStatus: PeerEvaluation["status"];
  peerEvaluationTitle: string;
  peerEvaluationCode: string;
  studentTeamToCreate: ITeamToCreateBulk[];
  studentToCreate: IStudentTeamToEditBulk[];
  studentToUpdate: IStudentTeamToEditBulk[];
  onCancel: () => void;
  onAccept: () => void;
}

interface ITeamToCreateBulk {
  action: EditBulkAction;
  teamName: string;
}

interface IStudentTeamToEditBulk {
  action: EditBulkAction;
  studentEmail: string;
  teamName: string;
}

interface IDataTableTeamsToCreate {
  studentTeamToCreate: ITeamToCreateBulk[];
}

interface IDataTableStudentsBulkCreateUpdate {
  studentToCreate: IStudentTeamToEditBulk[];
  studentToUpdate: IStudentTeamToEditBulk[];
}

const DataTableTeamsToCreate = ({ studentTeamToCreate }: IDataTableTeamsToCreate) => {
  const dataTableColumns: MUIDataTableColumn[] = [
    {
      name: "action",
      label: "Action",
    },
    {
      name: "teamName",
      label: "Team Name",
    },
  ];

  const dataTableOptions: MUIDataTableOptions = {
    textLabels: {
      body: {
        noMatch: "No team to be created",
      },
    },
    responsive: "simple",
    tableBodyMaxHeight: "100%",
    selectableRows: "none",
    selectableRowsHeader: true,
    rowHover: true,
    download: false,
    filter: false,
    viewColumns: false,
    sort: false,
    search: false,
    draggableColumns: {
      enabled: true,
    },
    print: false,
    pagination: false,
  };

  return (
    <DataTable
      isVisible={true}
      title={"The following teams will be created/updated"}
      data={studentTeamToCreate}
      columns={dataTableColumns}
      options={dataTableOptions}
      testId={""}
    />
  );
};

const DataTableStudentsBulkCreateUpdate = ({
  studentToCreate,
  studentToUpdate,
}: IDataTableStudentsBulkCreateUpdate) => {
  const data: IStudentTeamToEditBulk[] = [...studentToCreate, ...studentToUpdate];

  const dataTableColumns: MUIDataTableColumn[] = [
    {
      name: "action",
      label: "Action",
    },
    {
      name: "studentEmail",
      label: "Email",
    },
    {
      name: "teamName",
      label: "Team Name",
    },
  ];

  const dataTableOptions: MUIDataTableOptions = {
    textLabels: {
      body: {
        noMatch: "No student to be created or updated",
      },
    },
    responsive: "simple",
    tableBodyMaxHeight: "100%",
    selectableRows: "none",
    selectableRowsHeader: true,
    rowHover: true,
    download: false,
    filter: false,
    viewColumns: false,
    sort: false,
    search: false,
    draggableColumns: {
      enabled: true,
    },
    print: false,
    pagination: false,
  };

  return (
    <DataTable
      isVisible={true}
      title={"The following students will be updated/created"}
      data={data}
      columns={dataTableColumns}
      options={dataTableOptions}
      testId={""}
    />
  );
};

const PeerEvaluationStudentTeamActionsDialog = ({
  isOpen,
  peerEvaluationTitle,
  peerEvaluationCode,
  peerEvaluationStatus,
  studentTeamToCreate,
  studentToCreate,
  studentToUpdate,
  onAccept,
  onCancel,
}: IPeerEvaluationStudentTeamActionsDialog) => {
  return (
    <Dialog
      testId={"peer-evaluation-student-team-action-dialog"}
      title={"Please review the changes before you continue"}
      content={
        <>
          <PeerEvaluationCardInfo
            peerEvaluationStatus={peerEvaluationStatus}
            peerEvaluationTitle={peerEvaluationTitle}
            peerEvaluationCode={peerEvaluationCode}
          />
          <br />
          <DataTableStudentsBulkCreateUpdate studentToCreate={studentToCreate} studentToUpdate={studentToUpdate} />
          <br />
          <DataTableTeamsToCreate studentTeamToCreate={studentTeamToCreate} />
        </>
      }
      rightButton="Continue"
      rightButtonVariant="contained"
      leftButton="Cancel"
      fullScreen
      onClickRightButton={onAccept}
      onClickLeftButton={onCancel}
      open={isOpen}
    />
  );
};

export type { IStudentTeamToEditBulk, ITeamToCreateBulk };

export { EditBulkAction };

export default memo(PeerEvaluationStudentTeamActionsDialog);
