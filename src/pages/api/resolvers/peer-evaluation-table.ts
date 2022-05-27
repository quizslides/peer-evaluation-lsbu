import { PrismaClient } from "@prisma/client";
import { Arg, Ctx, Field, InputType, Mutation, ObjectType, Resolver } from "type-graphql";

@InputType({
  isAbstract: true,
  description: "Peer Evaluation Table Generation Input",
})
class PeerEvaluationTableGenerationWhereInput {
  @Field((_type) => String, {
    nullable: false,
    description: "Peer Evaluation ID",
  })
  peerEvaluationId!: string;
}

@ObjectType({
  isAbstract: true,
  description: undefined,
})
class PeerEvaluationTableGenerationResponse {
  @Field((_type) => Boolean, {
    nullable: true,
    description: "Peer Evaluations Table Created Successfully",
  })
  completed: boolean | undefined;
}

@Resolver()
class CreatePeerEvaluationTableGeneration {
  @Mutation((_returns) => PeerEvaluationTableGenerationResponse)
  async createPeerEvaluationTableGeneration(
    @Ctx() ctx: { prisma: PrismaClient },
    @Arg("where") where: PeerEvaluationTableGenerationWhereInput
  ): Promise<PeerEvaluationTableGenerationResponse> {
    const peerEvaluationId = where.peerEvaluationId;

    const peerEvaluation = await ctx.prisma.peerEvaluation.findFirst({
      where: {
        id: peerEvaluationId,
      },
      include: {
        PeerEvaluationStudentTeam: true,
        peerEvaluationStudents: true,
        columns: true,
      },
    });

    const peerEvaluationRevieweeColumns = peerEvaluation?.columns.map((column) => ({
      isInvalid: false,
      criteriaScore: 0,
      peerEvaluationColumn: {
        connect: {
          id_peerEvaluationId: {
            peerEvaluationId: peerEvaluationId,
            id: column.id,
          },
        },
      },
    }));

    if (peerEvaluation?.peerEvaluationStudents.length) {
      for (const students of peerEvaluation.peerEvaluationStudents) {
        const studentReviewerTeamId =
          peerEvaluation?.PeerEvaluationStudentTeam.find(({ id }) => id === students.peerEvaluationStudentTeamId)?.id ||
          "";

        const listPeerEvaluationRevieweesStudent = peerEvaluation.peerEvaluationStudents.filter(
          ({ peerEvaluationStudentTeamId }) => peerEvaluationStudentTeamId === studentReviewerTeamId
        );

        const listPeerEvaluationRevieweesStudentToCreate = listPeerEvaluationRevieweesStudent.map((revieweesData) => ({
          revieweeComment: "",
          criteriaScore: 0,
          studentReviewed: {
            connect: {
              userId_peerEvaluationId: {
                peerEvaluationId: peerEvaluationId,
                userId: revieweesData.userId,
              },
            },
          },
          PeerEvaluationRevieweeColumn: {
            create: peerEvaluationRevieweeColumns,
          },
        }));

        await ctx.prisma.peerEvaluationStudentReview.create({
          data: {
            isCompleted: false,
            peerEvaluationStudent: {
              connect: {
                userId_peerEvaluationId: {
                  peerEvaluationId: peerEvaluationId,
                  userId: students.userId,
                },
              },
            },
            PeerEvaluationReviewees: {
              create:
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                listPeerEvaluationRevieweesStudentToCreate as unknown as any,
            },
          },
        });
      }
    }

    return {
      completed: true,
    };
  }
}

export { CreatePeerEvaluationTableGeneration };
