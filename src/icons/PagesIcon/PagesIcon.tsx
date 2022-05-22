import React, { memo } from "react";

import { default as AutoStoriesIconMUI } from "@mui/icons-material/AutoStories";

import { Icon } from "@/icons/type";

const PagesIcon = ({ testId, ...props }: Icon) => {
  return <AutoStoriesIconMUI data-testid={testId} {...props} />;
};

export default memo(PagesIcon);
