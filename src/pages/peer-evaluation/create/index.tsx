import React, { useState } from "react";

import { NextPage } from "next";
import { useRouter } from "next/router";

import { Base, PageTitle } from "@/components";
import CreatePeerEvaluationForm from "@/containers/CreatePeerEvaluationForm";
import routing from "@/routing";
import { RoleScope } from "@/utils";

const CreatePeerEvaluation: NextPage = () => {
  const router = useRouter();

  const [isRedirecting, setRedirecting] = useState(false);

  const getRedirectUrlOnAction = () => {
    if (typeof router.query.redirectUrl === "string") {
      return router.query.redirectUrl;
    }

    return routing.dashboard;
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

  return (
    <Base topLeftComponent="menu" loading={isRedirecting}>
      <PageTitle
        title={"Create Peer Evaluation"}
        testId="page-create-peer-evaluation-title"
        variant="h4"
        margin="2em"
      />
      <CreatePeerEvaluationForm onSubmit={onSubmitCreatePeerEvaluation} onCancel={onCancelCreatePeerEvaluation} />
    </Base>
  );
};

export const getStaticProps = () => {
  return {
    props: {
      protected: true,
      roles: [RoleScope.ADMIN, RoleScope.LECTURER],
    },
  };
};

export default CreatePeerEvaluation;
