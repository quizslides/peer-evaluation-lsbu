import "reflect-metadata";
import { PeerEvaluation } from "@generated/type-graphql";
import { PrismaClient } from "@prisma/client";
import { Arg, Ctx, Field, InputType, ObjectType, Query, Resolver } from "type-graphql";

@InputType({
  isAbstract: true,
  description: "PeerEvaluation exist input",
})
class PeerEvaluationExistWhereInput {
  @Field((_type) => String, {
    nullable: false,
    description: "PeerEvaluation code unique value",
  })
  code!: string;
}

@ObjectType({
  isAbstract: true,
  description: undefined,
})
class PeerEvaluationExistResponse {
  @Field((_type) => Boolean, {
    nullable: true,
    description: undefined,
  })
  exist: boolean | undefined;
}

@Resolver()
class PeerEvaluationExist {
  @Query((_returns) => PeerEvaluationExistResponse)
  async peerEvaluationExist(
    @Ctx() ctx: { prisma: PrismaClient },
    @Arg("where") where: PeerEvaluationExistWhereInput
  ): Promise<PeerEvaluationExistResponse> {
    const result = await ctx.prisma.peerEvaluation.findFirst({
      where: {
        code: where.code,
      },
    });

    return {
      exist: !!result,
    };
  }
}

@InputType({
  isAbstract: true,
  description: "Peer Evaluations by Lecturer input",
})
class PeerEvaluationsByLecturerWhereInput {
  @Field((_type) => String, {
    nullable: false,
    description: "Lecturer email",
  })
  email!: string;
}

@Resolver()
class PeerEvaluationsByLecturer {
  @Query((_returns) => [PeerEvaluation])
  async peerEvaluationsByLecturer(
    @Ctx() ctx: { prisma: PrismaClient },
    @Arg("where") where: PeerEvaluationsByLecturerWhereInput
  ): Promise<PeerEvaluation[]> {
    const result = await ctx.prisma.peerEvaluation.findMany({
      where: {
        peerEvaluationTeachingMembers: {
          some: {
            user: {
              is: {
                email: {
                  equals: where.email,
                },
              },
            },
          },
        },
      },
      include: {
        _count: {
          select: {
            peerEvaluationTeachingMembers: true,
            columns: true,
            peerEvaluationStudents: true,
            PeerEvaluationStudentTeam: true,
          },
        },
      },
    });

    return result;
  }
}

@InputType({
  isAbstract: true,
  description: "PeerEvaluation dashboard input",
})
class PeerEvaluationDashboardWhereInput {
  @Field((_type) => String, {
    nullable: false,
    description: "PeerEvaluation id value",
  })
  id!: string;
}

@ObjectType({
  isAbstract: true,
  description: "PeerEvaluation Dashboard Object",
})
class PeerEvaluationDashboard extends PeerEvaluation {
  @Field((_type) => Number, {
    nullable: true,
    description: undefined,
  })
  totalCompletedPeerEvaluations: number | undefined;

  @Field((_type) => Number, {
    nullable: true,
    description: undefined,
  })
  totalPeerEvaluationTeams: number | undefined;
}

@Resolver()
class PeerEvaluationDashboardQuery {
  @Query((_returns) => PeerEvaluationDashboard || null, {
    nullable: true,
  })
  async peerEvaluationDashboard(
    @Ctx() ctx: { prisma: PrismaClient },
    @Arg("where") where: PeerEvaluationDashboardWhereInput
  ): Promise<PeerEvaluationDashboard | null> {
    const peerEvaluationData = await ctx.prisma.peerEvaluation.findFirst({
      where: {
        id: where.id,
      },
      include: {
        _count: {
          select: { peerEvaluationTeachingMembers: true, columns: true, peerEvaluationStudents: true },
        },
      },
    });

    const peerEvaluationRevieweeData = await ctx.prisma.peerEvaluationReviewee.aggregate({
      _count: {
        id: true,
      },
      where: {
        peerEvaluationReview: {
          isCompleted: true,
        },
        studentReviewed: {
          peerEvaluationId: where.id,
        },
      },
    });

    const peerEvaluationStudentTeamData = await ctx.prisma.peerEvaluationStudentTeam.aggregate({
      _count: {
        id: true,
      },
      where: {
        peerEvaluationStudentList: {
          every: {
            peerEvaluationId: where.id,
          },
        },
      },
    });

    const result = {
      ...(peerEvaluationData as PeerEvaluation),
      totalCompletedPeerEvaluations: peerEvaluationRevieweeData._count.id,
      totalPeerEvaluationTeams: peerEvaluationStudentTeamData._count.id,
    };

    return result;
  }
}

export {
  PeerEvaluationDashboard,
  PeerEvaluationDashboardQuery,
  PeerEvaluationDashboardWhereInput,
  PeerEvaluationExist,
  PeerEvaluationExistResponse,
  PeerEvaluationsByLecturer,
  PeerEvaluationsByLecturerWhereInput,
};
