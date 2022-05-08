import React, { memo, useState } from "react";

import styled from "@emotion/styled";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";

import {
  Base,
  // Button,
  ConfirmationDialog,
  DataTable,
  DataTableAddActionButtonIcon,
  DataTableRefreshActionButtonIcon,
  IconButtonWrapper,
  PageTitle,
  // Typography,
} from "@/components";
import { PeerEvaluationStatus, PeerEvaluationStatusDefinition } from "@/types/peer-evaluation";

interface IPeerEvaluationStatus {
  status: PeerEvaluationStatus;
}

const PeerEvaluationStatusContainer = ({ status }: IPeerEvaluationStatus) => {
  return (
    <Tooltip title={PeerEvaluationStatusDefinition[status]}>
      <Button
        style={{
          minWidth: 0,
          padding: 0,
        }}
        disableRipple={true}
      >
        {status}
      </Button>
    </Tooltip>
  );
};

export default memo(PeerEvaluationStatusContainer);
