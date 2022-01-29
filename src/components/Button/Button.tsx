import React, { FC } from "react";

import { Button as ButtonMUI, ButtonProps } from "@mui/material";

type ButtonVariant = "text" | "outlined" | "contained";

interface IButton extends ButtonProps {
  variant: ButtonVariant;
}

const Button: FC<IButton> = (props) => {
  const { variant } = props;

  return <ButtonMUI {...props} variant={variant} />;
};

export default Button;
