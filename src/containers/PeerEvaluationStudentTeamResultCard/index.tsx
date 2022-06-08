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
    <Card sx={{ minWidth: 275, width: 275, marginBottom: "3px" }}>
      <CardContent>
        <Typography fontSize={14}>{`Team Name: ${teamName}`}</Typography>
        <Typography fontSize={14}>{`Mark: ${mark || "Not available"}`}</Typography>
        <Typography fontSize={14}>{`Last Updated: ${updatedAt || "Not available"}`}</Typography>
      </CardContent>
    </Card>
  );
};

export default memo(PeerEvaluationStudentTeamResultCard);
