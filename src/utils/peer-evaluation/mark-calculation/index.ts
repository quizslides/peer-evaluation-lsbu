import { PeerEvaluationStudentTeam } from "@generated/type-graphql";
import { Decimal } from "@prisma/client/runtime";

import prisma, { Prisma } from "@/pages/api/prisma";
import { getUserIdByEmail } from "@/utils/user";

interface AvgCriteriaScoreByStudent {
  email: string;
  averageCriteriaScore: number;
  comments: string;
}

interface User {
  email: string;
  name: string;
}

interface StudentReviewedUser {
  name: string;
  email: string;
  id: string;
}

interface StudentReviewed {
  user: StudentReviewedUser;
}

interface PeerEvaluationStudentUser {
  name: string;
  email: string;
}

interface PeerEvaluationStudent {
  user: PeerEvaluationStudentUser;
}

interface PeerEvaluationReview {
  peerEvaluationStudent: PeerEvaluationStudent;
}

interface PeerEvaluationReviewee {
  studentReviewed: StudentReviewed;
  criteriaScoreTotal: number;
  comment: string;
  isValid: boolean;
  studentReviewedId: string;
  peerEvaluationReview: PeerEvaluationReview;
  id: string;
}

interface PeerEvaluationStudentList {
  user: User;
  PeerEvaluationReviewees: PeerEvaluationReviewee[];
  studentName: string;
}

interface IPeerEvaluationStudentTeam {
  mark: Decimal;
  id: string;
  peerEvaluationStudentList: PeerEvaluationStudentList[];
}

interface IPeerEvaluationStudentMarksByTeam {
  averageCriteriaScoreByTeamMember: number;
  systemCalculatedMark: number;
  systemAdjustedMark: number;
  lecturerAdjustedMark: number | null;
  finalMark: number;
  reviews: IPeerEvaluationTeamReviewerResult[];
  studentName: string;
  email: string;
  studentId: string;
  averageCriteriaScore: number;
  comments: string;
}

interface IPeerEvaluationTeamReviewerResult {
  revieweeStudentId: string;
  reviewerName: string;
  reviewerEmail: string;
  revieweeName: string;
  revieweeEmail: string;
  criteriaScoreTotal: number | null;
  comment: string | null;
  isValid: boolean;
  peerEvaluationReviewId: string;
}

const getPeerEvaluationDataById = async (peerEvaluationId: string) => {
  return await prisma.peerEvaluation.findFirst({
    select: {
      id: true,
      maxMarkDecrease: true,
      maxMarkIncrease: true,
    },
    where: {
      id: {
        equals: peerEvaluationId,
      },
    },
  });
};

const getPeerEvaluationStudentTeamData = async (peerEvaluationStudentTeamId: string) => {
  return await prisma.peerEvaluationStudentTeam.findFirst({
    select: {
      mark: true,
      id: true,
      peerEvaluationStudentList: {
        select: {
          user: {
            select: {
              email: true,
              name: true,
            },
          },
          PeerEvaluationReviewees: {
            select: {
              studentReviewed: {
                select: {
                  user: {
                    select: {
                      name: true,
                      email: true,
                      id: true,
                    },
                  },
                },
              },
              criteriaScoreTotal: true,
              comment: true,
              isValid: true,
              studentReviewedId: true,
              peerEvaluationReview: {
                select: {
                  peerEvaluationStudent: {
                    select: {
                      user: {
                        select: {
                          name: true,
                          email: true,
                        },
                      },
                    },
                  },
                },
              },
              id: true,
            },
          },
          studentName: true,
        },
      },
    },
    where: {
      id: {
        equals: peerEvaluationStudentTeamId,
      },
    },
  });
};

const getPeerEvaluationStudentTeamIdByName = async (
  peerEvaluationId: string,
  peerEvaluationStudentTeamName: string
) => {
  return (
    await prisma.peerEvaluationStudentTeam.findFirst({
      select: {
        id: true,
      },
      where: {
        name: {
          equals: peerEvaluationStudentTeamName,
        },
        peerEvaluationId: {
          equals: peerEvaluationId,
        },
      },
    })
  )?.id;
};

const getMaxMarkIncreaseStudent = (teamMark: number, maxMarkIncrease: number) => teamMark + maxMarkIncrease;

const getMaxMarkDecreaseStudent = (teamMark: number, maxMarkDecrease: number) =>
  teamMark - maxMarkDecrease < 0 ? 0 : teamMark - maxMarkDecrease;

