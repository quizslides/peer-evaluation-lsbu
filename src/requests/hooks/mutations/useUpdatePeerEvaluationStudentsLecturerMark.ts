import { useMutation } from "@apollo/client";

import {
  PeerEvaluationStudentsLecturerMarkInputData,
  PeerEvaluationStudentsLecturerMarkResponse,
} from "@/pages/api/resolvers/peer-evaluation-student-lecturer-mark";
import { UPDATE_PEER_EVALUATION_STUDENTS_LECTURER_MARK } from "@/requests/schema/peer-evaluation";
import { errorNotification, successNotification } from "@/utils";

const useUpdatePeerEvaluationStudentsLecturerMark = (notificationsId: string) => {
  return useMutation<
    {
      updatePeerEvaluationStudentsLecturerMark: PeerEvaluationStudentsLecturerMarkResponse;
    },
    { where: PeerEvaluationStudentsLecturerMarkInputData }
  >(UPDATE_PEER_EVALUATION_STUDENTS_LECTURER_MARK, {
    fetchPolicy: "no-cache",
    onError: (error) => {
      errorNotification(error.message, notificationsId);
    },
    onCompleted: () => {
      successNotification("Lecturer Adjusted Marks updated successfully", notificationsId);
    },
  });
};

export default useUpdatePeerEvaluationStudentsLecturerMark;
