import React, { memo } from "react";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

interface PeerEvaluationStudentTeamResultCard {
  teamName: string;
  mark: number | undefined;
  updatedAt: string | undefined;
}

const PeerEvaluationStudentTeamResultCard = ({ teamName, mark, updatedAt }: PeerEvaluationStudentTeamResultCard) => {
  return (
    <Card sx={{ minWidth: 275, width: 275, marginBottom: "3px" }}>
      <CardContent>
        <Typography>{`Team Name: ${teamName}`}</Typography>
        <Typography>{`Mark: ${mark || "Not available"}`}</Typography>
        <Typography>{`Last Updated: ${updatedAt || "Not available"}`}</Typography>
      </CardContent>
    </Card>
  );
};

export default memo(PeerEvaluationStudentTeamResultCard);
