import { PeerEvaluationColumn, PeerEvaluationStudent, PeerEvaluationStudentTeam } from "@generated/type-graphql";

import prisma from "@/pages/api/prisma";

interface IPeerEvaluationDataToBuildStudentTable {
  PeerEvaluationStudentTeam: PeerEvaluationStudentTeam[];
  peerEvaluationStudents: PeerEvaluationStudent[];
  columns: PeerEvaluationColumn[];
}

interface PeerEvaluationStudentTableRevieweeColumnsMutationObject {
  criteriaScore: null;
  peerEvaluationColumn: {
    connect: {
      id_peerEvaluationId: {
        peerEvaluationId: string;
        id: string;
      };
    };
  };
}

const isPeerEvaluationStudentTableExists = async (peerEvaluationStudentId: string): Promise<boolean> => {
  const peerEvaluationStudentReviewData = await prisma.peerEvaluationStudentReview.findFirst({
    where: {
      peerEvaluationStudentId: {
        equals: peerEvaluationStudentId,
      },
    },
  });

  return !!peerEvaluationStudentReviewData?.id;
};

const getPeerEvaluationDataToBuildStudentTable = async (
  peerEvaluationId: string
): Promise<IPeerEvaluationDataToBuildStudentTable | null> => {
  return await prisma.peerEvaluation.findFirst({
    select: {
      code: true,
      peerEvaluationStudents: true,
      PeerEvaluationStudentTeam: true,
      columns: true,
    },
    where: {
      id: peerEvaluationId,
    },
  });
};

const getPeerEvaluationStudentTableRevieweeColumnsMutationObject = (
  peerEvaluationId: string,
  peerEvaluationColumns: PeerEvaluationColumn[]
): PeerEvaluationStudentTableRevieweeColumnsMutationObject[] => {
  return peerEvaluationColumns.map((column) => ({
    criteriaScore: null,
    peerEvaluationColumn: {
      connect: {
        id_peerEvaluationId: {
          peerEvaluationId: peerEvaluationId,
          id: column.id,
        },
      },
    },
  }));
};

const getPeerEvaluationStudentTeamIdByUserId = async (
  userId: string,
  peerEvaluationId: string
): Promise<string | null> => {
  const peerEvaluationStudentTeamData = await prisma.peerEvaluationStudentTeam.findFirst({
    select: {
      id: true,
    },
    where: {
      peerEvaluationStudentList: {
        some: {
          userId: {
            equals: userId,
          },
        },
      },
      peerEvaluationId: {
        equals: peerEvaluationId,
      },
    },
  });

  if (peerEvaluationStudentTeamData) {
    return peerEvaluationStudentTeamData.id;
  }

  return null;
};

const getListOfPeerEvaluationRevieweesByStudentTeamId = (
  peerEvaluationStudentTeamIdOfReviewee: string,
  peerEvaluationStudents: PeerEvaluationStudent[]
): PeerEvaluationStudent[] => {
  return peerEvaluationStudents.filter(
    ({ peerEvaluationStudentTeamId }) => peerEvaluationStudentTeamId === peerEvaluationStudentTeamIdOfReviewee
  );
};

const getPeerEvaluationRevieweesToBuildStudentTable = (
  peerEvaluationId: string,
  peerEvaluationStudentTeamId: string,
  peerEvaluationStudents: PeerEvaluationStudent[],
  peerEvaluationColumns: PeerEvaluationColumn[]
) => {
  const listPeerEvaluationRevieweesStudent = getListOfPeerEvaluationRevieweesByStudentTeamId(
    peerEvaluationStudentTeamId,
    peerEvaluationStudents
  );

  const peerEvaluationRevieweeColumnsMutationObject = getPeerEvaluationStudentTableRevieweeColumnsMutationObject(
    peerEvaluationId,
    peerEvaluationColumns
  );

  return listPeerEvaluationRevieweesStudent.map((revieweesData) => ({
    isValid: true,
    comment: null,
    criteriaScoreTotal: null,
    studentReviewed: {
      connect: {
        userId_peerEvaluationId: {
          peerEvaluationId: peerEvaluationId,
          userId: revieweesData.userId,
        },
      },
    },
    PeerEvaluationRevieweeColumn: {
      create: peerEvaluationRevieweeColumnsMutationObject,
    },
  }));
};

const createPeerEvaluationStudentTableByStudentUserId = async (
  userId: string,
  peerEvaluationId: string
): Promise<boolean> => {
  const peerEvaluationStudentTeamId = await getPeerEvaluationStudentTeamIdByUserId(userId, peerEvaluationId);

  const peerEvaluationData = await getPeerEvaluationDataToBuildStudentTable(peerEvaluationId);

  if (!peerEvaluationStudentTeamId || !peerEvaluationData) {
    return false;
  }

  const peerEvaluationRevieweesToBuildStudentTable = getPeerEvaluationRevieweesToBuildStudentTable(
    peerEvaluationId,
    peerEvaluationStudentTeamId,
    peerEvaluationData.peerEvaluationStudents,
    peerEvaluationData.columns
  );

  try {
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

    return true;
  } catch {
    return false;
  }
};

export { createPeerEvaluationStudentTableByStudentUserId, isPeerEvaluationStudentTableExists };
