import React, { memo } from "react";

import { default as MenuIconMUI } from "@mui/icons-material/Menu";

import { Icon } from "@/icons/type";

const MenuIcon = ({ testId, ...props }: Icon) => {
  return <MenuIconMUI data-testid={testId} {...props} />;
};

export default memo(MenuIcon);
