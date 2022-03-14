import React, { memo } from "react";

import { default as AddIconMUI } from "@mui/icons-material/Add";

import { Icon } from "@/icons/type";

const AddIcon = ({ testId, ...props }: Icon) => {
  return <AddIconMUI data-testid={testId} {...props} />;
};

export default memo(AddIcon);
