import prisma, { Prisma } from "@/pages/api/prisma";
import { updatePeerEvaluationStudentTableOnStudentTeamUpdated } from "@/utils/peer-evaluation/student/update";

const onUpdatePeerEvaluationStudentHookBeforeData = async (params: Prisma.MiddlewareParams) => {
  const { userId, peerEvaluationId } = params.args.where.userId_peerEvaluationId;

  const peerEvaluationStudentDataOldTeam = await prisma.peerEvaluationStudent.findFirst({
    select: {
      peerEvaluationStudentTeamId: true,
    },
    where: {
      peerEvaluationId: {
        equals: peerEvaluationId,
      },
      userId: {
        equals: userId,
      },
    },
  });

  if (peerEvaluationStudentDataOldTeam?.peerEvaluationStudentTeamId) {
    return {
      peerEvaluationStudentTeamIdPrevious: peerEvaluationStudentDataOldTeam.peerEvaluationStudentTeamId,
      peerEvaluationId: peerEvaluationId as string,
      userId: userId as string,
    };
  }

  return null;
};

const onUpdatePeerEvaluationStudentHookAfterData = async (
  userId: string,
  peerEvaluationId: string,
  peerEvaluationStudentTeamIdCurrent: string,
  peerEvaluationStudentTeamIdPrevious: string
) => {
  await updatePeerEvaluationStudentTableOnStudentTeamUpdated(
    userId,
    peerEvaluationId,
    peerEvaluationStudentTeamIdCurrent,
    peerEvaluationStudentTeamIdPrevious
  );
};

export { onUpdatePeerEvaluationStudentHookAfterData, onUpdatePeerEvaluationStudentHookBeforeData };
