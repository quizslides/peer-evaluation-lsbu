import { TApolloClientType } from "@/graphql/client";
import { PeerEvaluationStudentTeamExist } from "@/pages/api/resolvers/peer-evaluation";
import { GET_PEER_EVALUATION_STUDENT_TEAM_EXIST } from "@/requests/schema/peer-evaluation";

const getPeerEvaluationStudentTeamExist = (
  apolloClient: TApolloClientType,
  peerEvaluationId: string,
  studentEmailList: string[]
) => {
  return apolloClient.query<{ peerEvaluationStudentTeamExist: PeerEvaluationStudentTeamExist }>({
    query: GET_PEER_EVALUATION_STUDENT_TEAM_EXIST,
    errorPolicy: "all",
    fetchPolicy: "no-cache",
    variables: {
      where: {
        emailList: studentEmailList,
        peerEvaluationId,
      },
    },
  });
};

export default getPeerEvaluationStudentTeamExist;
