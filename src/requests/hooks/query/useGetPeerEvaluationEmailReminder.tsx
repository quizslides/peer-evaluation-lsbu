import { useLazyQuery } from "@apollo/client";
import {
  Email,
  EmailWhereUniqueInput,
  PeerEvaluationTeachingMember,
  PeerEvaluationTeachingMemberWhereUniqueInput,
} from "@generated/type-graphql";

import { GET_PEER_EVALUATION_EMAIL_REMINDER } from "@/requests/schema/peer-evaluation";
import { errorNotification, successNotification } from "@/utils";

const useGetPeerEvaluationEmailReminder = (notificationsId: string) => {
  return useLazyQuery<
    { email: Email; peerEvaluationTeachingMember: PeerEvaluationTeachingMember },
    { whereEmail: EmailWhereUniqueInput; whereTeachingMemberRole: PeerEvaluationTeachingMemberWhereUniqueInput }
  >(GET_PEER_EVALUATION_EMAIL_REMINDER, {
    fetchPolicy: "no-cache",
    onError: (error) => {
      errorNotification(error.message, notificationsId);
    },
    onCompleted: () => {
      successNotification("Email reminder fetched successfully", notificationsId);
    },
  });
};

export default useGetPeerEvaluationEmailReminder;
