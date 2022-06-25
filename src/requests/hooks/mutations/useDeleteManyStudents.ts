import { useMutation } from "@apollo/client";
import { AffectedRowsOutput, PeerEvaluationStudentWhereInput } from "@generated/type-graphql";

import { DELETE_MANY_PEER_EVALUATION_STUDENTS } from "@/requests/schema/peer-evaluation";
import { errorNotification, successNotification } from "@/utils";

const useDeleteManyStudents = (notificationsId: string) => {
  return useMutation<
    {
      deleteManyPeerEvaluationStudent: AffectedRowsOutput;
    },
    { where: PeerEvaluationStudentWhereInput }
  >(DELETE_MANY_PEER_EVALUATION_STUDENTS, {
    fetchPolicy: "no-cache",
    onError: (error) => {
      errorNotification(error.message, notificationsId);
    },
    onCompleted: () => {
      successNotification("Students deleted successfully", notificationsId);
    },
  });
};

export default useDeleteManyStudents;
