import React from "react";

import { default as HelpOutlineIconMUI } from "@mui/icons-material/HelpOutline";

import { Icon } from "@/icons/type";

const HelpOutline = ({ testId, ...props }: Icon) => {
  return <HelpOutlineIconMUI data-testid={testId} {...props} />;
};

export default HelpOutline;
