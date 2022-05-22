import React, { memo, useState } from "react";

import { useApolloClient } from "@apollo/client";
import styled from "@emotion/styled";
import { PeerEvaluationTeachingMember } from "@generated/type-graphql";
import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import { MUIDataTableColumnDef, MUIDataTableOptions } from "mui-datatables";
import { Session } from "next-auth";
import { useRouter } from "next/router";

import DataTableEditDeleteToolbar from "../DataTableEditDeleteToolbar";
import LoadingContainer from "../LoadingContainer";
import PeerEvaluationStatusContainer from "../PeerEvaluationStatusContainer";

import {
  Base,
  Button,
  ConfirmationDialog,
  DataTable,
  DataTableAddActionButtonIcon,
  DataTableRefreshActionButtonIcon,
  IconButtonWrapper,
  PageTitle,
  Typography,
} from "@/components";
import content from "@/content";
import { DeleteIcon, EditIcon } from "@/icons";
import { PeerEvaluationDashboard } from "@/pages/api/resolvers/peer-evaluation";
import deletePeerEvaluation from "@/requests/direct/mutation/deletePeerEvaluation";
import routing from "@/routing";
import {
  IPeerEvaluationData,
  PeerEvaluationStatus,
  PeerEvaluationTeachingMemberRoles,
  SchoolsDataTable,
  SchoolsDropdown,
  peerEvaluationDataTableColumnOrder,
} from "@/types/peer-evaluation";
import { errorNotification, loadingNotification, successNotification } from "@/utils";

const Container = styled.div`
  margin-right: 2em;
`;

interface IPeerEvaluationsDashboard {
  data: PeerEvaluationDashboard;
}

