import React, { memo } from "react";

import { Dialog as DialogMUI, DialogProps, Tooltip } from "@mui/material";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

import Button, { ButtonVariant } from "@/components/Button/Button";

// @ts-ignore
interface IDialog extends DialogProps {
  content: React.ReactNode;
  extraLeftButton?: React.ReactNode | null;
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
  tooltipLeftButton: string;
  tooltipRightButton: string;
}

const Dialog = ({
  content,
  extraLeftButton,
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
  tooltipLeftButton,
  tooltipRightButton,
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
        {extraLeftButton}
        {!isDisableLeftButton && (
          <Tooltip title={tooltipLeftButton}>
            <Button onClick={onClickLeftButton} variant={leftButtonVariant} testId={`${testId}-left`}>
              {leftButton}
            </Button>
          </Tooltip>
        )}
        <Tooltip title={tooltipRightButton}>
          <Button onClick={onClickRightButton} variant={rightButtonVariant} testId={`${testId}-right`}>
            {rightButton}
          </Button>
        </Tooltip>

        {extraRightButton}
      </DialogActions>
    </DialogMUI>
  );
};

Dialog.defaultProps = {
  extraLeftButton: null,
  extraRightButton: null,
  leftButtonVariant: "text",
  rightButtonVariant: "text",
  tooltipLeftButton: "",
  tooltipRightButton: "",
};

export default memo(Dialog);
