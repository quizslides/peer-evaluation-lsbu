import React from "react";

import { default as HomeIconMUI } from "@mui/icons-material/Home";

import { Icon } from "@/icons/type";

const HomeIcon = ({ testId, ...props }: Icon) => {
  return <HomeIconMUI data-testid={testId} {...props} />;
};

export default HomeIcon;
