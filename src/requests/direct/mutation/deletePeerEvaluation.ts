import { TApolloClientType } from "@/graphql/client";
import { DELETE_PEER_EVALUATION } from "@/requests/schema/peer-evaluation";

const deletePeerEvaluation = (apolloClient: TApolloClientType, peerEvaluationId: string) => {
  return apolloClient.mutate({
    mutation: DELETE_PEER_EVALUATION,
    variables: {
      where: {
        id: peerEvaluationId,
      },
    },
    errorPolicy: "all",
    fetchPolicy: "no-cache",
  });
};

export default deletePeerEvaluation;
