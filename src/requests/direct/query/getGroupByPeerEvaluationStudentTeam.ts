import { PeerEvaluationStudentTeamGroupBy } from "@generated/type-graphql";

import { TApolloClientType } from "@/graphql/client";
import { GET_PEER_EVALUATION_STUDENT_TEAMS } from "@/requests/schema/peer-evaluation";

const getGroupByPeerEvaluationStudentTeam = (
  apolloClient: TApolloClientType,
  peerEvaluationId: string,
  teamNames: string[]
) => {
  return apolloClient.query<{ groupByPeerEvaluationStudentTeam: [PeerEvaluationStudentTeamGroupBy] }>({
    query: GET_PEER_EVALUATION_STUDENT_TEAMS,
    errorPolicy: "all",
    fetchPolicy: "no-cache",
    variables: {
      by: ["id", "name", "peerEvaluationId"],
      orderBy: [
        {
          name: "asc",
        },
      ],
      where: {
        peerEvaluationId: {
          equals: peerEvaluationId,
        },
        name: {
          in: teamNames,
        },
      },
    },
  });
};

export default getGroupByPeerEvaluationStudentTeam;
