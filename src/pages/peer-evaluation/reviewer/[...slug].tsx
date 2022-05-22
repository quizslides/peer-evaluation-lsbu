import React from "react";

import { NextPage } from "next";

import { Base, PageTitle } from "@/components";
import { RoleScope } from "@/utils";

const PeerEvaluationReviewer: NextPage = () => {
  return (
    <Base topLeftComponent="menu" loading={false} error={false}>
      <PageTitle title={"Reviewer"} testId="page-email-peer-evaluation-title" variant="h4" margin="2em" />
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
      roles: [RoleScope.ADMIN, RoleScope.STUDENT],
    },
  };
};

export default PeerEvaluationReviewer;
