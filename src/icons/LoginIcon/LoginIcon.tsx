import React, { memo } from "react";

import { default as LoginIconMUI } from "@mui/icons-material/Login";

import { Icon } from "@/icons/type";

const LoginIcon = ({ testId, ...props }: Icon) => {
  return <LoginIconMUI data-testid={testId} {...props} />;
};

export default memo(LoginIcon);
