import React, { memo } from "react";

import { default as LogoutIconMUI } from "@mui/icons-material/Logout";

import { Icon } from "@/icons/type";

const LogoutIcon = ({ testId, ...props }: Icon) => {
  return <LogoutIconMUI data-testid={testId} {...props} />;
};

export default memo(LogoutIcon);
