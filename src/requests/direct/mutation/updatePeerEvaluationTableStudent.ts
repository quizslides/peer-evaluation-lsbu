import { TApolloClientType } from "@/graphql/client";
import { UPDATE_PEER_EVALUATION_TABLE_STUDENT } from "@/requests/schema/peer-evaluation";
import { PeerEvaluationTableOnUpdate } from "@/transformers/peer-evaluation-student-table";

const updatePeerEvaluationTableStudent = (
  apolloClient: TApolloClientType,
  peerEvaluationTableData: [PeerEvaluationTableOnUpdate]
) => {
  return apolloClient.mutate({
    mutation: UPDATE_PEER_EVALUATION_TABLE_STUDENT,
    variables: { where: { peerEvaluationTableDataList: peerEvaluationTableData } },
    errorPolicy: "all",
    fetchPolicy: "no-cache",
  });
};

export default updatePeerEvaluationTableStudent;
