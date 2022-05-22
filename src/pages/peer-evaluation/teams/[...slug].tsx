import React, { useState } from "react";

import { NextPage } from "next";

import { Base, PageTitle } from "@/components";
import { PeerEvaluationNavigationFab } from "@/containers";
import { RoleScope } from "@/utils";

const Teams: NextPage = () => {
  const [isRedirecting, setRedirecting] = useState(false);

  const isLoading = isRedirecting;

  return (
    <Base topLeftComponent="menu" loading={isLoading}>
      <PageTitle title={"Teams"} testId="page-update-peer-evaluation-title" variant="h4" margin="2em" />

      <PeerEvaluationNavigationFab setRedirecting={() => setRedirecting(true)} />
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

export default Teams;
