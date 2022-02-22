import React from "react";

import type { NextPage } from "next";

import { Base } from "@/components";
import { CenteredContent } from "@/styles";

const Dashboard: NextPage = () => {
  return (
    <Base topLeftComponent="menu">
      <CenteredContent>Dashboard</CenteredContent>
    </Base>
  );
};

export async function getStaticProps() {
  return {
    props: {
      protected: true,
    },
  };
}

export default Dashboard;
