import { PeerEvaluation } from "@generated/type-graphql";

import { TApolloClientType } from "@/graphql/client";
import { GET_PEER_EVALUATION_STATUS } from "@/requests/schema/peer-evaluation";

const getPeerEvaluationStatus = (apolloClient: TApolloClientType, peerEvaluationId: string) => {
  return apolloClient.query<{ peerEvaluation: PeerEvaluation }>({
    query: GET_PEER_EVALUATION_STATUS,
    errorPolicy: "all",
    fetchPolicy: "no-cache",
    variables: {
      where: {
        id: peerEvaluationId,
      },
    },
  });
};

export default getPeerEvaluationStatus;
