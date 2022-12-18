import { useLazyQuery } from "@apollo/client";
import {
  PeerEvaluation,
  PeerEvaluationColumnOrderByWithRelationInput,
  PeerEvaluationWhereUniqueInput,
} from "@generated/type-graphql";

import { GET_PEER_EVALUATION } from "@/requests/schema/peer-evaluation";
import { errorNotification, successNotification } from "@/utils";

const useGetPeerEvaluation = (notificationsId: string) => {
  return useLazyQuery<
    { peerEvaluation: PeerEvaluation },
    { where: PeerEvaluationWhereUniqueInput; orderBy: [PeerEvaluationColumnOrderByWithRelationInput] }
  >(GET_PEER_EVALUATION, {
    fetchPolicy: "no-cache",
    onError: (error) => {
      errorNotification(error.message, notificationsId);
    },
    onCompleted: () => {
      successNotification("Peer evaluation fetched successfully", notificationsId);
    },
  });
};

export default useGetPeerEvaluation;
