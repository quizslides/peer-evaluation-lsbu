import React from "react";

import { default as ThumbUpAltIconMUI } from "@mui/icons-material/ThumbUpAlt";

import { Icon } from "@/icons/type";

const ThumbUpAltIcon = ({ testId, ...props }: Icon) => {
  return <ThumbUpAltIconMUI data-testid={testId} {...props} />;
};

export default ThumbUpAltIcon;
