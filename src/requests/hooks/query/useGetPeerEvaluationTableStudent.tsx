import { useLazyQuery } from "@apollo/client";

import {
  PeerEvaluationTableStudentResponse,
  PeerEvaluationTableStudentWhereInput,
} from "@/pages/api/resolvers/peer-evaluation-table-student";
import { GET_PEER_EVALUATION_TABLE_STUDENT } from "@/requests/schema/peer-evaluation";
import { errorNotification, successNotification } from "@/utils";

const useGetPeerEvaluationTableStudent = (notificationsId: string) => {
  return useLazyQuery<
    { peerEvaluationTableStudent: PeerEvaluationTableStudentResponse },
    { where: PeerEvaluationTableStudentWhereInput }
  >(GET_PEER_EVALUATION_TABLE_STUDENT, {
    fetchPolicy: "no-cache",
    onError: (error) => {
      errorNotification(error.message, notificationsId);
    },
    onCompleted: (data) => {
      successNotification(data.peerEvaluationTableStudent.message, notificationsId);
    },
  });
};

export default useGetPeerEvaluationTableStudent;
