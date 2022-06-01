import { useLazyQuery } from "@apollo/client";
import { PeerEvaluationStudentTeam, PeerEvaluationStudentTeamWhereInput } from "@generated/type-graphql";

import { GET_PEER_EVALUATION_STUDENT_TEAMS } from "@/requests/schema/peer-evaluation";
import { errorNotification, successNotification } from "@/utils";

const useGetPeerEvaluationStudentTeams = (notificationsId: string) => {
  return useLazyQuery<
    { peerEvaluationStudentTeams: [PeerEvaluationStudentTeam] },
    { where: PeerEvaluationStudentTeamWhereInput }
  >(GET_PEER_EVALUATION_STUDENT_TEAMS, {
    fetchPolicy: "no-cache",
    onError: (error) => {
      errorNotification(error.message, notificationsId);
    },
    onCompleted: () => {
      successNotification("Peer evaluation student teams fetched successfully", notificationsId);
    },
  });
};

export default useGetPeerEvaluationStudentTeams;
