import React from "react";

import type { NextPage, NextPageContext } from "next";
import { getSession } from "next-auth/react";

import { Base } from "@/components";
import { CenteredContent } from "@/styles";
import { NextPagePros } from "@/types/pages";

const Playground: NextPage<NextPagePros> = ({ session }) => {
  return (
    <Base topLeftComponent={session ? "menu" : "backArrow"}>
      <CenteredContent>Playground</CenteredContent>
    </Base>
  );
};

export async function getServerSideProps(context: NextPageContext) {
  return {
    props: {
      session: await getSession(context),
      protected: true,
    },
  };
}

export default Playground;
