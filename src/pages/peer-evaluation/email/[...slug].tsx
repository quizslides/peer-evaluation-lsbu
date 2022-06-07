import React, { useEffect, useState } from "react";

import { useApolloClient } from "@apollo/client";
import { Container } from "@mui/material";
import { NextPage, NextPageContext } from "next";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";

import { Base, PageTitle } from "@/components";
import { PeerEvaluationNavigationFab } from "@/containers";
import { PeerEvaluationEmailReminderForm } from "@/forms";
import { EmailReminder } from "@/forms/PeerEvaluationEmailReminderForm";
import updatePeerEvaluationEmail from "@/requests/direct/mutation/updatePeerEvaluationEmail";
import useGetPeerEvaluationEmailReminder from "@/requests/hooks/query/useGetPeerEvaluationEmailReminder";
import routing from "@/routing";
import { NextPagePros } from "@/types/pages";
import { RoleScope, errorNotification, successNotification } from "@/utils";

const PeerEvaluationEmail: NextPage<NextPagePros> = ({ session }) => {
  const { push, query, isFallback } = useRouter();

  const apolloClient = useApolloClient();

  const loadingSession = !!session;

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

  const isLoading = !data || !loadingSession || isRedirecting || isFallback || !peerEvaluationId || loadingFetch;

  return (
    <Base topLeftComponent="menu" loading={isLoading} error={!!error}>
      <PageTitle title={"Email Reminder"} testId="page-email-peer-evaluation-title" variant="h4" margin="2em" />
      <Container maxWidth="lg">
        {data && (
          <PeerEvaluationEmailReminderForm
            onSubmitForm={onSubmitEmailReminderForm}
            onSendEmailReminder={() => null}
            onCancelForm={onCancelEmailReminderForm}
            emailSubjectReminder={data.email.subject}
            emailBodyReminder={data.email.body}
            isViewOnly={data.peerEvaluationTeachingMember.role === "VIEWER"}
          />
        )}
      </Container>
      <PeerEvaluationNavigationFab setRedirecting={() => setRedirecting(true)} />
    </Base>
  );
};

export async function getServerSideProps(context: NextPageContext) {
  return {
    props: {
      session: await getSession(context),
      protected: true,
      roles: [RoleScope.ADMIN, RoleScope.LECTURER],
    },
  };
}

export default PeerEvaluationEmail;
