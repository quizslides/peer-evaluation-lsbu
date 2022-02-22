import React from "react";

import type { NextPage } from "next";

import { Base } from "@/components";
import { CenteredContent } from "@/styles";

const Playground: NextPage = () => {
  return (
    <Base topLeftComponent="backArrow">
      <CenteredContent>Help Page</CenteredContent>
    </Base>
  );
};

export default Playground;
