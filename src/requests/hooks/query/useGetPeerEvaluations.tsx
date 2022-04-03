import { useQuery } from "@apollo/client";
import { PeerEvaluation } from "@generated/type-graphql";

import { GET_PEER_EVALUATIONS } from "@/requests/schema/peer-evaluation";
import { errorNotification } from "@/utils";

const useGetPeerEvaluations = () => {
  return useQuery<{ peerEvaluations: PeerEvaluation[] }>(GET_PEER_EVALUATIONS, {
    fetchPolicy: "no-cache",
    onError: (error) => {
      errorNotification(error.message);
    },
  });
};

export default useGetPeerEvaluations;
