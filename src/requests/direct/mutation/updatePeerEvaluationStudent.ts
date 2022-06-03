import { TApolloClientType } from "@/graphql/client";
import { UPDATE_PEER_EVALUATION_STUDENT } from "@/requests/schema/peer-evaluation";

const updatePeerEvaluationStudent = (
  apolloClient: TApolloClientType,
  peerEvaluationId: string,
  userId: string,
  studentName: string,
  studentTeamName: string
) => {
  return apolloClient.mutate({
    mutation: UPDATE_PEER_EVALUATION_STUDENT,
    variables: {
      data: {
        studentName: {
          set: studentName,
        },
        peerEvaluationStudentTeam: {
          connect: {
            name_peerEvaluationId: {
              name: studentTeamName,
              peerEvaluationId,
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
