import React, { memo } from "react";

import { default as FileUploadIconMUI } from "@mui/icons-material/FileUpload";

import { Icon } from "@/icons/type";

const UploadIcon = ({ testId, ...props }: Icon) => {
  return <FileUploadIconMUI data-testid={testId} {...props} />;
};

export default memo(UploadIcon);
