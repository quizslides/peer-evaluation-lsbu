import React, { memo } from "react";

import { default as DashboardMUI } from "@mui/icons-material/Dashboard";

import { Icon } from "@/icons/type";

const DashboardIcon = ({ testId, ...props }: Icon) => {
  return <DashboardMUI data-testid={testId} {...props} />;
};

export default memo(DashboardIcon);
