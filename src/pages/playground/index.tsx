import React from "react";

import type { NextPage } from "next";
import { useSession } from "next-auth/react";

import { Base } from "@/components";
import { CenteredContent } from "@/styles";

const Playground: NextPage = () => {
  const { data: session, status } = useSession();

  const loading = status === "loading";

  return (
    <Base loading={loading} topLeftComponent={session ? "menu" : "backArrow"}>
      <CenteredContent>Playground</CenteredContent>
    </Base>
  );
};

export default Playground;
