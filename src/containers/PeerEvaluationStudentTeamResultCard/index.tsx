import React, { memo } from "react";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

interface IPeerEvaluationStudentTeamResultCard {
  teamName: string;
  mark: number | undefined;
  updatedAt: string | undefined;
}

const PeerEvaluationStudentTeamResultCard = ({ teamName, mark, updatedAt }: IPeerEvaluationStudentTeamResultCard) => {
  return (
    <Card sx={{ minWidth: 275, maxWidth: 450, marginBottom: "3px" }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary">
          <strong>Team Name: </strong>
          {teamName}
        </Typography>

        <Typography sx={{ fontSize: 14 }} color="text.secondary">
          <strong>Mark: </strong>
          {mark || "Not available"}
        </Typography>

        <Typography sx={{ fontSize: 14 }} color="text.secondary">
          <strong>Date Team Mark Last Calculated: </strong>
          {updatedAt || "Not available"}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default memo(PeerEvaluationStudentTeamResultCard);
