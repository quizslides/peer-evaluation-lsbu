import { PeerEvaluationStudentTeam } from "@generated/type-graphql";

import { TApolloClientType } from "@/graphql/client";
import { PEER_EVALUATION_STUDENT_TEAM_EXIST } from "@/requests/schema/peer-evaluation";

const peerEvaluationStudentTeamExist = (
  apolloClient: TApolloClientType,
  peerEvaluationId: string,
  teamName: string
) => {
  return apolloClient.query<{ findFirstPeerEvaluationStudentTeam: PeerEvaluationStudentTeam }>({
    query: PEER_EVALUATION_STUDENT_TEAM_EXIST,
    errorPolicy: "all",
    fetchPolicy: "no-cache",
    variables: {
      where: {
        name: {
          equals: teamName,
        },
        peerEvaluationId: {
          equals: peerEvaluationId,
        },
      },
      orderBy: [
        {
          createdAt: "asc",
        },
      ],
    },
  });
};

export default peerEvaluationStudentTeamExist;
