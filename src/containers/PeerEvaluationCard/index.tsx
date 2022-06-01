import React, { memo } from "react";

import { PeerEvaluation } from "@generated/type-graphql";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

interface IPeerEvaluationCard {
  status: PeerEvaluation["status"];
}

const PeerEvaluationCard = ({ status }: IPeerEvaluationCard) => {
  const title = "JCBD Pel";

  const code = "JCBD_01";

  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Peer Evaluation
        </Typography>
        <Typography variant="h5" component="div">
          {title}
        </Typography>
        <Typography color="text.secondary">
          code: {code}
          <br />
          status: {status}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default memo(PeerEvaluationCard);
