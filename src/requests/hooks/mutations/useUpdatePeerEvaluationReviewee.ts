import { useMutation } from "@apollo/client";
import {
  PeerEvaluationReviewee,
  PeerEvaluationRevieweeUpdateInput,
  PeerEvaluationRevieweeWhereUniqueInput,
} from "@generated/type-graphql";

import { UPDATE_PEER_EVALUATION_REVIEWEE } from "@/requests/schema/peer-evaluation";
import { errorNotification } from "@/utils";

const useUpdatePeerEvaluationReviewee = (notificationsId: string) => {
  return useMutation<
    {
      updatePeerEvaluationReviewee: PeerEvaluationReviewee;
    },
    { data: PeerEvaluationRevieweeUpdateInput; where: PeerEvaluationRevieweeWhereUniqueInput }
  >(UPDATE_PEER_EVALUATION_REVIEWEE, {
    fetchPolicy: "no-cache",
    onError: (error) => {
      errorNotification(error.message, notificationsId);
    },
  });
};

export default useUpdatePeerEvaluationReviewee;
