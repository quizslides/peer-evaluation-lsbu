import { PeerEvaluation, PeerEvaluationStudentReview } from "@generated/type-graphql";
import { PrismaClient } from "@prisma/client";
import { Arg, Ctx, Field, InputType, ObjectType, Query, Resolver } from "type-graphql";

import { PeerEvaluationTableStudentInfoResponse } from "@/pages/api/resolvers/student/peer-evaluation-table-student-query";
import { getDateLocaleString } from "@/utils/date";
import { isPeerEvaluationStudentTableExists } from "@/utils/peer-evaluation/student";
import { createPeerEvaluationStudentTableByStudent } from "@/utils/peer-evaluation/student/create";

@InputType("PeerEvaluationTableStudentLecturerWhereInput")
class PeerEvaluationTableStudentLecturerWhereInput {
  @Field((_type) => String, {
    nullable: false,
    description: "Peer Evaluation ID",
  })
  peerEvaluationId!: string;

  @Field((_type) => String, {
    nullable: false,
    description: "User ID",
  })
  studentId!: string;
}

@ObjectType("PeerEvaluationTableStudentLecturerResponse")
class PeerEvaluationTableStudentLecturerResponse {
  @Field((_type) => Boolean, {
    nullable: true,
    description: "Peer Evaluation Table is Read Only",
  })
  readOnly: boolean | undefined;

  @Field((_type) => Boolean, {
    nullable: true,
    description: "Peer Evaluation is visible",
  })
  visible: boolean | undefined;

  @Field((_type) => String, {
    nullable: false,
    description: "Peer Evaluation notification message",
  })
  message: string = "";

  @Field((_type) => PeerEvaluation, {
    nullable: true,
    description: "Peer Evaluation Student Review Data",
  })
  peerEvaluation: PeerEvaluation | undefined;

  @Field((_type) => PeerEvaluationStudentReview, {
    nullable: true,
    description: "Peer Evaluation Student Review Data",
  })
  peerEvaluationStudentReview: PeerEvaluationStudentReview | undefined;

  @Field((_type) => PeerEvaluationTableStudentInfoResponse, {
    nullable: true,
    description: "Peer Evaluation Student Info Data",
  })
  peerEvaluationStudentInfo: PeerEvaluationTableStudentInfoResponse | undefined;
}

