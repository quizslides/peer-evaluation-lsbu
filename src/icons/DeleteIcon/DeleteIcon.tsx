import React, { memo } from "react";

import { default as DeleteIconMUI } from "@mui/icons-material/Delete";

import { Icon } from "@/icons/type";

const DeleteIcon = ({ testId, ...props }: Icon) => {
  return <DeleteIconMUI data-testid={testId} {...props} />;
};

export default memo(DeleteIcon);
