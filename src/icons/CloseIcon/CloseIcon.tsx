import React, { memo } from "react";

import { default as CloseIconMUI } from "@mui/icons-material/Close";

import { Icon } from "@/icons/type";

const CloseIcon = ({ testId, ...props }: Icon) => {
  return <CloseIconMUI data-testid={testId} {...props} />;
};

export default memo(CloseIcon);
