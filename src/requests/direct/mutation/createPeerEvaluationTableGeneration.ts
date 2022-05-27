import { TApolloClientType } from "@/graphql/client";
import { CREATE_PEER_EVALUATION_TABLE_GENERATION } from "@/requests/schema/peer-evaluation";

const createPeerEvaluationTableGeneration = (apolloClient: TApolloClientType, peerEvaluationId: string) => {
  return apolloClient.mutate({
    mutation: CREATE_PEER_EVALUATION_TABLE_GENERATION,
    variables: {
      where: {
        peerEvaluationId: peerEvaluationId,
      },
    },
    errorPolicy: "all",
    fetchPolicy: "no-cache",
  });
};

export default createPeerEvaluationTableGeneration;
