import React, { memo } from "react";

import { default as VisibilityOffMUI } from "@mui/icons-material/VisibilityOff";

import { Icon } from "@/icons/type";

const VisibilityOffIcon = ({ testId, ...props }: Icon) => {
  return <VisibilityOffMUI data-testid={testId} {...props} />;
};

export default memo(VisibilityOffIcon);
