import React, { memo } from "react";

import { PeerEvaluation } from "@generated/type-graphql";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

interface IPeerEvaluationCard {
  peerEvaluationTitle: string;
  peerEvaluationCode: string;
  peerEvaluationStatus: PeerEvaluation["status"];
}

const PeerEvaluationCardInfo = ({
  peerEvaluationTitle,
  peerEvaluationCode,
  peerEvaluationStatus,
}: IPeerEvaluationCard) => {
  return (
    <Card sx={{ minWidth: 250, maxWidth: 250, marginBottom: "3px" }}>
      <CardContent>
        <Typography sx={{ fontSize: 16 }} color="text.secondary">
          <strong>Title: </strong>
          {peerEvaluationTitle}
        </Typography>

        <Typography sx={{ fontSize: 16 }} color="text.secondary">
          <strong>Code: </strong>
          {peerEvaluationCode}
        </Typography>

        <Typography sx={{ fontSize: 16 }} color="text.secondary">
          <strong>Status: </strong>
          {peerEvaluationStatus}
        </Typography>
      </CardContent>
    </Card>
  );
};

export type { IPeerEvaluationCard };

export default memo(PeerEvaluationCardInfo);
