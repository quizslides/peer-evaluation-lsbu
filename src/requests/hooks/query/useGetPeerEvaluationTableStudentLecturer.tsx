import { useLazyQuery } from "@apollo/client";

import {
  PeerEvaluationTableStudentLecturerResponse,
  PeerEvaluationTableStudentLecturerWhereInput,
} from "@/pages/api/resolvers/lecturer/peer-evaluation-table-student-lecturer-query";
import { GET_PEER_EVALUATION_TABLE_STUDENT_LECTURER } from "@/requests/schema/peer-evaluation";
import { errorNotification, successNotification } from "@/utils";

const useGetPeerEvaluationTableStudent = (notificationsId: string) => {
  return useLazyQuery<
    { peerEvaluationTableStudentLecturer: PeerEvaluationTableStudentLecturerResponse },
    { where: PeerEvaluationTableStudentLecturerWhereInput }
  >(GET_PEER_EVALUATION_TABLE_STUDENT_LECTURER, {
    fetchPolicy: "no-cache",
    onError: (error) => {
      errorNotification(error.message, notificationsId);
    },
    onCompleted: (data) => {
      successNotification(data.peerEvaluationTableStudentLecturer.message, notificationsId);
    },
  });
};

export default useGetPeerEvaluationTableStudent;