@Resolver()
class PeerEvaluationTableStudentLecturerQuery {
  @Query((_returns) => PeerEvaluationTableStudentLecturerResponse)
  async peerEvaluationTableStudentLecturer(
    @Ctx() ctx: { prisma: PrismaClient },
    @Arg("where") where: PeerEvaluationTableStudentLecturerWhereInput
  ): Promise<PeerEvaluationTableStudentLecturerResponse> {
    const peerEvaluationId = where.peerEvaluationId;

    const studentId = where.studentId;

    const peerEvaluationData = (await ctx.prisma.peerEvaluation.findFirst({
      select: {
        title: true,
        code: true,
        id: true,
        status: true,
        columns: true,
        criteriaScoreRangeMin: true,
        criteriaScoreRangeMax: true,
        submissionsLockDate: true,
        instructions: true,
        scaleExplanation: true,
      },
      where: {
        id: {
          equals: peerEvaluationId,
        },
      },
    })) as PeerEvaluation;

    const studentData = await ctx.prisma.peerEvaluationStudent.findFirst({
      select: {
        userId: true,
      },
      where: {
        id: studentId,
      },
    });

    const user = await ctx.prisma.user.findFirst({
      where: {
        id: studentData?.userId || "",
      },
    });

    const peerEvaluationStudentList = await ctx.prisma.peerEvaluationStudent.findFirst({
      select: {
        id: true,
        updatedAt: true,
        studentName: true,
        peerEvaluationStudentTeam: true,
        peerEvaluation: true,
        user: {
          select: {
            email: true,
          },
        },
      },
      where: {
        peerEvaluationId: peerEvaluationData?.id,
        userId: user?.id,
      },
    });

    const isPeerEvaluationStudentTableExistsData = await isPeerEvaluationStudentTableExists(studentId);

    if (!user || !peerEvaluationData || !peerEvaluationStudentList) {
      return {
        readOnly: undefined,
        visible: undefined,
        message: "Peer Evaluation student table is not available or does not exist",
        peerEvaluation: undefined,
        peerEvaluationStudentReview: undefined,
        peerEvaluationStudentInfo: undefined,
      };
    }

    if (!isPeerEvaluationStudentTableExistsData) {
      await createPeerEvaluationStudentTableByStudent(user.id, peerEvaluationData.id);
    }

    const peerEvaluationStudentId = peerEvaluationStudentList?.id;

    const peerEvaluationStudentReviewData = (await ctx.prisma.peerEvaluationStudentReview.findFirst({
      select: {
        id: true,
        peerEvaluationStudentId: true,
        isCompleted: true,
        updatedAt: true,
        createdAt: true,
        _count: {
          select: {
            peerEvaluationReviewees: true,
          },
        },
        peerEvaluationStudent: {
          include: {
            user: {
              select: {
                role: true,
                email: true,
                name: true,
                id: true,
              },
            },
            peerEvaluation: {
              select: {
                title: true,
                criteriaScoreRangeMin: true,
                criteriaScoreRangeMax: true,
                code: true,
                id: true,
                status: true,
                columns: true,
              },
            },
          },
        },
        peerEvaluationReviewees: {
          orderBy: {
            studentReviewed: {
              studentName: "asc",
            },
          },
          select: {
            criteriaScoreTotal: true,
            studentReviewedId: true,
            comment: true,
            isValid: true,
            studentReviewed: {
              select: {
                user: {
                  select: {
                    name: true,
                    email: true,
                  },
                },
                studentName: true,
              },
            },
            peerEvaluationReviewId: true,
            peerEvaluationRevieweeColumns: {
              select: {
                peerEvaluationColumnId: true,
                criteriaScore: true,
                updatedAt: true,
                createdAt: true,
                id: true,
                peerEvaluationRevieweeId: true,
              },
            },
          },
        },
      },
      where: {
        peerEvaluationStudentId: peerEvaluationStudentId,
      },
    })) as PeerEvaluationStudentReview;

    const peerEvaluationStudentTableInfo = await ctx.prisma.peerEvaluationStudentReview.findFirst({
      select: {
        createdAt: true,
        isCompleted: true,
        updatedByStudentAt: true,
      },
      where: {
        peerEvaluationStudentId: peerEvaluationStudentId,
      },
    });

    const getPeerEvaluationStudentReviewUpdateDate = (
      createdAt: Date | undefined | null,
      updatedByStudentAt: Date | undefined | null
    ) => {
      if (!createdAt || !updatedByStudentAt || updatedByStudentAt.toISOString() === createdAt.toISOString()) {
        return "N/A";
      }

      return getDateLocaleString(updatedByStudentAt);
    };

    const peerEvaluationStudentInfo = {
      studentName: peerEvaluationStudentList.studentName,
      studentEmail: peerEvaluationStudentList.user.email,
      submissionsLockDate: peerEvaluationStudentList.peerEvaluation.submissionsLockDate
        ? getDateLocaleString(peerEvaluationStudentList.peerEvaluation.submissionsLockDate)
        : "N/A",
      studentTeamName: peerEvaluationStudentList.peerEvaluationStudentTeam?.name || "",
      updatedAt: getPeerEvaluationStudentReviewUpdateDate(
        peerEvaluationStudentTableInfo?.createdAt,
        peerEvaluationStudentTableInfo?.updatedByStudentAt
      ),
      isCompleted: !!peerEvaluationStudentTableInfo?.isCompleted,
    };

    return {
      readOnly: true,
      visible: true,
      message: "Peer Evaluation table fetched successfully",
      peerEvaluation: peerEvaluationData,
      peerEvaluationStudentReview: peerEvaluationStudentReviewData,
      peerEvaluationStudentInfo: peerEvaluationStudentInfo,
    };
  }
}

export {
  PeerEvaluationTableStudentLecturerQuery,
  PeerEvaluationTableStudentLecturerResponse,
  PeerEvaluationTableStudentLecturerWhereInput,
};
