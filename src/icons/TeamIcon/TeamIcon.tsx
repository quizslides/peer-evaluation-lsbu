import React, { memo } from "react";

import { default as GroupsMUI } from "@mui/icons-material/Groups";

import { Icon } from "@/icons/type";

const TeamIcon = ({ testId, ...props }: Icon) => {
  return <GroupsMUI data-testid={testId} {...props} />;
};

export default memo(TeamIcon);