const getStudentTeamEmailList = (peerEvaluationStudentTeam: PeerEvaluationStudentTeam) => {
  if (peerEvaluationStudentTeam.peerEvaluationStudentList) {
    return peerEvaluationStudentTeam.peerEvaluationStudentList.flatMap(({ user }) => user?.email || "");
  }

  return null;
};

const getPeerEvaluationTeamReviewersResults = (peerEvaluationStudentTeamData: IPeerEvaluationStudentTeam) => {
  return peerEvaluationStudentTeamData.peerEvaluationStudentList.flatMap((student) =>
    student.PeerEvaluationReviewees.map(
      ({ criteriaScoreTotal, comment, isValid, peerEvaluationReview, id, studentReviewedId }) => ({
        reviewerName: peerEvaluationReview?.peerEvaluationStudent.user.name || "",
        reviewerEmail: peerEvaluationReview?.peerEvaluationStudent.user.email || "",
        revieweeName: student.user.name,
        revieweeEmail: student.user.email,
        criteriaScoreTotal,
        comment,
        isValid,
        peerEvaluationReviewId: id,
        revieweeStudentId: studentReviewedId,
      })
    )
  );
};

const getCriteriaTotalSum = (data: IPeerEvaluationTeamReviewerResult[]) =>
  data.reduce((sum, { criteriaScoreTotal }) => sum + (criteriaScoreTotal || 0), 0);

const getReviewees = (data: IPeerEvaluationTeamReviewerResult[], studentEmail: string) =>
  data.filter(({ revieweeEmail }) => revieweeEmail === studentEmail);

const getRevieweesValid = (data: IPeerEvaluationTeamReviewerResult[], studentEmail: string) =>
  data.filter(
    ({ revieweeEmail, isValid, criteriaScoreTotal }) =>
      revieweeEmail === studentEmail && isValid === true && criteriaScoreTotal !== null
  );

const getCommentsByReviewer = (dataReviewees: IPeerEvaluationTeamReviewerResult[]) => {
  const listCommentsByReviewer = dataReviewees
    .map((data) => `- ${data.reviewerEmail}: ${data.comment !== null ? data.comment : "N/A"}\n`)
    .join("");

  return listCommentsByReviewer.slice(0, listCommentsByReviewer.lastIndexOf("\n"));
};

const getAverageCriteriaScore = (criteriaScore: number, validSubmissions: number) => {
  const avgCriteriaScore = criteriaScore / validSubmissions;

  const avgCriteriaScoreSanitized = Number.isNaN(avgCriteriaScore) ? 0 : avgCriteriaScore;

  return avgCriteriaScoreSanitized;
};

const getAvgCriteriaScoreData = (
  peerEvaluationTeamReviewerResults: IPeerEvaluationTeamReviewerResult[],
  studentTeamEmailList: string[]
) => {
  const avgCriteriaScoreByStudent: AvgCriteriaScoreByStudent[] = [];

  let sumAvgCriteriaScoreByStudent = 0;

  for (const studentEmail of studentTeamEmailList) {
    const listRevieweesByReviewee = getReviewees(peerEvaluationTeamReviewerResults, studentEmail);

    const listRevieweesValid = getRevieweesValid(listRevieweesByReviewee, studentEmail);

    const criteriaScoreTotalSum = getCriteriaTotalSum(listRevieweesValid);

    const totalValidSubmissions = listRevieweesValid.length;

    const listCommentsByReviewer = getCommentsByReviewer(listRevieweesByReviewee);

    const avgCriteriaScoreStudent = getAverageCriteriaScore(criteriaScoreTotalSum, totalValidSubmissions);

    sumAvgCriteriaScoreByStudent = sumAvgCriteriaScoreByStudent + avgCriteriaScoreStudent;

    avgCriteriaScoreByStudent.push({
      email: studentEmail,
      averageCriteriaScore: avgCriteriaScoreStudent,
      comments: listCommentsByReviewer,
    });
  }

  return {
    avgCriteriaScoreByStudent,
    sumAvgCriteriaScoreByStudent,
  };
};

const getAvgCriteriaScoreByTeamMember = (averageCriteriaScore: number, sumAvgCriteriaScoreByStudent: number) =>
  averageCriteriaScore / sumAvgCriteriaScoreByStudent;

const getSystemCalculatedMark = (
  averageCriteriaScoreByTeamMember: number,
  totalPeerEvaluationStudentCount: number,
  peerEvaluationTeamMark: number
) => averageCriteriaScoreByTeamMember * totalPeerEvaluationStudentCount * peerEvaluationTeamMark;

