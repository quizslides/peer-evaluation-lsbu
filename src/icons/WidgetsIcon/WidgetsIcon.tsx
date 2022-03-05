import React, { memo } from "react";

import { default as WidgetsIconMUI } from "@mui/icons-material/Widgets";

import { Icon } from "@/icons/type";

const WidgetsIcon = ({ testId, ...props }: Icon) => {
  return <WidgetsIconMUI data-testid={testId} {...props} />;
};

export default memo(WidgetsIcon);
