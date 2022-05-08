import { TApolloClientType } from "@/graphql/client";
import { UPDATE_PEER_EVALUATION_EMAIL } from "@/requests/schema/peer-evaluation";

const updatePeerEvaluationEmail = (
  apolloClient: TApolloClientType,
  emailSubject: string,
  emailBody: string,
  peerEvaluationId: string
) => {
  return apolloClient.mutate({
    mutation: UPDATE_PEER_EVALUATION_EMAIL,
    variables: {
      data: {
        subject: {
          set: emailSubject,
        },
        body: {
          set: emailBody,
        },
      },
      where: {
        peerEvaluationId,
      },
    },
    errorPolicy: "all",
    fetchPolicy: "no-cache",
  });
};

export default updatePeerEvaluationEmail;
