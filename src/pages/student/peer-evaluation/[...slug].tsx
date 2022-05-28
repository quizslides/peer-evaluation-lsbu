import React, { useState } from "react";

import { NextPage } from "next";

import { Base, PageTitle } from "@/components";
import { PeerEvaluationNavigationFab } from "@/containers";
import { RoleScope } from "@/utils";

const testId = "page-student-peer";

const StudentPeerEvaluation: NextPage = () => {
  const [isRedirecting, setRedirecting] = useState(false);

  const isLoading = isRedirecting;

  return (
    <Base topLeftComponent="menu" loading={isLoading}>
      <PageTitle title={"Peer Evaluation"} testId={`${testId}-title`} variant="h4" margin="2em" />
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
      roles: [RoleScope.ADMIN, RoleScope.LECTURER, RoleScope.STUDENT],
    },
  };
};

export default StudentPeerEvaluation;
