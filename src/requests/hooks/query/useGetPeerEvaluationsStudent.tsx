import { useQuery } from "@apollo/client";

import { PeerEvaluationsStudentResponse } from "@/pages/api/resolvers/student/peer-evaluations-query";
import { GET_PEER_EVALUATIONS_STUDENT } from "@/requests/schema/peer-evaluation";
import { errorNotification, successNotification } from "@/utils";

const useGetPeerEvaluationsStudent = () => {
  return useQuery<{ peerEvaluationsStudent: PeerEvaluationsStudentResponse }>(GET_PEER_EVALUATIONS_STUDENT, {
    fetchPolicy: "no-cache",
    onError: (error) => {
      errorNotification(error.message);
    },
    onCompleted: () => {
      successNotification("Peer Evaluations fetched successfully");
    },
  });
};

export default useGetPeerEvaluationsStudent;
