import { PeerEvaluationStudent } from "@generated/type-graphql";

import { Prisma } from "@/pages/api/prisma";

interface IPeerEvaluationStudent extends PeerEvaluationStudent {
  userName: string | undefined;
  userEmail: string | undefined;
  userEmailVerified: Date | null | undefined;
  peerEvaluationStudentTeamName: string | undefined;
  peerEvaluationStudentTeamMark: Prisma.Decimal | undefined;
  peerEvaluationReviewedIsCompleted: boolean | undefined;
}

const sanitizePeerEvaluationStudentsDataOnFetch = (
  peerEvaluationStudentData: [PeerEvaluationStudent]
): [IPeerEvaluationStudent] => {
  const sanitized = peerEvaluationStudentData.map((data) => ({
    ...data,
    userName: data.studentName,
    userEmail: data.user?.email,
    userEmailVerified: data.user?.emailVerified,
    peerEvaluationStudentTeamName: data.peerEvaluationStudentTeam?.name,
    peerEvaluationStudentTeamMark: data.peerEvaluationStudentTeam?.mark,
    peerEvaluationReviewedIsCompleted: data.peerEvaluationReviewed?.isCompleted,
  }));

  return sanitized as [IPeerEvaluationStudent];
};

export { sanitizePeerEvaluationStudentsDataOnFetch };

export type { IPeerEvaluationStudent };
