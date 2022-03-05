import React, { FC, memo } from "react";

import { Button as ButtonMUI, ButtonProps } from "@mui/material";

export type ButtonVariant = "text" | "outlined" | "contained";

interface IButton extends ButtonProps {
  variant: ButtonVariant;
  testId: string;
}

const Button: FC<IButton> = ({ variant, testId, ...props }) => {
  return <ButtonMUI data-testid={testId} {...props} variant={variant} />;
};

export default memo(Button);
