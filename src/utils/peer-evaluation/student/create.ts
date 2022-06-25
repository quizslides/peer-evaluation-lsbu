import { getPeerEvaluationStudentListByStudentUpdated, updatePeerEvaluationStudentReview } from "./update";

import prisma from "@/pages/api/prisma";
import {
  IPeerEvaluationRevieweesToBuildStudentTable,
  getPeerEvaluationDataToBuildStudentTable,
  getPeerEvaluationDataToBuildStudentTableByStudentTeamId,
  getPeerEvaluationRevieweesToBuildStudentTable,
  getPeerEvaluationStudentListByValidPeerEvaluationTables,
  getPeerEvaluationStudentTeamId,
} from "@/utils/peer-evaluation/student";
import { getUserIdByEmail } from "@/utils/user";

type TCreatePeerEvaluationStudentBulk = {
  studentEmail: string;
  studentTeamName: string;
};

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
      peerEvaluationReviewees: {
        create: peerEvaluationRevieweesToBuildStudentTable,
      },
    },
  });
};

const createPeerEvaluationStudentTableByStudent = async (userId: string, peerEvaluationId: string): Promise<void> => {
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

const onCreatePeerEvaluationStudentBulk = async (
  peerEvaluationId: string,
  createStudentBulkData: TCreatePeerEvaluationStudentBulk[]
) => {
  for (const studentCreated of createStudentBulkData) {
    const getPeerEvaluationStudentTeamByName = async (peerEvaluationStudentTeamName: string) => {
      return await prisma.peerEvaluationStudentTeam.findFirst({
        select: {
          id: true,
        },
        where: {
          name: {
            equals: peerEvaluationStudentTeamName,
          },
        },
      });
    };

    const peerEvaluationStudentTeamData = await getPeerEvaluationStudentTeamByName(studentCreated.studentTeamName);

    if (!peerEvaluationStudentTeamData) {
      throw "Peer Evaluation Student Team does not exist.";
    }

    const peerEvaluationDataByTeam = await getPeerEvaluationDataToBuildStudentTableByStudentTeamId(
      peerEvaluationId,
      peerEvaluationStudentTeamData.id
    );

    if (!peerEvaluationDataByTeam) {
      throw "Peer Evaluation does not exist.";
    }

    const userId = await getUserIdByEmail(studentCreated.studentEmail);

    if (!userId) {
      throw "User does not exist.";
    }

    const peerEvaluationStudentCreated = getPeerEvaluationStudentListByStudentUpdated(
      peerEvaluationDataByTeam.peerEvaluationStudents,
      userId
    );

    const peerEvaluationRevieweesToBuildStudentTable = getPeerEvaluationRevieweesToBuildStudentTable(
      peerEvaluationId,
      peerEvaluationStudentTeamData.id,
      peerEvaluationStudentCreated,
      peerEvaluationDataByTeam.columns
    );

    const peerEvaluationStudentsCurrentStudentTeam = getPeerEvaluationStudentListByValidPeerEvaluationTables(
      peerEvaluationDataByTeam.peerEvaluationStudents,
      peerEvaluationStudentTeamData.id
    );

    for (const peerEvaluationStudentCurrentStudentTeam of peerEvaluationStudentsCurrentStudentTeam) {
      await updatePeerEvaluationStudentReview(
        peerEvaluationStudentCurrentStudentTeam.id,
        peerEvaluationRevieweesToBuildStudentTable
      );
    }
  }
};

export type { TCreatePeerEvaluationStudentBulk };

export { createPeerEvaluationStudentTableByStudent, onCreatePeerEvaluationStudentBulk };
