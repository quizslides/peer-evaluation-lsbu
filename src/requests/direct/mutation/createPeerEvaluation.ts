import { PeerEvaluationCreateInput } from "@generated/type-graphql";

import { TApolloClientType } from "@/graphql/client";
import { CREATE_PEER_EVALUATION } from "@/requests/schema/peer-evaluation";

const createPeerEvaluation = (apolloClient: TApolloClientType, peerEvaluationData: PeerEvaluationCreateInput) => {
  return apolloClient.mutate({
    mutation: CREATE_PEER_EVALUATION,
    variables: { data: peerEvaluationData },
    errorPolicy: "all",
    fetchPolicy: "no-cache",
  });
};

export default createPeerEvaluation;
