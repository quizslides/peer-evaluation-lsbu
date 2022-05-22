import { PeerEvaluationStudentCreateInput } from "@generated/type-graphql";

import { TApolloClientType } from "@/graphql/client";
import { CREATE_PEER_EVALUATION_STUDENT } from "@/requests/schema/peer-evaluation";

const createPeerEvaluationStudent = (
  apolloClient: TApolloClientType,
  studentData: PeerEvaluationStudentCreateInput
) => {
  return apolloClient.mutate({
    mutation: CREATE_PEER_EVALUATION_STUDENT,
    variables: { data: studentData, skipDuplicates: true },
    errorPolicy: "all",
    fetchPolicy: "no-cache",
  });
};

export default createPeerEvaluationStudent;