const PeerEvaluationsDashboard = ({ data }: IPeerEvaluationsDashboard) => {
  const { push, query, isFallback } = useRouter();

  const apolloClient = useApolloClient();

  const [isRedirecting, setRedirecting] = useState(false);

  const peerEvaluationId = data.id;

  const [isDeletePeerEvaluationOpen, setDeletePeerEvaluationConfirmationOpen] = useState(false);

  const isOwnerRole = data.peerEvaluationTeachingMembers
    ? data.peerEvaluationTeachingMembers[0].role === "OWNER"
    : false;

  const onRedirectEditPeerEvaluationEmail = () => {
    setRedirecting(true);

    push({
      pathname: `${routing.peerEvaluation.email}/${peerEvaluationId}`,
      query: {
        redirectUrl: `${routing.peerEvaluation.view}/${peerEvaluationId}`,
      },
    });
  };

  const onRedirectEditPeerEvaluation = () => {
    setRedirecting(true);

    push({
      pathname: `${routing.peerEvaluation.edit}/${peerEvaluationId}`,
      query: {
        redirectUrl: `${routing.peerEvaluation.view}/${peerEvaluationId}`,
      },
    });
  };

  const onRedirectEditPeerEvaluationStudents = () => {
    setRedirecting(true);

    push({
      pathname: `${routing.peerEvaluation.students}/${peerEvaluationId}`,
      query: {
        redirectUrl: `${routing.peerEvaluation.view}/${peerEvaluationId}`,
      },
    });
  };

  const onDeletePeerEvaluationConfirmation = () => {
    setDeletePeerEvaluationConfirmationOpen(true);
  };

  const onDeleteDialogClose = () => {
    setDeletePeerEvaluationConfirmationOpen(false);
  };

  const onDeleteDialogAccept = async () => {
    loadingNotification("Deleting peer evaluation... Wait for it...", "DeletingPeerEvaluation");

    setDeletePeerEvaluationConfirmationOpen(false);

    if (peerEvaluationId) {
      const { errors } = await deletePeerEvaluation(apolloClient, peerEvaluationId);

      if (!errors) {
        successNotification("Peer Evaluation deleted successfully", "DeletingPeerEvaluation");
        push(routing.dashboard);
      } else {
        // TODO: Create a granular error notification to the user with all the errors
        errorNotification("Error deleting peer evaluation", "DeletingPeerEvaluation");
      }
    }
  };

  const tableColumns: MUIDataTableColumnDef[] = [
    {
      name: "id",
      label: "ID",
    },
    {
      name: "title",
      label: "Title",
    },
    {
      name: "code",
      label: "Peer Evaluation Code",
    },
    {
      name: "_count.peerEvaluationStudents",
      label: "Total Students",
      options: {
        // eslint-disable-next-line react/no-multi-comp
        customBodyRender: (total) => {
          return (
            <Button
              variant={"outlined"}
              testId={"peer-evaluation-dashboard-email-reminder"}
              onClick={onRedirectEditPeerEvaluationStudents}
              size="medium"
            >
              {total} Edit
            </Button>
          );
        },
      },
    },
    {
      name: "_count.peerEvaluationTeachingMembers",
      label: "Total Teaching Members",
      options: {
        // eslint-disable-next-line react/no-multi-comp
        customBodyRender: (total) => {
          return (
            <Button
              variant={"outlined"}
              testId={"peer-evaluation-dashboard-email-reminder"}
              onClick={() => console.log("peerEvaluationTeachingMembers")}
              size="medium"
            >
              {total} Edit
            </Button>
          );
        },
      },
    },
    {
      name: "totalPeerEvaluationTeams",
      label: "Total Teams",
      options: {
        // eslint-disable-next-line react/no-multi-comp
        customBodyRender: (total) => {
          return (
            <Button
              variant={"outlined"}
              testId={"peer-evaluation-dashboard-email-reminder"}
              onClick={() => console.log("totalPeerEvaluationTeams")}
              size="medium"
            >
              {total} Edit
            </Button>
          );
        },
      },
    },
    {
      name: "marks",
      label: "Marks",
      options: {
        customBodyRender: () => {
          return "Manage Marks";
        },
      },
    },
    {
      name: "status",
      label: "Status",
      options: {
        customBodyRender: (status: PeerEvaluationStatus) => {
          return <PeerEvaluationStatusContainer status={status} />;
        },
      },
    },
    {
      name: "schools",
      label: "Schools",
      options: {
        customBodyRender: (schools: string[]) => {
          return (
            <Stack spacing={1} direction={{ xs: "column", sm: "row" }}>
              {schools.map((school, index) => (
                <Chip key={index} label={school} color="primary" size="small" />
              ))}
            </Stack>
          );
        },
      },
    },
    {
      name: "totalCompletedPeerEvaluations",
      label: "Completed Peer Evaluations",
    },
    {
      name: "reminder",
      label: "Reminder",
      options: {
        // eslint-disable-next-line react/no-multi-comp
        customBodyRender: () => {
          return (
            <Button
              variant={"outlined"}
              testId={"peer-evaluation-dashboard-email-reminder"}
              onClick={onRedirectEditPeerEvaluationEmail}
              size="small"
            >
              Send reminder
            </Button>
          );
        },
      },
    },
    {
      name: "submissionsLockDate",
      label: "Submissions Lock Date",
      options: {
        customBodyRender: (date: string) => {
          if (!date) {
            return "Not set";
          }

          const todaysDate = new Date().getTime();

          const submissionsLockDate = new Date(date).getTime();

          const remainingDates = submissionsLockDate - todaysDate;

          const remainingDays = Math.floor(remainingDates / (1000 * 3600 * 24));

          return `${new Date(date).toDateString()} - ${remainingDays} days remaining`;
        },
      },
    },
    {
      name: "maxGradeIncrease",
      label: "Max Grade Increase",
    },
    {
      name: "maxGradeDecrease",
      label: "Max Grade Decrease",
    },
  ];

  const tableOptions: MUIDataTableOptions = {
    textLabels: {
      body: {
        noMatch: "Sorry, no teaching peer evaluation teaching members in the peer evaluation",
      },
    },
    responsive: "vertical",
    tableBodyMaxHeight: "100%",
    selectableRows: "none",
    selectableRowsHeader: false,
    rowHover: false,
    download: false,
    draggableColumns: {
      enabled: false,
    },
    filter: false,
    search: false,
    viewColumns: false,
    print: false,
    pagination: false,
    enableNestedDataAccess: ".",
    customToolbar: (_) => (
      <DataTableEditDeleteToolbar
        editButton={{
          testId: "peer-evaluation-view-update",
          toolTipLabel: "Update",
          onClick: onRedirectEditPeerEvaluation,
        }}
        visibleDeleteButton={isOwnerRole}
        deleteButton={{
          testId: "peer-evaluation-view-delete",
          toolTipLabel: "Delete",
          onClick: onDeletePeerEvaluationConfirmation,
        }}
      />
    ),
  };

  if (isRedirecting) {
    return <LoadingContainer loading={isRedirecting} centeredAbsolute={false} />;
  }

  return (
    <>
      <DataTable data={[data]} columns={tableColumns} options={tableOptions} isVisible testId={""} />
      <ConfirmationDialog
        testId={"peer-evaluation-dashboard-title-datatable-on-delete"}
        isOpen={isDeletePeerEvaluationOpen}
        title={content.containers.peerEvaluationsDataTable.confirmationOnDelete.title}
        textContent={content.containers.peerEvaluationsDataTable.confirmationOnDelete.bodyText}
        onAccept={onDeleteDialogAccept}
        onClose={onDeleteDialogClose}
        closeText={content.containers.peerEvaluationsDataTable.confirmationOnDelete.closeText}
        acceptText={content.containers.peerEvaluationsDataTable.confirmationOnDelete.acceptText}
      />
    </>
  );
};

export default memo(PeerEvaluationsDashboard);
