import React, { FC, memo } from "react";

import { Alert as AlertMUI, AlertProps } from "@mui/material";

import content from "@/content";

interface IAlert extends AlertProps {
  testId: string;
  isVisible?: boolean;
}

const testIdBase = content.components.alert.testId;

const Alert: FC<IAlert> = ({ testId, isVisible, ...props }) => {
  if (!isVisible) {
    return null;
  }

  return <AlertMUI data-testid={`${testId}-${testIdBase}`} {...props} />;
};

Alert.defaultProps = { isVisible: true };

export default memo(Alert);
