import { useMutation } from "@apollo/client";
import {
  PeerEvaluationStudentTeam,
  PeerEvaluationStudentTeamUpdateInput,
  PeerEvaluationStudentTeamWhereUniqueInput,
} from "@generated/type-graphql";

import { UPDATE_PEER_EVALUATION_STUDENT_TEAM } from "@/requests/schema/peer-evaluation";
import { errorNotification, successNotification } from "@/utils";

const useUpdatePeerEvaluationStudentTeam = (notificationsId: string) => {
  return useMutation<
    {
      updatePeerEvaluationStudentTeam: PeerEvaluationStudentTeam;
    },
    { data: PeerEvaluationStudentTeamUpdateInput; where: PeerEvaluationStudentTeamWhereUniqueInput }
  >(UPDATE_PEER_EVALUATION_STUDENT_TEAM, {
    fetchPolicy: "no-cache",
    onError: (error) => {
      errorNotification(error.message, notificationsId);
    },
    onCompleted: () => {
      successNotification("Updated successfully", notificationsId);
    },
  });
};

export default useUpdatePeerEvaluationStudentTeam;
