import React, { memo } from "react";

import { default as GroupsIconMUI } from "@mui/icons-material/Groups";

import { Icon } from "@/icons/type";

const GroupsIcon = ({ testId, ...props }: Icon) => {
  return <GroupsIconMUI data-testid={testId} {...props} />;
};

export default memo(GroupsIcon);
