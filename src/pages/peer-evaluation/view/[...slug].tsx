import React, { useEffect, useState } from "react";

import { useApolloClient } from "@apollo/client";
import { Container } from "@mui/material";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { ThemeProvider, createTheme, styled } from "@mui/material/styles";
import { MUIDataTableColumnDef, MUIDataTableOptions } from "mui-datatables";
import { NextPage } from "next";
import { useRouter } from "next/router";

import { Base, ConfirmationDialog, DataTable, DataTableAddActionButtonIcon, PageTitle } from "@/components";
import { UpdatePeerEvaluationForm } from "@/containers";
import DataTableEditDeleteToolbar from "@/containers/DataTableEditDeleteToolbar";
import content from "@/content";
import deletePeerEvaluation from "@/requests/direct/mutation/deletePeerEvaluation";
import routing from "@/routing";
import { theme } from "@/styles/index";
import { RoleScope, errorNotification, loadingNotification, successNotification } from "@/utils";

const ViewPeerEvaluation: NextPage = () => {
  const { push, query, isFallback } = useRouter();

  const apolloClient = useApolloClient();

  const [isRedirecting, setRedirecting] = useState(false);

  const [peerEvaluationId, setPeerEvaluationId] = useState<string | null>(null);

  const [isDeletePeerEvaluationOpen, setDeletePeerEvaluationConfirmationOpen] = useState(false);

  const [isError, setIsError] = useState<boolean>(false);

  const isOwnerRole = true;

  const setError = () => {
    setIsError(true);
  };

  const getRedirectUrlOnAction = () => {
    if (typeof query.redirectUrl === "string") {
      return query.redirectUrl;
    }

    return routing.dashboard;
  };

  const onSubmitUpdatePeerEvaluation = () => {
    redirectUserOnAction();
  };

  const onCancelUpdatePeerEvaluation = () => {
    redirectUserOnAction();
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

  const onDeletePeerEvaluationConfirmation = () => {
    setDeletePeerEvaluationConfirmationOpen(true);
  };

  const redirectUserOnAction = () => {
    setRedirecting(true);
    push(getRedirectUrlOnAction());
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

  useEffect(() => {
    const slug = query.slug;

    if (Array.isArray(slug)) {
      setPeerEvaluationId(slug[0]);
    }
  }, [query.slug]);

  const data = [
    {
      id: "Test",
      title: "Test",
      code: "Test",
      totalStudents: 10,
      totalTeams: 10,
      marks: "null",
      status: "DRAFT",
      schools: ["Test"],
      totalCompletedPeerEvaluations: 10,
      reminder: "true",
      submissionsLockDate: new Date().toLocaleDateString(),
      maxGradeIncrease: "maxGradeIncrease",
      maxGradeDecrease: "maxGradeDecrease",
    },
  ];

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
      name: "totalStudents",
      label: "totalStudents",
    },
    {
      name: "totalTeams",
      label: "totalTeams",
    },
    {
      name: "marks",
      label: "marks",
    },
    {
      name: "status",
      label: "status",
    },
    {
      name: "schools",
      label: "schools",
    },
    {
      name: "totalCompletedPeerEvaluations",
      label: "totalCompletedPeerEvaluations",
    },
    {
      name: "reminder",
      label: "reminder",
    },
    {
      name: "submissionsLockDate",
      label: "submissionsLockDate",
    },
    {
      name: "maxGradeIncrease",
      label: "maxGradeIncrease",
    },
    {
      name: "maxGradeDecrease",
      label: "maxGradeDecrease",
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

  return (
    <Base topLeftComponent="menu" loading={isRedirecting || isFallback || !peerEvaluationId} error={isError}>
      <PageTitle title={"Peer Evaluation"} testId="page-view-peer-evaluation-title" variant="h4" margin="2em" />
      <Container maxWidth="lg">
        <ThemeProvider
          theme={createTheme({
            breakpoints: {
              values: {
                xs: 0,
                sm: 0,
                md: 5000,
                lg: 1280,
                xl: 1920,
              },
            },
          })}
        >
          <DataTable data={data} columns={tableColumns} options={tableOptions} isVisible testId={""} />
        </ThemeProvider>
      </Container>

      <ConfirmationDialog
        testId={"page-view-peer-evaluation-title-datatable-on-delete"}
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

export default ViewPeerEvaluation;
