import React, { useState } from "react";

import { NextPage, NextPageContext } from "next";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";

import { Base, PageTitle } from "@/components";
import CreatePeerEvaluationForm from "@/containers/CreatePeerEvaluationForm";
import routing from "@/routing";
import { NextPagePros } from "@/types/pages";
import { RoleScope } from "@/utils";

const CreatePeerEvaluation: NextPage<NextPagePros> = ({ session }) => {
  const router = useRouter();

  const [isRedirecting, setRedirecting] = useState(false);

  const getRedirectUrlOnAction = () => {
    if (typeof router.query.redirectUrl === "string") {
      return router.query.redirectUrl;
    }

    return routing.home;
  };

  const onSubmitCreatePeerEvaluation = () => {
    redirectUserOnAction();
  };

  const onCancelCreatePeerEvaluation = () => {
    redirectUserOnAction();
  };

  const redirectUserOnAction = () => {
    setRedirecting(true);
    router.push(getRedirectUrlOnAction());
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
