import React, { memo, useEffect, useState } from "react";

import { PeerEvaluation } from "@generated/type-graphql";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

interface IPeerEvaluationCard {
  status: PeerEvaluation["status"];
}

const PeerEvaluationCard = ({ status }: IPeerEvaluationCard) => {
  const title = "JCBD Pel";

  const code = "JCBD_01";

  const meaning = "Test meaning";

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
      {/* <CardActions>
        <Button size="small">View</Button>
        <Button size="small">Share</Button>
      </CardActions> */}
    </Card>
  );
};

export default memo(PeerEvaluationCard);
