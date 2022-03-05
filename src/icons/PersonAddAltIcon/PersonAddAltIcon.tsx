import React, { memo } from "react";

import { default as PersonAddAltIconMUI } from "@mui/icons-material/PersonAddAlt";

import { Icon } from "@/icons/type";

const PersonAddAltIcon = ({ testId, ...props }: Icon) => {
  return <PersonAddAltIconMUI data-testid={testId} {...props} />;
};

export default memo(PersonAddAltIcon);
