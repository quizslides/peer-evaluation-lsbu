import React, { memo } from "react";

import { default as ListIconMUI } from "@mui/icons-material/List";

import { Icon } from "@/icons/type";

const ListIcon = ({ testId, ...props }: Icon) => {
  return <ListIconMUI data-testid={testId} {...props} />;
};

export default memo(ListIcon);