const getSystemAdjustedMark = (
  systemCalculatedMark: number,
  maxMarkDecreaseStudent: number,
  maxMarkIncreaseStudent: number
) => {
  let systemAdjustedMark = null;

  if (systemCalculatedMark < maxMarkDecreaseStudent) {
    systemAdjustedMark = maxMarkDecreaseStudent;
  } else if (systemCalculatedMark > maxMarkIncreaseStudent) {
    systemAdjustedMark = maxMarkIncreaseStudent;
  } else {
    systemAdjustedMark = systemCalculatedMark;
  }

  return systemAdjustedMark;
};

const getLecturerAdjustedMarkByStudent = async (userId: string) => {
  return await prisma.peerEvaluationStudent.findFirst({
    select: {
      lecturerAdjustedMark: true,
    },
    where: {
      userId: {
        equals: userId,
      },
    },
  });
};

const updatePeerEvaluationStudentData = async (
  peerEvaluationId: string,
  userId: string,
  averageCriteriaScore: number,
  averageCriteriaScoreByTeamMember: number,
  systemCalculatedMark: number,
  systemAdjustedMark: number | null,
  lecturerAdjustedMark: number | null,
  finalMark: number,
  comments: string
) => {
  await prisma.peerEvaluationStudent.update({
    data: {
      averageCriteriaScore: averageCriteriaScore,
      averageCriteriaScoreByTeamMember: averageCriteriaScoreByTeamMember,
      systemCalculatedMark: systemCalculatedMark,
      systemAdjustedMark: systemAdjustedMark,
      lecturerAdjustedMark: lecturerAdjustedMark,
      finalMark: finalMark,
      comments: comments,
    },
    where: {
      userId_peerEvaluationId: {
        peerEvaluationId: peerEvaluationId,
        userId: userId,
      },
    },
  });
};

const getPeerEvaluationStudentLecturerAdjustedMark = (lecturerAdjustedMark: Decimal | null) =>
  lecturerAdjustedMark ? Number(lecturerAdjustedMark) : null;

const getPeerEvaluationStudentFinalMark = (lecturerAdjustedMark: number | null, systemAdjustedMark: number) =>
  lecturerAdjustedMark ? lecturerAdjustedMark : systemAdjustedMark;

const getListStudentMarkData = async (
  avgCriteriaScoreByStudent: AvgCriteriaScoreByStudent[],
  sumAvgCriteriaScoreByStudent: number,
  totalPeerEvaluationStudentCount: number,
  peerEvaluationTeamMark: number,
  maxMarkDecreaseStudent: number,
  maxMarkIncreaseStudent: number
): Promise<IPeerEvaluationStudentMarksByTeam[]> => {
  const studentMarkDataPromise = avgCriteriaScoreByStudent.map(async (data) => {
    const averageCriteriaScoreByTeamMember = getAvgCriteriaScoreByTeamMember(
      data.averageCriteriaScore,
      sumAvgCriteriaScoreByStudent
    );

    const systemCalculatedMark = getSystemCalculatedMark(
      averageCriteriaScoreByTeamMember,
      totalPeerEvaluationStudentCount,
      peerEvaluationTeamMark
    );

    const systemAdjustedMark = getSystemAdjustedMark(
      systemCalculatedMark,
      maxMarkDecreaseStudent,
      maxMarkIncreaseStudent
    );

    const reviews: IPeerEvaluationTeamReviewerResult[] = [];

    const userId = await getUserIdByEmail(data.email);

    if (!userId) {
      throw "User does not exist.";
    }

    const peerEvaluationStudentData = await getLecturerAdjustedMarkByStudent(userId);

    if (!peerEvaluationStudentData) {
      throw "Peer Evaluation Student Data does not exist.";
    }

    const lecturerAdjustedMark = getPeerEvaluationStudentLecturerAdjustedMark(
      peerEvaluationStudentData.lecturerAdjustedMark
    );

    const finalMark = getPeerEvaluationStudentFinalMark(lecturerAdjustedMark, systemAdjustedMark);

    return {
      ...data,
      averageCriteriaScoreByTeamMember,
      systemCalculatedMark,
      systemAdjustedMark,
      reviews,
      studentName: "",
      studentId: "",
      lecturerAdjustedMark,
      finalMark,
    };
  });

  const studentMarkData = Promise.all(studentMarkDataPromise);

  return studentMarkData;
};

