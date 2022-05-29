import { TApolloClientType } from "@/graphql/client";
import { UPSERT_PEER_EVALUATION_TABLE_LECTURER } from "@/requests/schema/peer-evaluation";

const upsertPeerEvaluationTableLecturer = (apolloClient: TApolloClientType, peerEvaluationId: string) => {
  return apolloClient.mutate({
    mutation: UPSERT_PEER_EVALUATION_TABLE_LECTURER,
    variables: {
      where: {
        peerEvaluationId: peerEvaluationId,
      },
    },
    errorPolicy: "all",
    fetchPolicy: "no-cache",
  });
};

export default upsertPeerEvaluationTableLecturer;
