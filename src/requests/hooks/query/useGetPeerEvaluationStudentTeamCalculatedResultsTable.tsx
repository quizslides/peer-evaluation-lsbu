import { useLazyQuery } from "@apollo/client";

import {
  PeerEvaluationStudentTeamCalculatedResultsTableResponse,
  PeerEvaluationStudentTeamCalculatedResultsTableWhereInput,
} from "@/pages/api/resolvers/peer-evaluation-student-team-calculated-results-table";
import { GET_PEER_EVALUATION_STUDENT_TEAM_CALCULATES_RESULTS_TABLE } from "@/requests/schema/peer-evaluation";
import { errorNotification, successNotification } from "@/utils";

const useGetPeerEvaluationStudentTeamCalculatedResultsTable = (notificationsId: string) => {
  return useLazyQuery<
    { peerEvaluationStudentTeamCalculatedResultsTable: PeerEvaluationStudentTeamCalculatedResultsTableResponse },
    { where: PeerEvaluationStudentTeamCalculatedResultsTableWhereInput }
  >(GET_PEER_EVALUATION_STUDENT_TEAM_CALCULATES_RESULTS_TABLE, {
    fetchPolicy: "no-cache",
    onError: (error) => {
      errorNotification(error.message, notificationsId);
    },
    onCompleted: () => {
      successNotification("Peer evaluation Student Team table fetched successfully", notificationsId);
    },
  });
};

export default useGetPeerEvaluationStudentTeamCalculatedResultsTable;
