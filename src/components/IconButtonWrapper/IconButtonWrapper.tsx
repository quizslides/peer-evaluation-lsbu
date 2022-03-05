import React, { memo } from "react";

import styled from "@emotion/styled";
import { IconButton, IconButtonProps } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";

interface IIconButtonWrapper extends IconButtonProps {
  testId: string;
  tooltip?: string;
  component?: string;
}

const CustomIconCButton = styled(IconButton)``;

const IconButtonWrapper = ({ tooltip, testId, children, ...props }: IIconButtonWrapper) => {
  if (!tooltip) {
    return (
      <CustomIconCButton data-testid={testId} {...props}>
        {children}
      </CustomIconCButton>
    );
  }

  return (
    <Tooltip title={tooltip} disableInteractive>
      <CustomIconCButton data-testid={testId} {...props}>
        {children}
      </CustomIconCButton>
    </Tooltip>
  );
};

export default memo(IconButtonWrapper);
