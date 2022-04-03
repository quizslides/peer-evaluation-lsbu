import React, { useState } from "react";

import { useApolloClient } from "@apollo/client";
import styled from "@emotion/styled";
import { PeerEvaluationTeachingMember } from "@generated/type-graphql";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import { MUIDataTableColumnDef, MUIDataTableOptions } from "mui-datatables";
import { Session } from "next-auth";
import { useRouter } from "next/router";

import {
  Base,
  Button,
  ConfirmationDialog,
  DataTable,
  DataTableAddColumnToolbarIcon,
  DataTableRefreshToolbarIcon,
  IconButtonWrapper,
  PageTitle,
  Typography,
} from "@/components";
import content from "@/content";
import { DeleteIcon, EditIcon } from "@/icons";
import deletePeerEvaluation from "@/requests/direct/mutation/deletePeerEvaluation";
import routing from "@/routing";
import {
  IPeerEvaluationDataTable,
  PeerEvaluationTeachingMemberRoles,
  SchoolsDataTable,
  peerEvaluationDataTableColumnOrder,
} from "@/types/peer-evaluation";
import { errorNotification, loadingNotification, successNotification } from "@/utils";

const Container = styled.div`
  margin-right: 2em;
`;

interface IPeerEvaluationsDataTable {
  redirectUrl: string;
  isLoading: boolean;
  peerEvaluationsData: IPeerEvaluationDataTable[];
  isError: boolean;
  session: Session | null;
  testId: string;
  refreshPeerEvaluations: () => void;
}

