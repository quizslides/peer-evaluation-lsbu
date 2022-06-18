import { useLazyQuery } from "@apollo/client";
import { PeerEvaluationRevieweeOrderByWithRelationInput } from "@generated/type-graphql";

import {
  PeerEvaluationTableStudentResponse,
  PeerEvaluationTableStudentWhereInput,
} from "@/pages/api/resolvers/student/peer-evaluation-table-student-query";
import { GET_PEER_EVALUATION_TABLE_STUDENT } from "@/requests/schema/peer-evaluation";
import { errorNotification, successNotification } from "@/utils";

const useGetPeerEvaluationTableStudent = (notificationsId: string) => {
  return useLazyQuery<
    { peerEvaluationTableStudent: PeerEvaluationTableStudentResponse },
    { where: PeerEvaluationTableStudentWhereInput; orderBy: [PeerEvaluationRevieweeOrderByWithRelationInput] }
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
