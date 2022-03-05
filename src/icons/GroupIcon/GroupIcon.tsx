import React, { memo } from "react";

import { default as GroupIconMUI } from "@mui/icons-material/Group";

import { Icon } from "@/icons/type";

const GroupIcon = ({ testId, ...props }: Icon) => {
  return <GroupIconMUI data-testid={testId} {...props} />;
};

export default memo(GroupIcon);
