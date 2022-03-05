import React, { memo } from "react";

import { default as GridViewIconMUI } from "@mui/icons-material/GridView";

import { Icon } from "@/icons/type";

const GridViewIcon = ({ testId, ...props }: Icon) => {
  return <GridViewIconMUI data-testid={testId} {...props} />;
};

export default memo(GridViewIcon);
