import { PeerEvaluationStudent } from "@generated/type-graphql";

import prisma from "@/pages/api/prisma";
import { calculatePeerEvaluationStudentMark } from "@/utils/peer-evaluation/mark-calculation";
import {
  IPeerEvaluationRevieweesToBuildStudentTable,
  getPeerEvaluationDataToBuildStudentTable,
  getPeerEvaluationRevieweesToBuildStudentTable,
  getPeerEvaluationStudentId,
  getPeerEvaluationStudentListByValidPeerEvaluationTables,
} from "@/utils/peer-evaluation/student";

const deletePeerEvaluationStudentReviewByPeerEvaluationStudentId = async (peerEvaluationStudentId: string) => {
  await prisma.peerEvaluationStudentReview.delete({
    select: {
      id: true,
    },
    where: {
      peerEvaluationStudentId,
    },
  });
};

const deletePeerEvaluationReviewee = async (userId: string, peerEvaluationId: string) => {
  await prisma.peerEvaluationReviewee.deleteMany({
    where: {
      studentReviewed: {
        userId: {
          equals: userId,
        },
      },
      peerEvaluationReview: {
        peerEvaluationStudent: {
          peerEvaluationId: {
            equals: peerEvaluationId,
          },
        },
      },
    },
  });
};

const getPeerEvaluationStudentListByStudentUpdated = (
  peerEvaluationStudents: PeerEvaluationStudent[],
  userId: string
) => peerEvaluationStudents.filter(({ userId: peerEvaluationStudentUserId }) => peerEvaluationStudentUserId === userId);

const updatePeerEvaluationStudentReview = async (
  peerEvaluationStudentId: string,
  peerEvaluationRevieweesToBuildStudentTable: IPeerEvaluationRevieweesToBuildStudentTable[]
) => {
  await prisma.peerEvaluationStudentReview.update({
    where: {
      peerEvaluationStudentId: peerEvaluationStudentId,
    },
    data: {
      isCompleted: {
        set: false,
      },
      peerEvaluationReviewees: {
        create: peerEvaluationRevieweesToBuildStudentTable,
      },
    },
  });
};

const updatePeerEvaluationStudentTableOnStudentTeamUpdated = async (
  userId: string,
  peerEvaluationId: string,
  peerEvaluationStudentTeamIdCurrent: string,
  peerEvaluationStudentTeamIdPrevious: string
) => {
  const peerEvaluationStudentId = await getPeerEvaluationStudentId(userId, peerEvaluationId);

  if (!peerEvaluationStudentId) {
    throw "Peer Evaluation Student ID does not exist.";
  }

  await deletePeerEvaluationStudentReviewByPeerEvaluationStudentId(peerEvaluationStudentId);

  await deletePeerEvaluationReviewee(userId, peerEvaluationId);

  const peerEvaluationData = await getPeerEvaluationDataToBuildStudentTable(peerEvaluationId);

  if (!peerEvaluationData) {
    throw "Peer Evaluation does not exist.";
  }

  const peerEvaluationStudentUpdated = getPeerEvaluationStudentListByStudentUpdated(
    peerEvaluationData.peerEvaluationStudents,
    userId
  );

  const peerEvaluationRevieweesToBuildStudentTable = getPeerEvaluationRevieweesToBuildStudentTable(
    peerEvaluationId,
    peerEvaluationStudentTeamIdCurrent,
    peerEvaluationStudentUpdated,
    peerEvaluationData.columns
  );

  const peerEvaluationStudentsCurrentStudentTeam = getPeerEvaluationStudentListByValidPeerEvaluationTables(
    peerEvaluationData.peerEvaluationStudents,
    peerEvaluationStudentTeamIdCurrent
  );

  for (const peerEvaluationStudentCurrentStudentTeam of peerEvaluationStudentsCurrentStudentTeam) {
    await updatePeerEvaluationStudentReview(
      peerEvaluationStudentCurrentStudentTeam.id,
      peerEvaluationRevieweesToBuildStudentTable
    );
  }

  await calculatePeerEvaluationStudentMark(peerEvaluationId, peerEvaluationStudentTeamIdCurrent);
  await calculatePeerEvaluationStudentMark(peerEvaluationId, peerEvaluationStudentTeamIdPrevious);
};

export {
  getPeerEvaluationStudentListByStudentUpdated,
  updatePeerEvaluationStudentReview,
  updatePeerEvaluationStudentTableOnStudentTeamUpdated,
};
