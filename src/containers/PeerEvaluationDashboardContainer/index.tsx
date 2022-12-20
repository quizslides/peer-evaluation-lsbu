import React, { memo, useEffect, useState } from "react";

import { useApolloClient } from "@apollo/client";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import { MUIDataTableColumn, MUIDataTableOptions } from "mui-datatables";
import { Session } from "next-auth";
import { useRouter } from "next/router";

import { Button, ConfirmationDialog, DataTable } from "@/components";
import DataTableEditDeleteToolbar from "@/containers/DataTableEditDeleteToolbar";
import LoadingContainer from "@/containers/LoadingContainer";
import PeerEvaluationStatusContainer from "@/containers/PeerEvaluationStatusContainer";
import content from "@/content";
import { CopyIcon } from "@/icons";
import { PeerEvaluationDashboard } from "@/pages/api/resolvers/lecturer/peer-evaluation";
import deletePeerEvaluation from "@/requests/direct/mutation/deletePeerEvaluation";
import routing from "@/routing";
import { PeerEvaluationStatus, PeerEvaluationTeachingMemberRoles } from "@/types/peer-evaluation";
import { errorNotification, loadingNotification, successNotification } from "@/utils";
import { getDateLocaleString, getDateTimeDiff } from "@/utils/date";

interface IPeerEvaluationDashboardContainer {
  data: PeerEvaluationDashboard;
  session: Session | null;
}

const testId = "container-peer-evaluation-dashboard";

const PeerEvaluationDashboardContainer = ({ data, session }: IPeerEvaluationDashboardContainer) => {
  const { push } = useRouter();

  const apolloClient = useApolloClient();

  const [isRedirecting, setRedirecting] = useState(false);

  const [teachingMemberRole, setTeachingMemberRole] = useState<PeerEvaluationTeachingMemberRoles>(
    PeerEvaluationTeachingMemberRoles["VIEWER"]
  );

  const peerEvaluationId = data.id;

  const peerEvaluationCode = data.code;

  const peerEvaluationStatus = data.status;

  const [isDeletePeerEvaluationOpen, setDeletePeerEvaluationConfirmationOpen] = useState(false);

  useEffect(() => {
    if (session) {
      const teachingMemberRole =
        session?.user.role === "ADMIN"
          ? "OWNER"
          : data.peerEvaluationTeachingMembers?.filter(({ user }) => user?.email === session.user.email)[0].role;

      if (teachingMemberRole) {
        setTeachingMemberRole(teachingMemberRole as PeerEvaluationTeachingMemberRoles);
      }
    }
  }, [data.peerEvaluationTeachingMembers, session]);

  const onRedirectToPage = (pagePath: string) => {
    setRedirecting(true);

    push({
      pathname: `${pagePath}/${peerEvaluationId}`,
      query: {
        redirectUrl: `${routing.lecturer.peerEvaluation.view}/${peerEvaluationId}`,
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
        push(routing.home);
      } else {
        // TODO: Create a granular error notification to the user with all the errors
        errorNotification("Error deleting peer evaluation", "DeletingPeerEvaluation");
      }
    }
  };

  const copyPeerEvaluationStudentURLToClipboard = () => {
    navigator.clipboard.writeText(`${window.location.origin}${routing.student.peerEvaluation}/${peerEvaluationCode}`);
    successNotification("Student URL Copied to Clipboard");
  };

  const tableColumns: MUIDataTableColumn[] = [
    {
      name: "id",
      label: "ID",
      options: {
        display: "excluded",
      },
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
      name: "studentURL",
      label: "Peer Evaluation Student URL",
      options: {
        // eslint-disable-next-line react/no-multi-comp
        customBodyRender: () => (
          <Button
            variant={"outlined"}
            testId={""}
            onClick={copyPeerEvaluationStudentURLToClipboard}
            size="medium"
            startIcon={<CopyIcon testId="" fontSize="small" color="inherit" />}
            disabled={peerEvaluationStatus === "DRAFT"}
          >
            Copy
          </Button>
        ),
      },
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
              testId={"peer-evaluation-dashboard-total-students"}
              onClick={() => onRedirectToPage(routing.lecturer.peerEvaluation.students)}
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
              testId={"peer-evaluation-dashboard-total-teaching-members"}
              onClick={() => onRedirectToPage(routing.lecturer.peerEvaluation.edit)}
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
              testId={"peer-evaluation-dashboard-total-peer-evaluations-teams"}
              onClick={() => onRedirectToPage(routing.lecturer.peerEvaluation.teams)}
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
        // eslint-disable-next-line react/no-multi-comp
        customBodyRender: () => {
          return (
            <Button
              variant={"outlined"}
              testId={"peer-evaluation-dashboard-email-reminder"}
              onClick={() => onRedirectToPage(routing.lecturer.peerEvaluation.teams)}
              size="medium"
            >
              Edit
            </Button>
          );
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
      options: {
        customBodyRender: (totalCompletedPeerEvaluations: string) => {
          return <div data-testid={`${testId}-total-completed-peer-evaluations`}>{totalCompletedPeerEvaluations}</div>;
        },
      },
    },
    {
      name: "submissionsLockDate",
      label: "Submissions Lock Date",
      options: {
        customBodyRender: (date: Date) => {
          if (!date) {
            return "Not set";
          }

          const timeRemaining = getDateTimeDiff(new Date(date));

          return `${getDateLocaleString(date)} - ${timeRemaining}`;
        },
      },
    },
    {
      name: "maxMarkIncrease",
      label: "Max Mark Increase",
    },
    {
      name: "maxMarkDecrease",
      label: "Max Mark Decrease",
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
          onClick: () => onRedirectToPage(routing.lecturer.peerEvaluation.edit),
        }}
        visibleDeleteButton={teachingMemberRole === "OWNER"}
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

export default memo(PeerEvaluationDashboardContainer);
