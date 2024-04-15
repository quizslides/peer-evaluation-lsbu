import React, { useState } from "react";

import { NextPage, NextPageContext } from "next";

import { useRouter } from "next/router";
import { getSession } from "next-auth/react";

import { Base, PageTitle } from "@/components";
import CreatePeerEvaluationForm from "@/containers/CreatePeerEvaluationForm";
import routing from "@/routing";
import { NextPagePros } from "@/types/pages";
import { RoleScope } from "@/utils";

const CreatePeerEvaluation: NextPage<NextPagePros> = ({ session }) => {
  const router = useRouter();

  const [isRedirecting, setRedirecting] = useState(false);

  const getRedirectUrlOnAction = (peerEvaluationId?: string) => {
    if (peerEvaluationId) {
      return `${routing.lecturer.peerEvaluation.view}/${peerEvaluationId}`;
    }

    if (typeof router.query.redirectUrl === "string") {
      return router.query.redirectUrl;
    }

    return routing.home;
  };

  const onSubmitCreatePeerEvaluation = (peerEvaluationId?: string) => {
    redirectUserOnAction(peerEvaluationId);
  };

  const onCancelCreatePeerEvaluation = () => {
    redirectUserOnAction();
  };

  const redirectUserOnAction = (peerEvaluationId?: string) => {
    setRedirecting(true);
    router.push(getRedirectUrlOnAction(peerEvaluationId));
  };

  const isLoading = isRedirecting || !session;

  return (
    <Base topLeftComponent="menu" loading={isLoading}>
      <PageTitle
        title={"Create Peer Evaluation"}
        testId="page-create-peer-evaluation-title"
        variant="h4"
        margin="2em"
      />
      {session && (
        <CreatePeerEvaluationForm
          onSubmit={onSubmitCreatePeerEvaluation}
          onCancel={onCancelCreatePeerEvaluation}
          session={session}
        />
      )}
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

export default CreatePeerEvaluation;
