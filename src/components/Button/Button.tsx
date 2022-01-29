import * as React from "react";

import { Button as ButtonMUI } from "@mui/material";

type ButtonVariant = "text" | "outlined" | "contained";

interface IButton {
  text: string;
  variant: ButtonVariant;
}

const Button = ({ text, variant = "text" }: IButton) => {
  return <ButtonMUI variant={variant}>{text}</ButtonMUI>;
};

export default Button;
