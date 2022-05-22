import { TApolloClientType } from "@/graphql/client";
import { UPDATE_PEER_EVALUATION_STUDENT } from "@/requests/schema/peer-evaluation";

const updatePeerEvaluationStudent = (
  apolloClient: TApolloClientType,
  peerEvaluationId: string,
  userId: string,
  userName: string,
  studentTeamName: string
) => {
  return apolloClient.mutate({
    mutation: UPDATE_PEER_EVALUATION_STUDENT,
    variables: {
      data: {
        peerEvaluationStudentTeam: {
          connect: {
            name_peerEvaluationId: {
              name: studentTeamName,
              peerEvaluationId,
            },
          },
        },
        user: {
          update: {
            name: {
              set: userName,
            },
          },
        },
      },
      where: {
        userId_peerEvaluationId: {
          userId,
          peerEvaluationId,
        },
      },
    },
    errorPolicy: "all",
    fetchPolicy: "no-cache",
  });
};

export default updatePeerEvaluationStudent;
