import { useMutation } from "@apollo/client";

import {
  PeerEvaluationStudentTeamCalculateResultsTableByTeamResponse,
  PeerEvaluationStudentTeamCalculateResultsTableByTeamWhereInput,
} from "@/pages/api/resolvers/peer-evaluation-student-team-calculate-results-table-by-team";
import { UPDATE_PEER_EVALUATION_STUDENT_TEAM_CALCULATE_RESULTS_TABLE_BY_TEAM } from "@/requests/schema/peer-evaluation";
import { errorNotification, successNotification } from "@/utils";

const useUpdatePeerEvaluationStudentTeamCalculateResultsTableByTeam = (notificationsId: string) => {
  return useMutation<
    {
      peerEvaluationStudentTeamCalculateResultsTableByTeam: PeerEvaluationStudentTeamCalculateResultsTableByTeamResponse;
    },
    { where: PeerEvaluationStudentTeamCalculateResultsTableByTeamWhereInput }
  >(UPDATE_PEER_EVALUATION_STUDENT_TEAM_CALCULATE_RESULTS_TABLE_BY_TEAM, {
    fetchPolicy: "no-cache",
    onError: (error) => {
      errorNotification(error.message, notificationsId);
    },
    onCompleted: () => {
      successNotification("Student Team Marks Calculated Successfully", notificationsId);
    },
  });
};

export default useUpdatePeerEvaluationStudentTeamCalculateResultsTableByTeam;