const getPeerEvaluationStudentMarksByTeam = async (peerEvaluationId: string, peerEvaluationStudentTeamId: string) => {
  const peerEvaluationData = await getPeerEvaluationDataById(peerEvaluationId);

  if (!peerEvaluationData) {
    throw "Peer Evaluation Data does not exist.";
  }

  const peerEvaluationStudentTeamData = await getPeerEvaluationStudentTeamData(peerEvaluationStudentTeamId);

  if (!peerEvaluationStudentTeamData) {
    throw "Peer Evaluation Student Team Data does not exist.";
  }

  const peerEvaluationTeamMark = Number(peerEvaluationStudentTeamData.mark);

  const maxMarkIncreaseStudent = getMaxMarkIncreaseStudent(peerEvaluationTeamMark, peerEvaluationData.maxMarkIncrease);

  const maxMarkDecreaseStudent = getMaxMarkDecreaseStudent(peerEvaluationTeamMark, peerEvaluationData.maxMarkDecrease);

  const studentTeamEmailList = getStudentTeamEmailList(peerEvaluationStudentTeamData as PeerEvaluationStudentTeam);

  if (!studentTeamEmailList?.length) {
    throw "Peer Evaluation does not contain any students.";
  }

  const totalPeerEvaluationStudentCount = studentTeamEmailList.length;

  const peerEvaluationTeamReviewerResults: IPeerEvaluationTeamReviewerResult[] = getPeerEvaluationTeamReviewersResults(
    peerEvaluationStudentTeamData as IPeerEvaluationStudentTeam
  );

  const { avgCriteriaScoreByStudent, sumAvgCriteriaScoreByStudent } = getAvgCriteriaScoreData(
    peerEvaluationTeamReviewerResults,
    studentTeamEmailList
  );

  const peerEvaluationStudentMarksByTeam = await getListStudentMarkData(
    avgCriteriaScoreByStudent,
    sumAvgCriteriaScoreByStudent,
    totalPeerEvaluationStudentCount,
    peerEvaluationTeamMark,
    maxMarkDecreaseStudent,
    maxMarkIncreaseStudent
  );

  const getReviewsByReviewer = async (
    peerEvaluationStudentMarksByTeam: IPeerEvaluationStudentMarksByTeam[]
  ): Promise<IPeerEvaluationStudentMarksByTeam[]> => {
    for (const reviewer of peerEvaluationStudentMarksByTeam) {
      reviewer.reviews = peerEvaluationTeamReviewerResults.filter(
        ({ reviewerEmail }) => reviewerEmail === reviewer.email
      );

      const peerEvaluationStudentDataReviewer = await prisma.peerEvaluationStudent.findFirst({
        select: {
          studentName: true,
          id: true,
        },
        where: {
          peerEvaluationId: {
            equals: peerEvaluationData?.id,
          },
          user: {
            email: {
              equals: reviewer.email,
            },
          },
        },
      });

      reviewer.studentId = peerEvaluationStudentDataReviewer?.id || "";

      reviewer.studentName = peerEvaluationStudentDataReviewer?.studentName || "";
    }

    return peerEvaluationStudentMarksByTeam;
  };

  const peerEvaluationStudentMarksByTeamWithReviews = await getReviewsByReviewer(peerEvaluationStudentMarksByTeam);

  return peerEvaluationStudentMarksByTeamWithReviews;
};

const updatePeerEvaluationStudentTeamResultsByStudent = async (
  data: IPeerEvaluationStudentMarksByTeam[],
  peerEvaluationId: string
) => {
  for (const studentTeamData of data) {
    const {
      email,
      averageCriteriaScore,
      averageCriteriaScoreByTeamMember,
      systemCalculatedMark,
      systemAdjustedMark,
      lecturerAdjustedMark,
      finalMark,
      comments,
    } = studentTeamData;

    const userId = await getUserIdByEmail(email);

    if (!userId) {
      throw "User does not exist.";
    }

    await updatePeerEvaluationStudentData(
      peerEvaluationId,
      userId,
      averageCriteriaScore,
      averageCriteriaScoreByTeamMember,
      systemCalculatedMark,
      systemAdjustedMark,
      lecturerAdjustedMark,
      finalMark,
      comments
    );
  }
};

const saveCalculatedResultsPeerEvaluationTeam = async (
  calculatedResults: IPeerEvaluationStudentMarksByTeam[],
  teamId: string
): Promise<void> => {
  await prisma.peerEvaluationStudentTeam.update({
    data: {
      calculatedResults: calculatedResults as unknown as Prisma.JsonArray,
    },
    where: {
      id: teamId,
    },
  });
};

export {
  getPeerEvaluationStudentMarksByTeam,
  getPeerEvaluationStudentTeamIdByName,
  saveCalculatedResultsPeerEvaluationTeam,
  updatePeerEvaluationStudentTeamResultsByStudent,
};

export type { IPeerEvaluationStudentMarksByTeam };
