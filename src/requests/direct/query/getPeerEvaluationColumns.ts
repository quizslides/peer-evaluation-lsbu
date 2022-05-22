import { PeerEvaluation } from "@generated/type-graphql";

import { TApolloClientType } from "@/graphql/client";
import { GET_PEER_EVALUATION_COLUMNS } from "@/requests/schema/peer-evaluation";

const getPeerEvaluationColumns = (apolloClient: TApolloClientType, peerEvaluationId: string) => {
  return apolloClient.query<{ peerEvaluation: PeerEvaluation }>({
    query: GET_PEER_EVALUATION_COLUMNS,
    errorPolicy: "all",
    fetchPolicy: "no-cache",
    variables: {
      where: {
        id: peerEvaluationId,
      },
    },
  });
};

export default getPeerEvaluationColumns;
