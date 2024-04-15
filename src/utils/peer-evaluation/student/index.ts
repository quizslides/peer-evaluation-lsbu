import { PeerEvaluationColumn, PeerEvaluationStudent, PeerEvaluationStudentTeam } from "@generated/type-graphql";

import { prisma } from "@/pages/api/prisma";

interface IPeerEvaluationDataToBuildStudentTable {
  peerEvaluationStudentTeams: PeerEvaluationStudentTeam[];
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

interface IPeerEvaluationRevieweesToBuildStudentTable {
  isValid: boolean;
  comment: null;
  criteriaScoreTotal: null;
  studentReviewed: {
    connect: {
      userId_peerEvaluationId: {
        peerEvaluationId: string;
        userId: string;
      };
    };
  };
  peerEvaluationRevieweeColumns: {
    create: PeerEvaluationStudentTableRevieweeColumnsMutationObject[];
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

// TODO: Review if can be filtered by only teams
const getPeerEvaluationDataToBuildStudentTable = async (
  peerEvaluationId: string
): Promise<IPeerEvaluationDataToBuildStudentTable | null> => {
  return await prisma.peerEvaluation.findFirst({
    select: {
      code: true,
      peerEvaluationStudents: {
        include: {
          peerEvaluationReviewed: true,
        },
      },
      peerEvaluationStudentTeams: true,
      columns: true,
    },
    where: {
      id: peerEvaluationId,
    },
  });
};

const getPeerEvaluationStudentTeamIdByName = async (
  peerEvaluationId: string,
  peerEvaluationStudentTeamName: string
) => {
  return await prisma.peerEvaluationStudentTeam.findFirst({
    select: {
      id: true,
    },
    where: {
      peerEvaluationId: {
        equals: peerEvaluationId,
      },
      name: {
        equals: peerEvaluationStudentTeamName,
      },
    },
  });
};

const getPeerEvaluationDataToBuildStudentTableByStudentTeamId = async (
  peerEvaluationId: string,
  peerEvaluationStudentTeamId: string
): Promise<IPeerEvaluationDataToBuildStudentTable | null> => {
  return await prisma.peerEvaluation.findFirst({
    select: {
      code: true,
      peerEvaluationStudents: {
        include: {
          peerEvaluationReviewed: true,
        },
      },
      peerEvaluationStudentTeams: true,
      columns: true,
    },
    where: {
      id: peerEvaluationId,
      peerEvaluationStudents: {
        some: {
          peerEvaluationStudentTeamId: peerEvaluationStudentTeamId,
        },
      },
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

const getPeerEvaluationStudentTeamId = async (userId: string, peerEvaluationId: string): Promise<string | null> => {
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

const getPeerEvaluationStudentListByValidPeerEvaluationTables = (
  peerEvaluationStudents: PeerEvaluationStudent[],
  peerEvaluationStudentTeamIdSearch: string
) => {
  return peerEvaluationStudents.filter(
    ({ peerEvaluationStudentTeamId, peerEvaluationReviewed }) =>
      peerEvaluationStudentTeamId === peerEvaluationStudentTeamIdSearch && peerEvaluationReviewed !== null
  );
};

const getPeerEvaluationRevieweesToBuildStudentTable = (
  peerEvaluationId: string,
  peerEvaluationStudentTeamId: string,
  peerEvaluationStudents: PeerEvaluationStudent[],
  peerEvaluationColumns: PeerEvaluationColumn[]
): IPeerEvaluationRevieweesToBuildStudentTable[] => {
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
    peerEvaluationRevieweeColumns: {
      create: peerEvaluationRevieweeColumnsMutationObject,
    },
  }));
};

const getPeerEvaluationStudentId = async (userId: string, peerEvaluationId: string): Promise<string | null> => {
  const peerEvaluationStudentData = await prisma.peerEvaluationStudent.findFirst({
    select: {
      id: true,
    },
    where: {
      userId: {
        equals: userId,
      },
      peerEvaluationId: {
        equals: peerEvaluationId,
      },
    },
  });

  if (peerEvaluationStudentData) {
    return peerEvaluationStudentData.id;
  }

  return null;
};

const setPeerEvaluationStudentTableAsIncomplete = async (peerEvaluationStudentId: string) => {
  await prisma.peerEvaluationStudentReview.updateMany({
    where: {
      peerEvaluationStudentId: peerEvaluationStudentId,
    },
    data: {
      isCompleted: {
        set: false,
      },
    },
  });
};

export {
  getPeerEvaluationDataToBuildStudentTable,
  getPeerEvaluationDataToBuildStudentTableByStudentTeamId,
  getPeerEvaluationRevieweesToBuildStudentTable,
  getPeerEvaluationStudentId,
  getPeerEvaluationStudentListByValidPeerEvaluationTables,
  getPeerEvaluationStudentTeamId,
  getPeerEvaluationStudentTeamIdByName,
  isPeerEvaluationStudentTableExists,
  setPeerEvaluationStudentTableAsIncomplete,
};

export type { IPeerEvaluationRevieweesToBuildStudentTable };
