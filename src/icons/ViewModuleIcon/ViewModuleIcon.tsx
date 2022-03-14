import React, { memo } from "react";

import { default as ViewModuleIconMUI } from "@mui/icons-material/ViewModule";

import { Icon } from "@/icons/type";

const ViewModuleIcon = ({ testId, ...props }: Icon) => {
  return <ViewModuleIconMUI data-testid={testId} {...props} />;
};

export default memo(ViewModuleIcon);
