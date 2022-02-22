import React, { FC, memo } from "react";

import { Typography as TypographyMUI, TypographyProps } from "@mui/material";

interface ITypography extends TypographyProps {
  testId: string;
}

const Typography: FC<ITypography> = ({ testId, ...props }) => {
  return <TypographyMUI data-testid={testId} {...props} />;
};

export default memo(Typography);
