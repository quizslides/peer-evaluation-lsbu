import { useLazyQuery } from "@apollo/client";
import { PeerEvaluationTeachingMember, PeerEvaluationTeachingMemberWhereUniqueInput } from "@generated/type-graphql";

import { GET_PEER_EVALUATION_TEACHING_MEMBER_USER_ROLE } from "@/requests/schema/peer-evaluation";
import { errorNotification, successNotification } from "@/utils";

const useGetUserPeerEvaluationTeachingMember = (notificationsId: string) => {
  return useLazyQuery<
    { peerEvaluationTeachingMember: PeerEvaluationTeachingMember },
    { where: PeerEvaluationTeachingMemberWhereUniqueInput }
  >(GET_PEER_EVALUATION_TEACHING_MEMBER_USER_ROLE, {
    fetchPolicy: "no-cache",
    onError: (error) => {
      errorNotification(error.message, notificationsId);
    },
    onCompleted: () => {
      successNotification("Peer Evaluations fetched successfully", notificationsId);
    },
  });
};

export default useGetUserPeerEvaluationTeachingMember;
