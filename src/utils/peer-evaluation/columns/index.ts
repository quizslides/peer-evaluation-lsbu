import { prisma } from "@/pages/api/prisma";
import {
  getPeerEvaluationStudentListByValidPeerEvaluationTables,
  setPeerEvaluationStudentTableAsIncomplete,
} from "@/utils/peer-evaluation/student";

const onAddPeerEvaluationColumns = async (peerEvaluationId: string, columnIds: string[]) => {
  const peerEvaluationData = await prisma.peerEvaluation.findFirst({
    select: {
      peerEvaluationStudentTeams: true,
      columns: {
        where: {
          id: {
            in: columnIds,
          },
        },
      },
      peerEvaluationStudents: true,
    },
    where: {
      id: {
        equals: peerEvaluationId,
      },
    },
  });

  if (!peerEvaluationData) {
    return null;
  }

  for (const studentTeam of peerEvaluationData.peerEvaluationStudentTeams) {
    const peerEvaluationStudentsCurrentTeam = getPeerEvaluationStudentListByValidPeerEvaluationTables(
      peerEvaluationData.peerEvaluationStudents,
      studentTeam.id
    );

    for (const peerEvaluationStudent of peerEvaluationStudentsCurrentTeam) {
      const listPeerEvaluationRevieweeData = await prisma.peerEvaluationReviewee.findMany({
        select: {
          id: true,
        },
        where: {
          studentReviewed: {
            is: {
              peerEvaluationId: {
                equals: peerEvaluationId,
              },
              id: {
                equals: peerEvaluationStudent.id,
              },
            },
          },
        },
      });

      for (const peerEvaluationRevieweeData of listPeerEvaluationRevieweeData) {
        for (const column of peerEvaluationData.columns) {
          await prisma.peerEvaluationRevieweeColumn.create({
            select: {
              id: true,
            },
            data: {
              criteriaScore: null,
              peerEvaluationColumn: {
                connect: {
                  id_peerEvaluationId: {
                    peerEvaluationId: peerEvaluationId,
                    id: column.id,
                  },
                },
              },
              peerEvaluationReviewee: {
                connect: {
                  id: peerEvaluationRevieweeData.id,
                },
              },
            },
          });
        }
      }

      await prisma.peerEvaluationReviewee.updateMany({
        data: {
          criteriaScoreTotal: 0,
        },
        where: {
          studentReviewed: {
            id: {
              equals: peerEvaluationStudent.id,
            },
            peerEvaluationId: {
              equals: peerEvaluationId,
            },
          },
        },
      });

      await setPeerEvaluationStudentTableAsIncomplete(peerEvaluationStudent.id);
    }
  }
};

export { onAddPeerEvaluationColumns };
