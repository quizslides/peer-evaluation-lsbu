import { PeerEvaluationStudentTeamCreateManyInput } from "@generated/type-graphql";

import { TApolloClientType } from "@/graphql/client";
import { CREATE_MANY_PEER_EVALUATION_STUDENT_TEAMS } from "@/requests/schema/peer-evaluation";

const createManyPeerEvaluationStudentTeams = (
  apolloClient: TApolloClientType,
  studentTeamsData: PeerEvaluationStudentTeamCreateManyInput[]
) => {
  return apolloClient.mutate({
    mutation: CREATE_MANY_PEER_EVALUATION_STUDENT_TEAMS,
    variables: { data: studentTeamsData, skipDuplicates: true },
    errorPolicy: "all",
    fetchPolicy: "no-cache",
  });
};

export default createManyPeerEvaluationStudentTeams;
