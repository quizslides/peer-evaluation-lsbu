import React, { useEffect, useState } from "react";

import { NextPage, NextPageContext } from "next";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";

import { Base, PageTitle } from "@/components";
import { UpdatePeerEvaluationForm } from "@/containers";
import routing from "@/routing";
import { NextPagePros } from "@/types/pages";
import { RoleScope } from "@/utils";

const UpdatePeerEvaluation: NextPage<NextPagePros> = ({ session }) => {
  const { push, query, isFallback } = useRouter();

  const [isRedirecting, setRedirecting] = useState(false);

  const [peerEvaluationId, setPeerEvaluationId] = useState<string | null>(null);

  const [isError, setIsError] = useState<boolean>(false);

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

  const redirectUserOnAction = () => {
    setRedirecting(true);
    push(getRedirectUrlOnAction());
  };

  useEffect(() => {
    const slug = query.slug;

    if (Array.isArray(slug)) {
      setPeerEvaluationId(slug[0]);
    }
  }, [query.slug]);

  const isLoading = isRedirecting || isFallback || !peerEvaluationId;

  return (
    <Base topLeftComponent="menu" loading={isLoading} error={isError}>
      <PageTitle
        title={"Update Peer Evaluation"}
        testId="page-update-peer-evaluation-title"
        variant="h4"
        margin="2em"
      />
      {peerEvaluationId && session && (
        <UpdatePeerEvaluationForm
          session={session}
          setError={setError}
          onSubmit={onSubmitUpdatePeerEvaluation}
          onCancel={onCancelUpdatePeerEvaluation}
          peerEvaluationId={peerEvaluationId}
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

export default UpdatePeerEvaluation;
