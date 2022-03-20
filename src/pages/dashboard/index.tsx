import React from "react";

import type { NextPage } from "next";

import { Base } from "@/components";
import { CenteredContent } from "@/styles";
import { RoleScope } from "@/utils";

const Dashboard: NextPage = () => {
  return (
    <Base topLeftComponent="menu">
      <CenteredContent>Dashboard</CenteredContent>
    </Base>
  );
};

export const getStaticProps = () => {
  return {
    props: {
      protected: true,
      roles: [RoleScope.AUTHENTICATED],
    },
  };
};

export default Dashboard;
