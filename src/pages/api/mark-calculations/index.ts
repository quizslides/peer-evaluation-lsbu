import type { NextApiRequest, NextApiResponse } from "next";

import prisma from "@/pages/api/prisma";

const getPeerEvaluationMarkCalculation = async (peerEvaluationCode: string, teamName: string) => {
  type TPeerEvaluationTeamReviewersResult = {
    reviewerName: string;
    reviewerEmail: string;
    revieweeName: string;
    revieweeEmail: string;
    criteriaScoreTotal: number | null;
    comment: string | null;
    isInvalid: boolean;
  };

  const peerEvaluationData = await prisma.peerEvaluation.findFirst({
    select: {
      id: true,
      maxMarkDecrease: true,
      maxMarkIncrease: true,
    },
    where: {
      code: {
        equals: peerEvaluationCode,
      },
    },
  });

  const peerEvaluationTeamData = await prisma.peerEvaluationStudentTeam.findFirst({
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
              isInvalid: true,
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
            },
          },
        },
      },
    },
    where: {
      peerEvaluationId: peerEvaluationData?.id,
      name: teamName,
    },
  });

  const teamMark = Number(peerEvaluationTeamData?.mark);

  const maxMarkIncreaseStudent = teamMark + (peerEvaluationData?.maxMarkIncrease || 0);

  const maxMarkDecreaseStudent =
    teamMark - (peerEvaluationData?.maxMarkDecrease || 0) < 0
      ? 0
      : teamMark - (peerEvaluationData?.maxMarkDecrease || 0);

  const studentTeamEmailList = peerEvaluationTeamData?.peerEvaluationStudentList.flatMap(
    ({ user: { email } }) => email
  ) as string[];

  const avgCriteriaScoreByStudent = [];

  let sumAvgCriteriaScoreByStudent = 0;

  const totalCountStudent = studentTeamEmailList.length;

  if (peerEvaluationTeamData) {
    const peerEvaluationTeamReviewersResult: TPeerEvaluationTeamReviewersResult[] =
      peerEvaluationTeamData &&
      peerEvaluationTeamData.peerEvaluationStudentList.flatMap((student) =>
        student.PeerEvaluationReviewees.map(({ criteriaScoreTotal, comment, isInvalid, peerEvaluationReview }) => ({
          reviewerName: peerEvaluationReview?.peerEvaluationStudent.user.name || "",
          reviewerEmail: peerEvaluationReview?.peerEvaluationStudent.user.email || "",
          revieweeName: student.user.name,
          revieweeEmail: student.user.email,
          criteriaScoreTotal,
          comment,
          isInvalid,
        }))
      );

    for (const email of studentTeamEmailList) {
      const listRevieweesData = peerEvaluationTeamReviewersResult.filter(
        ({ revieweeEmail, isInvalid }) => revieweeEmail === email && isInvalid === false
      );

      const criteriaScoreTotalSum = listRevieweesData.reduce(
        (sum, { criteriaScoreTotal }) => sum + (criteriaScoreTotal || 0),
        0
      );

      const totalValidSubmissions = listRevieweesData.filter(
        ({ criteriaScoreTotal }) => criteriaScoreTotal !== null
      ).length;

      const listCommentsByReviewer = listRevieweesData
        .map((data) => `- ${data.reviewerEmail}: ${data.comment !== null ? data.comment : "N/A"}\n`)
        .join("");

      const listCommentsByReviewerSanitized = listCommentsByReviewer.slice(0, listCommentsByReviewer.lastIndexOf("\n"));

      const avgCriteriaScoreStudent = criteriaScoreTotalSum / totalValidSubmissions;

      sumAvgCriteriaScoreByStudent = sumAvgCriteriaScoreByStudent + avgCriteriaScoreStudent;

      avgCriteriaScoreByStudent.push({
        email,
        averageCriteriaScore: avgCriteriaScoreStudent,
        comments: listCommentsByReviewerSanitized,
      });
    }

    const studentMarkDataList = avgCriteriaScoreByStudent.map((data) => {
      const averageCriteriaScoreByTeamMember = data.averageCriteriaScore / sumAvgCriteriaScoreByStudent;

      const systemCalculatedMark = averageCriteriaScoreByTeamMember * totalCountStudent * teamMark;

      let systemAdjustedMark = null;

      if (systemCalculatedMark < maxMarkDecreaseStudent) {
        systemAdjustedMark = maxMarkDecreaseStudent;
      } else if (systemCalculatedMark > maxMarkIncreaseStudent) {
        systemAdjustedMark = maxMarkIncreaseStudent;
      } else {
        systemAdjustedMark = systemCalculatedMark;
      }

      return {
        ...data,
        averageCriteriaScoreByTeamMember,
        systemCalculatedMark,
        systemAdjustedMark,
      };
    });

    return studentMarkDataList;
  }
};

const getPeerEvaluationCode = async (peerEvaluationId: string) => {
  const peerEvaluationData = await prisma.peerEvaluation.findFirst({
    select: {
      code: true,
    },
    where: {
      id: {
        equals: peerEvaluationId,
      },
    },
  });

  return peerEvaluationData?.code;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { teamName, peerEvaluationId } = req.body;

  const peerEvaluationCode = await getPeerEvaluationCode(peerEvaluationId);

  const response = await getPeerEvaluationMarkCalculation(peerEvaluationCode || "", teamName);

  res.json(response);
}
