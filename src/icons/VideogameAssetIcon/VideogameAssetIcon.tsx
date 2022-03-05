import React, { memo } from "react";

import { default as VideogameAssetIconMUI } from "@mui/icons-material/VideogameAsset";

import { Icon } from "@/icons/type";

const VideogameAssetIcon = ({ testId, ...props }: Icon) => {
  return <VideogameAssetIconMUI data-testid={testId} {...props} />;
};

export default memo(VideogameAssetIcon);
