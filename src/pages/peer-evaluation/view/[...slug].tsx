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
import PeerEvaluationsDashboard from "@/containers/PeerEvaluationsDashboard";
import content from "@/content";
import { PeerEvaluationDashboard } from "@/pages/api/resolvers/peer-evaluation";
import deletePeerEvaluation from "@/requests/direct/mutation/deletePeerEvaluation";
import useGetPeerEvaluationDashboard from "@/requests/hooks/query/useGetPeerEvaluationDashboard";
import routing from "@/routing";
import { theme } from "@/styles/index";
import { sanitizePeerEvaluationViewDataOnFetch } from "@/transformers/peer-evaluation";
import { RoleScope, errorNotification, loadingNotification, successNotification } from "@/utils";

const ViewPeerEvaluation: NextPage = () => {
  const { push, query, isFallback } = useRouter();

  const apolloClient = useApolloClient();

  const [isRedirecting, setRedirecting] = useState(false);

  const [peerEvaluationId, setPeerEvaluationId] = useState<string | null>(null);

  const [peerEvaluationData, setPeerEvaluationData] = useState<PeerEvaluationDashboard | null>(null);

  const [getPeerEvaluationDashboard, { loading: loadingFetch, error, data }] =
    useGetPeerEvaluationDashboard("PeerEvaluationDashboard");

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
      const peerEvaluationId = slug[0];

      setPeerEvaluationId(peerEvaluationId);

      getPeerEvaluationDashboard({
        variables: {
          where: {
            id: peerEvaluationId,
          },
        },
      });
    }
  }, [getPeerEvaluationDashboard, query.slug]);

  useEffect(() => {
    if (data?.peerEvaluationDashboard) {
      setPeerEvaluationData(sanitizePeerEvaluationViewDataOnFetch(data.peerEvaluationDashboard));
    }
  }, [data]);

  return (
    <Base topLeftComponent="menu" loading={isRedirecting || isFallback || !peerEvaluationId || !data} error={isError}>
      <PageTitle
        title={`Peer Evaluation - ${data?.peerEvaluationDashboard.code}`}
        testId="page-view-peer-evaluation-title"
        variant="h4"
        margin="2em"
      />
      <Container maxWidth="lg">
        <ThemeProvider
          theme={createTheme({
            ...theme,
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
          {peerEvaluationData && <PeerEvaluationsDashboard data={peerEvaluationData} />}
        </ThemeProvider>
      </Container>
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
