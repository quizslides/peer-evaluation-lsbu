import { TApolloClientType } from "@/graphql/client";
import { PeerEvaluationCreateStudentBulk } from "@/pages/api/resolvers/lecturer/peer-evaluation-create-student-bulk";
import { CREATE_PEER_EVALUATION_STUDENT_BULK } from "@/requests/schema/peer-evaluation";

const createPeerEvaluationStudentBulk = (
  apolloClient: TApolloClientType,
  createStudentBulkData: PeerEvaluationCreateStudentBulk[],
  peerEvaluationId: string
) => {
  return apolloClient.mutate({
    mutation: CREATE_PEER_EVALUATION_STUDENT_BULK,
    variables: {
      data: {
        peerEvaluationId: peerEvaluationId,
        createStudentBulkData: createStudentBulkData,
      },
    },
    errorPolicy: "all",
    fetchPolicy: "no-cache",
  });
};

export default createPeerEvaluationStudentBulk;
