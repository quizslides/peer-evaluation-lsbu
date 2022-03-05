import React, { memo } from "react";

import { default as CheckIconMUI } from "@mui/icons-material/Check";

import { Icon } from "@/icons/type";

const CheckIcon = ({ testId, ...props }: Icon) => {
  return <CheckIconMUI data-testid={testId} {...props} />;
};

export default memo(CheckIcon);
