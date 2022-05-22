import React, { memo } from "react";

import { default as SchoolMUI } from "@mui/icons-material/School";

import { Icon } from "@/icons/type";

const StudentIcon = ({ testId, ...props }: Icon) => {
  return <SchoolMUI data-testid={testId} {...props} />;
};

export default memo(StudentIcon);
