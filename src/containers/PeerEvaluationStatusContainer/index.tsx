import React, { memo } from "react";

import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";

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
