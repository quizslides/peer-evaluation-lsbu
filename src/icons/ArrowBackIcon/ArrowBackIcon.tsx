import React, { memo } from "react";

import { default as ArrowBackIconMUI } from "@mui/icons-material/ArrowBack";

import { Icon } from "@/icons/type";

const ArrowBackIcon = ({ testId, ...props }: Icon) => {
  return <ArrowBackIconMUI data-testid={testId} {...props} />;
};

export default memo(ArrowBackIcon);
