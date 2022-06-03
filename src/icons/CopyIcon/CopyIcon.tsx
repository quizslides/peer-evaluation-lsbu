import React, { memo } from "react";

import { default as ContentCopyMUI } from "@mui/icons-material/ContentCopy";

import { Icon } from "@/icons/type";

const CopyIcon = ({ testId, ...props }: Icon) => {
  return <ContentCopyMUI data-testid={testId} {...props} />;
};

export default memo(CopyIcon);
