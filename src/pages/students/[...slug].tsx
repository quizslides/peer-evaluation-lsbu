import React, { useEffect, useState } from "react";

import { NextPage } from "next";
import { useRouter } from "next/router";

import { Base, PageTitle } from "@/components";
import { UpdatePeerEvaluationForm } from "@/containers";
import routing from "@/routing";
import { RoleScope } from "@/utils";

const Students: NextPage = () => {
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

    console.log(slug);

    // if (Array.isArray(slug)) {
    //   setPeerEvaluationId(slug[0]);
    // }
  }, [query.slug]);

  return (
    <Base topLeftComponent="menu" loading={false} error={isError}>
      <PageTitle title={"Students"} testId="page-update-peer-evaluation-title" variant="h4" margin="2em" />
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
      roles: [RoleScope.AUTHENTICATED],
    },
  };
};

export default Students;
