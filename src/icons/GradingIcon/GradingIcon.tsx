import React, { memo } from "react";

import { default as GradingMUI } from "@mui/icons-material/Grading";

import { Icon } from "@/icons/type";

const GradingIcon = ({ testId, ...props }: Icon) => {
  return <GradingMUI data-testid={testId} {...props} />;
};

export default memo(GradingIcon);
