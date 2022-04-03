import { TApolloClientType } from "@/graphql/client";
import { PeerEvaluationExistResponse } from "@/pages/api/resolvers/peer-evaluation";
import { PEER_EVALUATION_EXIST } from "@/requests/schema/peer-evaluation";

const peerEvaluationExist = (apolloClient: TApolloClientType, peerEvaluationId: string) => {
  return apolloClient.query<{ peerEvaluationExist: PeerEvaluationExistResponse }>({
    query: PEER_EVALUATION_EXIST,
    errorPolicy: "all",
    fetchPolicy: "no-cache",
    variables: {
      where: {
        code: peerEvaluationId,
      },
    },
  });
};

export default peerEvaluationExist;
