import prisma from "@/pages/api/prisma";
import {
  IPeerEvaluationRevieweesToBuildStudentTable,
  getPeerEvaluationDataToBuildStudentTable,
  getPeerEvaluationRevieweesToBuildStudentTable,
  getPeerEvaluationStudentTeamId,
} from "@/utils/peer-evaluation/student-table";

const createPeerEvaluationStudentReview = async (
  userId: string,
  peerEvaluationId: string,
  peerEvaluationRevieweesToBuildStudentTable: IPeerEvaluationRevieweesToBuildStudentTable[]
) => {
  await prisma.peerEvaluationStudentReview.create({
    data: {
      isCompleted: false,
      peerEvaluationStudent: {
        connect: {
          userId_peerEvaluationId: {
            peerEvaluationId: peerEvaluationId,
            userId: userId,
          },
        },
      },
      PeerEvaluationReviewees: {
        create: peerEvaluationRevieweesToBuildStudentTable,
      },
    },
  });
};

const createPeerEvaluationStudentTableByStudentUserId = async (
  userId: string,
  peerEvaluationId: string
): Promise<void> => {
  const peerEvaluationStudentTeamId = await getPeerEvaluationStudentTeamId(userId, peerEvaluationId);

  const peerEvaluationData = await getPeerEvaluationDataToBuildStudentTable(peerEvaluationId);

  if (!peerEvaluationStudentTeamId || !peerEvaluationData) {
    throw "Peer Evaluation data does not exist";
  }

  const peerEvaluationRevieweesToBuildStudentTable = getPeerEvaluationRevieweesToBuildStudentTable(
    peerEvaluationId,
    peerEvaluationStudentTeamId,
    peerEvaluationData.peerEvaluationStudents,
    peerEvaluationData.columns
  );

  await createPeerEvaluationStudentReview(userId, peerEvaluationId, peerEvaluationRevieweesToBuildStudentTable);
};

export { createPeerEvaluationStudentTableByStudentUserId };
