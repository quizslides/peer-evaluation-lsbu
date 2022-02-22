import React, { memo } from "react";

import { IconButton, IconButtonProps } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";

interface IIconButtonWrapper extends IconButtonProps {
  testId: string;
  tooltip?: string;
}

const IconButtonWrapper = ({ tooltip, testId, children, ...props }: IIconButtonWrapper) => {
  if (!tooltip) {
    return (
      <IconButton data-testid={testId} {...props}>
        {children}
      </IconButton>
    );
  }

  return (
    <Tooltip title={tooltip} disableInteractive>
      <IconButton data-testid={testId} {...props}>
        {children}
      </IconButton>
    </Tooltip>
  );
};

export default memo(IconButtonWrapper);
