import React, { FC } from "react";

import { Link as LinkMUI, LinkProps } from "@mui/material";

interface ILink extends LinkProps {
  testId: string;
}

const Link: FC<ILink> = ({ testId, ...props }) => {
  return <LinkMUI data-testid={testId} {...props} />;
};

export default Link;
