import React, { useEffect } from "react";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { useSession } from "next-auth/react";

import useGetSessionUser from "@/requests/hooks/query/useGetSessionUser";

interface IPeerEvaluationInfo {
  teamName: string;
  submissionDeadline: DateTime | null;
}

const PeerEvaluationInfo = ({ teamName, submissionDeadline }: IPeerEvaluationInfo) => {
  const { data: session } = useSession();

  const [getSessionUser, { loading: loadingFetch, error, data: user }] = useGetSessionUser("GetSessionUser");

  useEffect(() => {
    if (session) {
      getSessionUser({
        variables: {
          where: {
            id: session?.user.id,
          },
        },
      });
    }
  }, [getSessionUser, session]);

  return (
    <Card sx={{ minWidth: 275, marginBottom: "1rem" }}>
      <CardContent>
        <Typography sx={{ fontSize: 18 }} color="text.secondary" gutterBottom>
          <strong>Date Updated: </strong>
          {user?.user.updatedAt}
        </Typography>
        <Typography sx={{ fontSize: 18 }} color="text.secondary" gutterBottom>
          <strong>Student Email: </strong>
          {user?.user.email}
        </Typography>
        <Typography sx={{ fontSize: 18 }} color="text.secondary" gutterBottom>
          <strong>Student Name: </strong>
          {user?.user.name}
        </Typography>
        <Typography sx={{ fontSize: 18 }} color="text.secondary" gutterBottom>
          <strong>Team Name: </strong>
          {teamName}
        </Typography>
        <Typography sx={{ fontSize: 18 }} color="text.secondary" gutterBottom>
          <strong>Submission Deadline: </strong>
          {submissionDeadline}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default PeerEvaluationInfo;
