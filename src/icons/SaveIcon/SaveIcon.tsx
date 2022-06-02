import React, { memo } from "react";

import { default as SaveIconMUI } from "@mui/icons-material/Save";

import { Icon } from "@/icons/type";

const SaveIcon = ({ testId, ...props }: Icon) => {
  return <SaveIconMUI data-testid={testId} {...props} />;
};

export default memo(SaveIcon);
