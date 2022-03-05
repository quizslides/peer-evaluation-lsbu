import React, { memo } from "react";

import { default as PeopleMUI } from "@mui/icons-material/People";

import { Icon } from "@/icons/type";

const People = ({ testId, ...props }: Icon) => {
  return <PeopleMUI data-testid={testId} {...props} />;
};

export default memo(People);
