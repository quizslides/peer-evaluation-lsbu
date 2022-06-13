import { PeerEvaluation } from "@generated/type-graphql";

import { TApolloClientType } from "@/graphql/client";
import { GET_PEER_EVALUATION_INFO } from "@/requests/schema/peer-evaluation";

const getPeerEvaluationInfo = (apolloClient: TApolloClientType, peerEvaluationId: string) => {
  return apolloClient.query<{ peerEvaluation: PeerEvaluation }>({
    query: GET_PEER_EVALUATION_INFO,
    errorPolicy: "all",
    fetchPolicy: "no-cache",
    variables: {
      where: {
        id: peerEvaluationId,
      },
    },
  });
};

export default getPeerEvaluationInfo;
