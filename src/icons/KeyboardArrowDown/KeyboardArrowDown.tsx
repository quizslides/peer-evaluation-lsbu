import React, { memo } from "react";

import { default as KeyboardArrowDownMUI } from "@mui/icons-material/KeyboardArrowDown";

import { Icon } from "@/icons/type";

const KeyboardArrowDown = ({ testId, ...props }: Icon) => {
  return <KeyboardArrowDownMUI data-testid={testId} {...props} />;
};

export default memo(KeyboardArrowDown);
