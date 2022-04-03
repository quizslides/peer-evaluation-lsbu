import { PeerEvaluationUpdateInput } from "@generated/type-graphql";

import { TApolloClientType } from "@/graphql/client";
import { UPDATE_PEER_EVALUATION } from "@/requests/schema/peer-evaluation";

const updatePeerEvaluation = (
  apolloClient: TApolloClientType,
  peerEvaluationData: PeerEvaluationUpdateInput,
  peerEvaluationId: string
) => {
  return apolloClient.mutate({
    mutation: UPDATE_PEER_EVALUATION,
    variables: {
      data: peerEvaluationData,
      where: {
        id: peerEvaluationId,
      },
    },
    errorPolicy: "all",
    fetchPolicy: "no-cache",
  });
};

export default updatePeerEvaluation;
