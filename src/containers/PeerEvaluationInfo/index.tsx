import React from "react";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

import { Typography } from "@/components";
import content from "@/content";
import { CheckIcon, CloseIcon } from "@/icons";

interface IPeerEvaluationInfo {
  isCompleted: boolean;
  studentEmail: string;
  studentName: string;
  submissionDeadline: string;
  teamName: string;
  testId: string;
  updatedAt: string;
}

const PeerEvaluationInfo = ({
  isCompleted,
  studentEmail,
  studentName,
  submissionDeadline,
  teamName,
  testId,
  updatedAt,
}: IPeerEvaluationInfo) => {
  const testIdBase = `${testId}-${content.containers.peerEvaluationInfo.testId}`;

  const contentBaseField = content.containers.peerEvaluationInfo.fields;

  return (
    <Card sx={{ minWidth: 275, width: 275, marginBottom: "1rem" }}>
      <CardContent>
        <Typography
          sx={{ fontSize: 13 }}
          color="text.secondary"
          testId={`${testIdBase}-${contentBaseField.studentEmail.testId}`}
        >
          <strong>{contentBaseField.studentEmail.label}</strong>
          {studentEmail}
        </Typography>
        <Typography
          sx={{ fontSize: 13 }}
          color="text.secondary"
          testId={`${testIdBase}-${contentBaseField.studentName.testId}`}
        >
          <strong>{contentBaseField.studentName.label}</strong>
          {studentName}
        </Typography>
        <Typography
          sx={{ fontSize: 13 }}
          color="text.secondary"
          testId={`${testIdBase}-${contentBaseField.teamName.testId}`}
        >
          <strong>{contentBaseField.teamName.label}</strong>
          {teamName}
        </Typography>
        <Typography
          sx={{ fontSize: 13 }}
          color="text.secondary"
          testId={`${testIdBase}-${contentBaseField.lastUpdated.testId}`}
        >
          <strong>{contentBaseField.lastUpdated.label}</strong>
          {updatedAt}
        </Typography>
        <Typography
          noWrap
          sx={{ fontSize: 13 }}
          color="text.secondary"
          testId={`${testIdBase}-${contentBaseField.submissionDeadline.testId}`}
        >
          <strong>{contentBaseField.submissionDeadline.label}</strong>
          {submissionDeadline}
        </Typography>
        <Typography
          sx={{ fontSize: 13 }}
          color="text.secondary"
          testId={`${testIdBase}-${contentBaseField.completed.testId}`}
        >
          <strong>{contentBaseField.completed.label}</strong>
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
