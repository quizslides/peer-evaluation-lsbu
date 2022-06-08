import React from "react";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

interface IPeerEvaluationInfo {
  updatedAt: string;
  studentEmail: string;
  studentName: string;
  teamName: string;
  submissionDeadline: string;
}

const PeerEvaluationInfo = ({
  updatedAt,
  studentEmail,
  studentName,
  teamName,
  submissionDeadline,
}: IPeerEvaluationInfo) => {
  return (
    <Card sx={{ minWidth: 275, width: 275, marginBottom: "1rem" }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary">
          <strong>Student Email: </strong>
          {studentEmail}
        </Typography>
        <Typography sx={{ fontSize: 14 }} color="text.secondary">
          <strong>Student Name: </strong>
          {studentName}
        </Typography>
        <Typography sx={{ fontSize: 14 }} color="text.secondary">
          <strong>Team Name: </strong>
          {teamName}
        </Typography>
        <Typography sx={{ fontSize: 14 }} color="text.secondary">
          <strong>Last Updated: </strong>
          {updatedAt}
        </Typography>
        <Typography sx={{ fontSize: 14 }} color="text.secondary">
          <strong>Submission Deadline: </strong>
          {submissionDeadline}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default PeerEvaluationInfo;
