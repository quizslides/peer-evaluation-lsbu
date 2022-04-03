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
          select: { peerEvaluationTeachingMembers: true, columns: true, peerEvaluationStudents: true },
        },
      },
    });

    return result;
  }
}

export {
  PeerEvaluationExist,
  PeerEvaluationExistResponse,
  PeerEvaluationsByLecturer,
  PeerEvaluationsByLecturerWhereInput,
};
