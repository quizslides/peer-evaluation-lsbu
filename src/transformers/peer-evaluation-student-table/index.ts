import { ObjectArrayOfObject } from "@/utils/form";

interface PeerEvaluationTableOnUpdate {
  peerEvaluationTable: {
    id: string;
    isCompleted: boolean;
  };
  peerEvaluationReviewee: {
    id: string;
    comment: string;
    criteriaScoreTotal: number;
  };
  columnsReviewee: [
    {
      criteriaScore: number;
      key: string;
    },
  ];
}

const getSanitizedPeerEvaluationTableOnUpdate = (data: ObjectArrayOfObject, columnList: string[]) => {
  const dataSanitized = data.map((item) => {
    const columns = columnList.map((columnId) => ({
      criteriaScore: Number(item[columnId].criteriaScore),
      id: item[columnId].peerEvaluationRevieweeColumnId,
    }));

    return {
      peerEvaluationTable: {
        id: item.peerEvaluationStudentId,
        isCompleted: true,
      },
      peerEvaluationReviewee: {
        id: item.peerEvaluationRevieweeId,
        comment: item.comment,
        criteriaScoreTotal: item.criteriaScoreTotal,
      },
      columnsReviewee: columns,
    };
  });

  return dataSanitized as unknown as [PeerEvaluationTableOnUpdate];
};

export { getSanitizedPeerEvaluationTableOnUpdate };

export type { PeerEvaluationTableOnUpdate };
