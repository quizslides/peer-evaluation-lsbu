import React, { memo } from "react";

import { default as EmailMUI } from "@mui/icons-material/Email";

import { Icon } from "@/icons/type";

const EmailIcon = ({ testId, ...props }: Icon) => {
  return <EmailMUI data-testid={testId} {...props} />;
};

export default memo(EmailIcon);
