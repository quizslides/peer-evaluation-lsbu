import { useMutation } from "@apollo/client";

import {
  PeerEvaluationStudentTeamCalculateResultsTableResponse,
  PeerEvaluationStudentTeamCalculateResultsTableWhereInput,
} from "@/pages/api/resolvers/lecturer/peer-evaluation-student-team-calculate-results-table";
import { UPDATE_PEER_EVALUATION_STUDENT_TEAM_CALCULATE_RESULTS_TABLE } from "@/requests/schema/peer-evaluation";
import { errorNotification, successNotification } from "@/utils";

const useUpdatePeerEvaluationStudentTeamCalculateResultsTable = (notificationsId: string) => {
  return useMutation<
    {
      peerEvaluationStudentTeamCalculateResultsTable: PeerEvaluationStudentTeamCalculateResultsTableResponse;
    },
    { where: PeerEvaluationStudentTeamCalculateResultsTableWhereInput }
  >(UPDATE_PEER_EVALUATION_STUDENT_TEAM_CALCULATE_RESULTS_TABLE, {
    fetchPolicy: "no-cache",
    onError: (error) => {
      errorNotification(error.message, notificationsId);
    },
    onCompleted: () => {
      successNotification("Student Teams Marks Calculated Successfully", notificationsId);
    },
  });
};

export default useUpdatePeerEvaluationStudentTeamCalculateResultsTable;
