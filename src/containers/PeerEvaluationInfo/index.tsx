import React from "react";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

import { CheckIcon, CloseIcon } from "@/icons";

interface IPeerEvaluationInfo {
  updatedAt: string;
  studentEmail: string;
  studentName: string;
  teamName: string;
  submissionDeadline: string;
  isCompleted: boolean;
  testId: string;
}

const PeerEvaluationInfo = ({
  updatedAt,
  studentEmail,
  studentName,
  teamName,
  submissionDeadline,
  isCompleted,
  testId,
}: IPeerEvaluationInfo) => {
  return (
    <Card sx={{ minWidth: 275, width: 275, marginBottom: "1rem" }}>
      <CardContent>
        <Typography sx={{ fontSize: 13 }} color="text.secondary">
          <strong>Student Email: </strong>
          {studentEmail}
        </Typography>
        <Typography sx={{ fontSize: 13 }} color="text.secondary">
          <strong>Student Name: </strong>
          {studentName}
        </Typography>
        <Typography sx={{ fontSize: 13 }} color="text.secondary">
          <strong>Team Name: </strong>
          {teamName}
        </Typography>
        <Typography sx={{ fontSize: 13 }} color="text.secondary">
          <strong>Last Updated: </strong>
          {updatedAt}
        </Typography>
        <Typography noWrap sx={{ fontSize: 13 }} color="text.secondary">
          <strong>Submission Deadline: </strong>
          {submissionDeadline}
        </Typography>
        <Typography sx={{ fontSize: 13 }} color="text.secondary">
          <strong>Completed: </strong>
          {isCompleted ? (
            <CheckIcon
              style={{
                verticalAlign: "middle",
              }}
              fontSize="inherit"
              testId={testId}
            />
          ) : (
            <CloseIcon
              style={{
                verticalAlign: "middle",
              }}
              fontSize="inherit"
              testId={testId}
            />
          )}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default PeerEvaluationInfo;
