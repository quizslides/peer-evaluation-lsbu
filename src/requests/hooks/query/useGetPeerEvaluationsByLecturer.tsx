import { useLazyQuery } from "@apollo/client";
import { PeerEvaluation } from "@generated/type-graphql";

import { PeerEvaluationsByLecturerWhereInput } from "@/pages/api/resolvers/lecturer/peer-evaluation";
import { GET_PEER_EVALUATIONS_BY_LECTURER } from "@/requests/schema/peer-evaluation";
import { errorNotification, successNotification } from "@/utils";

const useGetPeerEvaluationsByLecturer = (notificationsId: string) => {
  return useLazyQuery<{ peerEvaluationsByLecturer: PeerEvaluation[] }, { where: PeerEvaluationsByLecturerWhereInput }>(
    GET_PEER_EVALUATIONS_BY_LECTURER,
    {
      fetchPolicy: "no-cache",
      onError: (error) => {
        errorNotification(error.message, notificationsId);
      },
      onCompleted: () => {
        successNotification("Peer Evaluations fetched successfully", notificationsId);
      },
    }
  );
};

export default useGetPeerEvaluationsByLecturer;
