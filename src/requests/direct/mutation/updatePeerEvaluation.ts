import { PeerEvaluationUpdateInput } from "@generated/type-graphql";

import { TApolloClientType } from "@/graphql/client";
import { UPDATE_PEER_EVALUATION } from "@/requests/schema/peer-evaluation";

const updatePeerEvaluation = (
  apolloClient: TApolloClientType,
  peerEvaluationData: PeerEvaluationUpdateInput,
  peerEvaluationId: string,
  columnListToClearId: string[]
) => {
  let dataPeerEvaluationStudentReview = {};

  if (columnListToClearId.length) {
    dataPeerEvaluationStudentReview = {
      isCompleted: {
        set: false,
      },
    };
  }

  return apolloClient.mutate({
    mutation: UPDATE_PEER_EVALUATION,
    variables: {
      dataPeerEvaluation: peerEvaluationData,
      wherePeerEvaluation: {
        id: peerEvaluationId,
      },
      dataPeerEvaluationStudentReview,
      wherePeerEvaluationStudentReview: {
        peerEvaluationStudent: {
          is: {
            peerEvaluationId: {
              equals: peerEvaluationId,
            },
          },
        },
      },
      dataPeerEvaluationRevieweeColumnData: {
        criteriaScore: {
          set: null,
        },
      },
      wherePeerEvaluationRevieweeColumnData: {
        peerEvaluationColumnId: {
          in: columnListToClearId,
        },
      },
    },
    errorPolicy: "all",
    fetchPolicy: "no-cache",
  });
};

export default updatePeerEvaluation;
