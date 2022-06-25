import { TApolloClientType } from "@/graphql/client";
import { DELETE_PEER_EVALUATION_STUDENT_TEAM } from "@/requests/schema/peer-evaluation";

const deletePeerEvaluationStudentTeam = (apolloClient: TApolloClientType, peerEvaluationStudentTeamId: string) => {
  return apolloClient.mutate({
    mutation: DELETE_PEER_EVALUATION_STUDENT_TEAM,
    variables: {
      where: {
        id: peerEvaluationStudentTeamId,
      },
    },
    errorPolicy: "all",
    fetchPolicy: "no-cache",
  });
};

export default deletePeerEvaluationStudentTeam;
