import React, { memo } from "react";

import { default as EditIconMUI } from "@mui/icons-material/Edit";

import { Icon } from "@/icons/type";

const EditIcon = ({ testId, ...props }: Icon) => {
  return <EditIconMUI data-testid={testId} {...props} />;
};

export default memo(EditIcon);