const PeerEvaluationsDataTable = ({
  redirectUrl,
  isLoading,
  peerEvaluationsData,
  session,
  isError,
  testId,
  refreshPeerEvaluations,
}: IPeerEvaluationsDataTable) => {
  const router = useRouter();

  const apolloClient = useApolloClient();

  const [isRedirecting, setRedirecting] = useState(false);

  const getPeerEvaluationObject = (values: string[]) => {
    return peerEvaluationDataTableColumnOrder.reduce((obj, column, index) => {
      return { ...obj, [column]: values[index] };
    }, {}) as IPeerEvaluationDataTable;
  };

  const onRefreshPeerEvaluations = () => {
    loadingNotification("Refreshing peerEvaluations", "AllPeerEvaluations");
    try {
      refreshPeerEvaluations();
      successNotification("Refreshed successfully", "AllPeerEvaluations");
    } catch (error) {
      errorNotification("Something went wrong", "AllPeerEvaluations");
    }
  };

  const onAddPeerEvaluation = () => {
    setRedirecting(true);

    router.push({
      pathname: routing.peerEvaluation.create,
      query: {
        redirectUrl: redirectUrl,
      },
    });
  };

  const onEditPeerEvaluation = (values: string[]) => {
    const peerEvaluationToUpdate = getPeerEvaluationObject(values);
    setRedirecting(true);
    router.push({
      pathname: `${routing.peerEvaluation.edit}/${peerEvaluationToUpdate.id}`,
      query: {
        redirectUrl: redirectUrl,
      },
    });
  };

  const [isDeletePeerEvaluationOpen, setDeletePeerEvaluationConfirmationOpen] = useState(false);

  const [deletePeerEvaluationId, setDeletePeerEvaluationId] = useState<string | null>(null);

  const onDeletePeerEvaluationConfirmation = (values: string[]) => {
    const peerEvaluationToDelete = getPeerEvaluationObject(values);

    const peerEvaluationDataToDelete = peerEvaluationsData.filter(
      (peerEvaluationData) => peerEvaluationData.id === peerEvaluationToDelete.id
    )[0];

    const peerEvaluationTeachingMembers =
      peerEvaluationDataToDelete.peerEvaluationTeachingMembers as unknown as PeerEvaluationTeachingMember[];

    const userDeletingPeerEvaluation = peerEvaluationTeachingMembers.filter(
      (peerEvaluationTeachingMembers) => peerEvaluationTeachingMembers.userId === session?.user.id
    )[0];

    if (userDeletingPeerEvaluation.role !== PeerEvaluationTeachingMemberRoles.OWNER) {
      errorNotification("You do not have enough permissions to delete this peer evaluation");
      return null;
    }

    setDeletePeerEvaluationConfirmationOpen(true);
    setDeletePeerEvaluationId(peerEvaluationToDelete.id);
  };

  const onDeleteDialogAccept = async () => {
    loadingNotification("Deleting peer evaluation... Wait for it...", "DeletingPeerEvaluation");

    setDeletePeerEvaluationConfirmationOpen(false);
    setDeletePeerEvaluationId(null);

    if (deletePeerEvaluationId) {
      const { errors } = await deletePeerEvaluation(apolloClient, deletePeerEvaluationId);

      if (!errors) {
        successNotification("Peer Evaluation deleted successfully", "DeletingPeerEvaluation");
        refreshPeerEvaluations();
      } else {
        // TODO: Create a granular error notification to the user with all the errors
        errorNotification("Error deleting peer evaluation", "DeletingPeerEvaluation");
      }
    }
  };

  const onDeleteDialogClose = () => {
    setDeletePeerEvaluationConfirmationOpen(false);
    setDeletePeerEvaluationId(null);
  };

  const tableColumns: MUIDataTableColumnDef[] = [
    {
      name: "id",
      label: "ID",
      options: {
        display: "false",
        filter: true,
        sort: true,
        filterType: "textField",
      },
    },
    {
      name: "title",
      label: "Title",
      options: {
        filter: true,
        sort: true,
        filterType: "textField",
      },
    },
    {
      name: "createdAt",
      label: "Created",
      options: {
        filter: true,
        sort: true,
        filterType: "textField",
        customBodyRender: (date: string) => {
          return new Date(date).toLocaleString("en-GB");
        },
      },
    },
    {
      name: "updatedAt",
      label: "Updated",
      options: {
        filter: true,
        sort: true,
        filterType: "textField",
        customBodyRender: (date: string) => {
          return new Date(date).toLocaleString("en-GB");
        },
      },
    },
    {
      name: "code",
      label: "Peer Evaluation Code",
      options: {
        filter: true,
        sort: true,
        filterType: "textField",
      },
    },
    {
      name: "status",
      label: "Status",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "maxGradeIncrease",
      label: "Max Grade Increase",
      options: {
        display: "false",
        filter: true,
        sort: true,
      },
    },
    {
      name: "maxGradeDecrease",
      label: "Max Grade Decrease",
      options: {
        display: "false",
        filter: true,
        sort: true,
      },
    },
    {
      name: "submissionsLockDate",
      label: "Submission Lock Date",
      options: {
        display: "false",
        filter: true,
        sort: true,
        filterType: "textField",
      },
    },
    {
      name: "criteriaScoreRangeMin",
      label: "Criterial Score Range Min",
      options: {
        display: "false",
        filter: true,
        sort: true,
      },
    },
    {
      name: "criteriaScoreRangeMax",
      label: "Criterial Score Range Max",
      options: {
        display: "false",
        filter: true,
        sort: true,
      },
    },
    {
      name: "_count.peerEvaluationTeachingMembers",
      label: "Total Peer Evaluation Teaching Members",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "_count.columns",
      label: "Total Columns",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "_count.peerEvaluationStudents",
      label: "Total Students",
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value: number, rowData) => {
          return (
            <Stack direction="row" justifyContent="center" alignItems="center" spacing={2}>
              <Typography testId={`${testId}-total-students`}>{value}</Typography>

              <Button onClick={() => console.log(rowData)} variant={"contained"} testId={`${testId}-edit-students`}>
                Edit
              </Button>
            </Stack>
          );
        },
      },
    },
    {
      name: "schoolsDataTable",
      label: "Schools",
      options: {
        customBodyRender: (schools: string[]) => {
          return (
            <Stack spacing={1} direction={{ xs: "column", sm: "row" }}>
              {schools.map((school, index) => (
                <Chip key={index} label={SchoolsDataTable[school]} color="primary" size="small" />
              ))}
            </Stack>
          );
        },
      },
    },
  ];

  const tableOptions: MUIDataTableOptions = {
    textLabels: {
      body: {
        noMatch: "Sorry, no peerEvaluations available",
      },
    },
    responsive: "simple",
    tableBodyMaxHeight: "100%",
    selectableRows: "single",
    selectableRowsHeader: true,
    rowHover: true,
    download: true,
    downloadOptions: {
      filename: `peerEvaluations-${new Date().getTime()}.csv`,
    },
    draggableColumns: {
      enabled: true,
    },
    print: false,
    rowsPerPage: 100,
    onTableChange: (action, tableState) => {
      if (action === "propsUpdate") {
        tableState.selectedRows.data = [];
        tableState.selectedRows.lookup = [];
      }
    },
    enableNestedDataAccess: ".",
    customToolbar: (_) => (
      <>
        <DataTableRefreshToolbarIcon
          onClick={onRefreshPeerEvaluations}
          testId={`${testId}-refresh-peer-evaluation-table`}
        />
        <DataTableAddColumnToolbarIcon onClick={onAddPeerEvaluation} testId={`${testId}-peer-evaluation-member-add`} />
      </>
    ),
    customToolbarSelect: (selectedRows, displayData) => (
      <Container>
        <IconButtonWrapper
          testId="update-user-button-wrapper"
          tooltip={"Update"}
          onClick={() => onEditPeerEvaluation(displayData[selectedRows.data[0].index].data)}
        >
          <EditIcon testId={`${testId}-update-user-button-icon`} />
        </IconButtonWrapper>
        <IconButtonWrapper
          testId="delete-user-button-wrapper"
          tooltip={"Delete"}
          onClick={() => onDeletePeerEvaluationConfirmation(displayData[selectedRows.data[0].index].data)}
        >
          <DeleteIcon testId={`${testId}-delete-user-button-icon`} />
        </IconButtonWrapper>
      </Container>
    ),
  };

  return (
    <Base topLeftComponent="menu" loading={isLoading || isRedirecting} error={isError}>
      <PageTitle title={"Peer Evaluations"} testId={`${testId}-title`} variant="h4" margin="2em" />
      <DataTable
        testId={`${testId}-datatable`}
        isVisible={!!peerEvaluationsData}
        title={""}
        data={peerEvaluationsData}
        columns={tableColumns}
        options={tableOptions}
      />
      <ConfirmationDialog
        testId={`${testId}-datatable-on-delete`}
        isOpen={isDeletePeerEvaluationOpen}
        title={content.containers.peerEvaluationsDataTable.confirmationOnDelete.title}
        textContent={content.containers.peerEvaluationsDataTable.confirmationOnDelete.bodyText}
        onAccept={onDeleteDialogAccept}
        onClose={onDeleteDialogClose}
        closeText={content.containers.peerEvaluationsDataTable.confirmationOnDelete.closeText}
        acceptText={content.containers.peerEvaluationsDataTable.confirmationOnDelete.acceptText}
      />
    </Base>
  );
};

export default PeerEvaluationsDataTable;
