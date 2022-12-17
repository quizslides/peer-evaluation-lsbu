import React, { memo } from "react";

import { Dialog as DialogMUI, DialogProps } from "@mui/material";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

import Button, { ButtonVariant } from "@/components/Button/Button";

interface IDialog extends DialogProps {
  content: React.ReactNode;
  extraRightButton?: React.ReactNode | null;
  isDisableLeftButton?: boolean;
  leftButton?: string;
  leftButtonVariant?: ButtonVariant;
  onClickLeftButton?: () => void;
  onClickRightButton: () => void;
  rightButton: string;
  rightButtonVariant?: ButtonVariant;
  testId: string;
  title?: string;
}

const Dialog = ({
  content,
  extraRightButton,
  isDisableLeftButton = false,
  leftButton,
  leftButtonVariant = "text",
  onClickLeftButton,
  onClickRightButton,
  rightButton,
  rightButtonVariant = "text",
  testId,
  title,
  ...props
}: IDialog) => {
  return (
    <DialogMUI
      data-testid={testId}
      {...props}
      scroll={"paper"}
      PaperProps={{
        style: {
          overflow: "inherit",
        },
      }}
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent dividers>{content}</DialogContent>
      <DialogActions>
        {!isDisableLeftButton && (
          <Button autoFocus onClick={onClickLeftButton} variant={leftButtonVariant} testId={`${testId}-left-button`}>
            {leftButton}
          </Button>
        )}
        <Button onClick={onClickRightButton} variant={rightButtonVariant} testId={`${testId}-right-button`}>
          {rightButton}
        </Button>
        {extraRightButton}
      </DialogActions>
    </DialogMUI>
  );
};

Dialog.defaultProps = {
  extraRightButton: null,
  leftButtonVariant: "text",
  rightButtonVariant: "text",
};

export default memo(Dialog);
