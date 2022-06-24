import { PeerEvaluation } from "@generated/type-graphql";

import prisma from "@/pages/api/prisma";
import { getDateLocaleString } from "@/utils/date";

type TPeerEvaluationStatus = "OPEN" | "CLOSED";

interface IPeerEvaluationStudent {
  code: string;
  status: PeerEvaluation["status"];
  submissionsLockDate: Date | null;
  peerEvaluationStudents: {
    peerEvaluationReviewed: {
      isCompleted: boolean;
      updatedAt: Date;
    } | null;
  }[];
}

interface IPeerEvaluationStudentDashboard {
  updatedAt: string;
  code: string;
  isCompleted: boolean;
  peerEvaluationStatus: TPeerEvaluationStatus;
  submissionsLockDate: string;
}

const getPeerEvaluationStudentsByUserId = async (userId: string) => {
  return await prisma.peerEvaluation.findMany({
    select: {
      code: true,
      status: true,
      submissionsLockDate: true,
      peerEvaluationStudents: {
        select: {
          peerEvaluationReviewed: {
            select: {
              isCompleted: true,
              updatedAt: true,
            },
          },
        },
        where: {
          userId,
        },
      },
    },
    where: {
      peerEvaluationStudents: {
        some: {
          userId,
        },
      },
      status: {
        not: {
          equals: "DRAFT",
        },
      },
    },
  });
};

const getPeerEvaluationsStudentList = (
  peerEvaluationData: IPeerEvaluationStudent[]
): IPeerEvaluationStudentDashboard[] => {
  return peerEvaluationData.map((data) => ({
    code: data.code,
    isCompleted: data.peerEvaluationStudents[0].peerEvaluationReviewed?.isCompleted || false,
    peerEvaluationStatus: data.status === "PUBLISHED" ? "OPEN" : "CLOSED",
    submissionsLockDate: data.submissionsLockDate ? getDateLocaleString(data.submissionsLockDate) : "N/A",
    updatedAt: data.peerEvaluationStudents[0].peerEvaluationReviewed?.updatedAt
      ? getDateLocaleString(new Date(data.peerEvaluationStudents[0].peerEvaluationReviewed?.updatedAt))
      : "N/A",
  }));
};

export { getPeerEvaluationsStudentList, getPeerEvaluationStudentsByUserId };

export type { IPeerEvaluationStudentDashboard, TPeerEvaluationStatus };
