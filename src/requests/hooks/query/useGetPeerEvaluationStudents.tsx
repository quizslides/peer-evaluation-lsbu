import { useLazyQuery } from "@apollo/client";
import {
  PeerEvaluationStudent,
  PeerEvaluationStudentOrderByWithRelationInput,
  PeerEvaluationStudentWhereInput,
} from "@generated/type-graphql";

import { PEER_EVALUATION_STUDENTS } from "@/requests/schema/peer-evaluation";
import { errorNotification, successNotification } from "@/utils";

const useGetPeerEvaluationStudents = (notificationsId: string) => {
  return useLazyQuery<
    { peerEvaluationStudents: [PeerEvaluationStudent] },
    { where: PeerEvaluationStudentWhereInput; orderBy: [PeerEvaluationStudentOrderByWithRelationInput] }
  >(PEER_EVALUATION_STUDENTS, {
    fetchPolicy: "no-cache",
    onError: (error) => {
      errorNotification(error.message, notificationsId);
    },
    onCompleted: () => {
      successNotification("Students fetched successfully", notificationsId);
    },
  });
};

export default useGetPeerEvaluationStudents;
