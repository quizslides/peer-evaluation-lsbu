import { PeerEvaluationStudent } from "@generated/type-graphql";
import { Decimal } from "@prisma/client/runtime";

interface IPeerEvaluationStudent extends PeerEvaluationStudent {
  userName: string | undefined;
  userEmail: string | undefined;
  userEmailVerified: Date | null | undefined;
  peerEvaluationStudentTeamName: string | undefined;
  peerEvaluationStudentTeamMark: Decimal | undefined;
  peerEvaluationReviewedIsCompleted: boolean | undefined;
}

const sanitizePeerEvaluationStudentsDataOnFetch = (
  peerEvaluationStudentData: [PeerEvaluationStudent]
): [IPeerEvaluationStudent] => {
  const sanitized = peerEvaluationStudentData.map((data) => ({
    ...data,
    userName: data.user?.name,
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
