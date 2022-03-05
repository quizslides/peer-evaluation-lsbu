import React, { memo } from "react";

import { Dialog as DialogMUI, DialogProps } from "@mui/material";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

import Button, { ButtonVariant } from "@/components/Button/Button";

interface IDialog extends DialogProps {
  testId: string;
  title: string;
  content: React.ReactNode;
  rightButton: string;
  leftButton: string;
  rightButtonVariant?: ButtonVariant;
  leftButtonVariant?: ButtonVariant;
  onClickRightButton: () => void;
  onClickLeftButton: () => void;
  extraRightButton?: React.ReactNode;
}

const Dialog = ({
  testId,
  title,
  content,
  rightButton,
  leftButton,
  onClickRightButton,
  onClickLeftButton,
  rightButtonVariant = "text",
  leftButtonVariant = "text",
  extraRightButton,
  ...props
}: IDialog) => {
  return (
    <DialogMUI data-testid={testId} {...props}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent dividers>{content}</DialogContent>
      <DialogActions>
        <Button autoFocus onClick={onClickLeftButton} variant={leftButtonVariant} testId={`${testId}-left-button`}>
          {leftButton}
        </Button>
        <Button onClick={onClickRightButton} variant={rightButtonVariant} testId={`${testId}-right-button`}>
          {rightButton}
        </Button>
        {extraRightButton}
      </DialogActions>
    </DialogMUI>
  );
};

Dialog.defaultProps = { rightButtonVariant: "text", leftButtonVariant: "text", extraRightButton: <></> };

export default memo(Dialog);
