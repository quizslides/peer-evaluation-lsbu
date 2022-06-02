import { TApolloClientType } from "@/graphql/client";
import { DELETE_PEER_EVALUATION_STUDENT_TEAM } from "@/requests/schema/peer-evaluation";

const deletePeerEvaluationStudentTeam = (
  apolloClient: TApolloClientType,
  peerEvaluationId: string,
  teamName: string
) => {
  return apolloClient.mutate({
    mutation: DELETE_PEER_EVALUATION_STUDENT_TEAM,
    variables: {
      where: {
        name_peerEvaluationId: {
          name: teamName,
          peerEvaluationId,
        },
      },
    },
    errorPolicy: "all",
    fetchPolicy: "no-cache",
  });
};

export default deletePeerEvaluationStudentTeam;
