import { useLazyQuery } from "@apollo/client";

import {
  PeerEvaluationDashboard,
  PeerEvaluationDashboardWhereInput,
} from "@/pages/api/resolvers/lecturer/peer-evaluation";
import { PEER_EVALUATION_DASHBOARD } from "@/requests/schema/peer-evaluation";
import { errorNotification, successNotification } from "@/utils";

const useGetPeerEvaluationDashboard = (notificationsId: string) => {
  return useLazyQuery<
    { peerEvaluationDashboard: PeerEvaluationDashboard },
    { where: PeerEvaluationDashboardWhereInput }
  >(PEER_EVALUATION_DASHBOARD, {
    fetchPolicy: "no-cache",
    onError: (error) => {
      errorNotification(error.message, notificationsId);
    },
    onCompleted: () => {
      successNotification("Peer evaluation fetched successfully", notificationsId);
    },
  });
};

export default useGetPeerEvaluationDashboard;
