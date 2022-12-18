import React, { memo } from "react";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

import Button from "@/components/Button/Button";
import Typography from "@/components/Typography/Typography";

interface IConfirmationDIalog {
  testId: string;
  isOpen: boolean;
  title: string;
  textContent: string;
  onClose: () => void;
  onAccept: () => void;
  closeText: string;
  acceptText: string;
}

const ConfirmationDialog = ({
  testId,
  isOpen,
  title,
  textContent,
  closeText,
  acceptText,
  onClose,
  onAccept,
}: IConfirmationDIalog) => {
  return (
    <Dialog sx={{ "& .MuiDialog-paper": { width: "80%" } }} maxWidth="xs" open={isOpen} data-testid={testId}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent dividers>
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

export default memo(ConfirmationDialog);
