import { useQuery } from "@apollo/client";
import { PeerEvaluation } from "@generated/type-graphql";

import { GET_PEER_EVALUATIONS_ADMIN } from "@/requests/schema/peer-evaluation";
import { errorNotification, successNotification } from "@/utils";

const useGetPeerEvaluationsAdmin = (notificationsId: string) => {
  return useQuery<{ peerEvaluations: PeerEvaluation[] }>(GET_PEER_EVALUATIONS_ADMIN, {
    fetchPolicy: "no-cache",
    variables: {
      orderBy: [
        {
          createdAt: "asc",
        },
      ],
    },
    onError: (error) => {
      errorNotification(error.message, notificationsId);
    },
    onCompleted: () => {
      successNotification("Peer Evaluations fetched successfully", notificationsId);
    },
  });
};

export default useGetPeerEvaluationsAdmin;
