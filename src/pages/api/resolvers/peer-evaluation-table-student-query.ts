import { PeerEvaluation, PeerEvaluationStudentReview } from "@generated/type-graphql";
import { PeerEvaluationStatuses, PrismaClient, UserRoles } from "@prisma/client";
import { Arg, Ctx, Field, InputType, ObjectType, Query, Resolver } from "type-graphql";

const getIsPeerEvaluationReadOnly = (role: UserRoles | undefined, status: PeerEvaluationStatuses | undefined) => {
  if ((role === "STUDENT" && status === "PUBLISHED") || role !== "STUDENT") {
    return false;
  }

  return true;
};

@InputType({
  isAbstract: true,
  description: "Peer Evaluation Table Student Where Input",
})
class PeerEvaluationTableStudentWhereInput {
  @Field((_type) => String, {
    nullable: false,
    description: "Peer Evaluation code unique value",
  })
  peerEvaluationCode!: string;

  @Field((_type) => String, {
    nullable: false,
    description: "User ID",
  })
  userId!: string;
}

@ObjectType({
  isAbstract: true,
  description: "Peer Evaluation Table Student Response",
})
class PeerEvaluationTableStudentResponse {
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
class PeerEvaluationTableStudentQuery {
  @Query((_returns) => PeerEvaluationTableStudentResponse)
  async peerEvaluationTableStudent(
    @Ctx() ctx: { prisma: PrismaClient },
    @Arg("where") where: PeerEvaluationTableStudentWhereInput
  ): Promise<PeerEvaluationTableStudentResponse> {
    const peerEvaluationCode = where.peerEvaluationCode;

    const studentId = where.userId;

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
        code: {
          equals: peerEvaluationCode,
        },
      },
    })) as PeerEvaluation;

    const user = await ctx.prisma.user.findFirst({
      where: {
        id: studentId,
      },
    });

    const peerEvaluationStudentList = await ctx.prisma.peerEvaluationStudent.findFirst({
      where: {
        peerEvaluationId: peerEvaluationData?.id,
      },
    });

    if (!user || !peerEvaluationData) {
      return {
        readOnly: undefined,
        visible: undefined,
        message: "Peer Evaluation Table is not available",
        peerEvaluation: undefined,
        peerEvaluationStudentReview: undefined,
      };
    }

    const peerEvaluationStudentId = peerEvaluationStudentList?.id;

    const isPeerEvaluationVisible = peerEvaluationData?.status !== "DRAFT";

    const isPeerEvaluationReadOnly = getIsPeerEvaluationReadOnly(user?.role, peerEvaluationData?.status);

    if (!isPeerEvaluationVisible) {
      return {
        visible: isPeerEvaluationVisible,
        readOnly: undefined,
        message: "Peer Evaluation Table is not visible",
        peerEvaluation: undefined,
        peerEvaluationStudentReview: undefined,
      };
    }

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
      readOnly: isPeerEvaluationReadOnly,
      visible: isPeerEvaluationVisible,
      message: "Peer Evaluation fetched successfully",
      peerEvaluation: peerEvaluationData,
      peerEvaluationStudentReview: peerEvaluationStudentReviewData,
    };
  }
}

export { PeerEvaluationTableStudentQuery, PeerEvaluationTableStudentResponse, PeerEvaluationTableStudentWhereInput };
