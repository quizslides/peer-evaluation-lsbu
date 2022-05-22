import { PeerEvaluationTeachingMember } from "@generated/type-graphql";

import { TApolloClientType } from "@/graphql/client";
import { GET_PEER_EVALUATION_TEACHING_MEMBER_USER_ROLE } from "@/requests/schema/peer-evaluation";

const getPeerEvaluationTeachingMemberRole = (
  apolloClient: TApolloClientType,
  userId: string,
  peerEvaluationId: string
) => {
  return apolloClient.query<{ peerEvaluationTeachingMember: PeerEvaluationTeachingMember }>({
    query: GET_PEER_EVALUATION_TEACHING_MEMBER_USER_ROLE,
    errorPolicy: "all",
    fetchPolicy: "no-cache",
    variables: {
      where: {
        userId_peerEvaluationId: {
          peerEvaluationId,
          userId,
        },
      },
    },
  });
};

export default getPeerEvaluationTeachingMemberRole;
