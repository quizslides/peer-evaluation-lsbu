import { PeerEvaluationStudentTeamCreateManyInput } from "@generated/type-graphql";

import { TApolloClientType } from "@/graphql/client";
import { UPSERT_PEER_EVALUATION_TABLE_LECTURER } from "@/requests/schema/peer-evaluation";

const upsertPeerEvaluationTableLecturer = (
  apolloClient: TApolloClientType,
  studentTeamsData: [PeerEvaluationStudentTeamCreateManyInput]
) => {
  return apolloClient.mutate({
    mutation: UPSERT_PEER_EVALUATION_TABLE_LECTURER,
    variables: { data: studentTeamsData, skipDuplicates: true },
    errorPolicy: "all",
    fetchPolicy: "no-cache",
  });
};

export default upsertPeerEvaluationTableLecturer;
