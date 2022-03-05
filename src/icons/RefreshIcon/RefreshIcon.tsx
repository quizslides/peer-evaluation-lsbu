import React, { memo } from "react";

import { default as RefreshIconMUI } from "@mui/icons-material/Refresh";

import { Icon } from "@/icons/type";

const RefreshIcon = ({ testId, ...props }: Icon) => {
  return <RefreshIconMUI data-testid={testId} {...props} />;
};

export default memo(RefreshIcon);
