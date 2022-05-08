import React, { useEffect, useState } from "react";

import { useApolloClient } from "@apollo/client";
import { Container } from "@mui/material";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { ThemeProvider, createTheme, styled } from "@mui/material/styles";
import { MUIDataTableColumnDef, MUIDataTableOptions } from "mui-datatables";
import { NextPage } from "next";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

import { Base, ConfirmationDialog, DataTable, DataTableAddActionButtonIcon, PageTitle } from "@/components";
import { UpdatePeerEvaluationForm } from "@/containers";
import DataTableEditDeleteToolbar from "@/containers/DataTableEditDeleteToolbar";
import PeerEvaluationsDashboard from "@/containers/PeerEvaluationsDashboard";
import content from "@/content";
import { PeerEvaluationEmailReminderForm } from "@/forms";
import { EmailReminder } from "@/forms/PeerEvaluationEmailReminderForm";
import { PeerEvaluationDashboard } from "@/pages/api/resolvers/peer-evaluation";
import deletePeerEvaluation from "@/requests/direct/mutation/deletePeerEvaluation";
import updatePeerEvaluationEmail from "@/requests/direct/mutation/updatePeerEvaluationEmail";
import useGetPeerEvaluationDashboard from "@/requests/hooks/query/useGetPeerEvaluationDashboard";
import useGetPeerEvaluationEmailReminder from "@/requests/hooks/query/useGetPeerEvaluationEmailReminder";
import routing from "@/routing";
import { theme } from "@/styles/index";
import { sanitizePeerEvaluationViewDataOnFetch } from "@/transformers/peer-evaluation";
import { RoleScope, errorNotification, loadingNotification, successNotification } from "@/utils";

const PeerEvaluationEmail: NextPage = () => {
  const { data: session, status } = useSession();

  const { push, query, isFallback } = useRouter();

  const apolloClient = useApolloClient();

  const loadingSession = status === "loading" || !!session;

  const [isRedirecting, setRedirecting] = useState(false);

  const [peerEvaluationId, setPeerEvaluationId] = useState<string | null>(null);

  const [getPeerEvaluationEmailReminder, { loading: loadingFetch, error, data }] = useGetPeerEvaluationEmailReminder(
    "GetPeerEvaluationEmailReminder"
  );

  const getRedirectUrlOnAction = () => {
    if (typeof query.redirectUrl === "string") {
      return query.redirectUrl;
    }

    return routing.dashboard;
  };

  const onCancelEmailReminderForm = () => {
    setRedirecting(true);
    push(getRedirectUrlOnAction());
  };

  const onSubmitEmailReminderForm = async ({ emailSubjectReminder, emailBodyReminder }: EmailReminder) => {
    if (peerEvaluationId) {
      const { errors } = await updatePeerEvaluationEmail(
        apolloClient,
        emailSubjectReminder,
        emailBodyReminder,
        peerEvaluationId
      );

      if (!errors) {
        successNotification("Email updated successfully", "updatePeerEvaluationEmail");
      } else {
        // TODO: Create a granular error notification to the user with all the errors
        errorNotification("Error updating email reminder", "updatePeerEvaluationEmail");
      }
    }
  };

  useEffect(() => {
    const slug = query.slug;

    if (Array.isArray(slug) && session) {
      const peerEvaluationId = slug[0];

      setPeerEvaluationId(peerEvaluationId);

      getPeerEvaluationEmailReminder({
        variables: {
          whereEmail: {
            peerEvaluationId: peerEvaluationId,
          },
          whereTeachingMemberRole: {
            userId_peerEvaluationId: {
              peerEvaluationId: peerEvaluationId,
              userId: session.user.id,
            },
          },
        },
      });
    }
  }, [getPeerEvaluationEmailReminder, query.slug, session]);

  return (
    <Base
      topLeftComponent="menu"
      loading={!data || !loadingSession || isRedirecting || isFallback || !peerEvaluationId || loadingFetch}
      error={false}
    >
      <PageTitle title={"Email Reminder"} testId="page-email-peer-evaluation-title" variant="h4" margin="2em" />
      <Container maxWidth="lg">
        {data && (
          <PeerEvaluationEmailReminderForm
            onSubmitForm={onSubmitEmailReminderForm}
            onSendEmailReminder={() => console.log("send")}
            onCancelForm={onCancelEmailReminderForm}
            emailSubjectReminder={data.email.subject}
            emailBodyReminder={data.email.body}
            isViewOnly={data.peerEvaluationTeachingMember.role === "VIEWER"}
          />
        )}
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

export default PeerEvaluationEmail;
