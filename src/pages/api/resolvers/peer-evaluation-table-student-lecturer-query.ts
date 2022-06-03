import { PeerEvaluation, PeerEvaluationStudentReview } from "@generated/type-graphql";
import { PrismaClient } from "@prisma/client";
import { Arg, Ctx, Field, InputType, ObjectType, Query, Resolver } from "type-graphql";

@InputType({
  isAbstract: true,
  description: "Peer Evaluation Table Student Where Input",
})
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

@ObjectType({
  isAbstract: true,
  description: "Peer Evaluation Table Student Response",
})
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
      where: {
        peerEvaluationId: peerEvaluationData?.id,
        userId: user?.id,
      },
    });

    if (!user || !peerEvaluationData) {
      return {
        readOnly: undefined,
        visible: undefined,
        message: "Peer Evaluation data does not exist",
        peerEvaluation: undefined,
        peerEvaluationStudentReview: undefined,
      };
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
            PeerEvaluationReviewees: true,
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
        PeerEvaluationReviewees: {
          orderBy: {
            studentReviewed: {
              id: "asc",
            },
          },
          select: {
            criteriaScoreTotal: true,
            studentReviewedId: true,
            comment: true,
            isInvalid: true,
            studentReviewed: {
              select: {
                user: {
                  select: {
                    name: true,
                    email: true,
                  },
                },
              },
            },
            peerEvaluationReviewId: true,
            PeerEvaluationRevieweeColumn: {
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

    return {
      readOnly: true,
      visible: true,
      message: "Peer Evaluation fetched successfully",
      peerEvaluation: peerEvaluationData,
      peerEvaluationStudentReview: peerEvaluationStudentReviewData,
    };
  }
}

export {
  PeerEvaluationTableStudentLecturerQuery,
  PeerEvaluationTableStudentLecturerResponse,
  PeerEvaluationTableStudentLecturerWhereInput,
};
