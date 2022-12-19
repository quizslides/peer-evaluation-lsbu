import React, { memo } from "react";

import { AlertColor } from "@mui/lab/Alert";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

import Alert from "@/components//Alert/Alert";
import Button from "@/components/Button/Button";
import Typography from "@/components/Typography/Typography";

interface IConfirmationDIalog {
  acceptText: string;
  alertText?: string;
  alertVariant?: string;
  closeText: string;
  isAlertVisible?: boolean;
  isOpen: boolean;
  onAccept: () => void;
  onClose: () => void;
  testId: string;
  textContent: string;
  title: string;
}

const ConfirmationDialog = ({
  acceptText,
  alertText,
  alertVariant,
  closeText,
  isAlertVisible,
  isOpen,
  onAccept,
  onClose,
  testId,
  textContent,
  title,
}: IConfirmationDIalog) => {
  return (
    <Dialog sx={{ "& .MuiDialog-paper": { width: "80%" } }} maxWidth="xs" open={isOpen} data-testid={testId}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent dividers>
        <Alert
          testId={testId}
          severity={alertVariant as AlertColor}
          isVisible={isAlertVisible}
          style={{ marginBottom: "1rem" }}
        >
          {alertText}
        </Alert>
        <Typography testId={`${testId}-content`}>{textContent}</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant={"text"} testId={`${testId}-close`}>
          {closeText}
        </Button>
        <Button onClick={onAccept} variant="contained" testId={`${testId}-accept`}>
          {acceptText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

ConfirmationDialog.defaultProps = { alertText: "", isAlertVisible: false };

export default memo(ConfirmationDialog);
