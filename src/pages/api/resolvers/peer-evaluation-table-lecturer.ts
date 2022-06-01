import { PrismaClient } from "@prisma/client";
import { Arg, Ctx, Field, InputType, Mutation, ObjectType, Resolver } from "type-graphql";

@InputType({
  isAbstract: true,
  description: "Update Insert Peer Evaluation Table Where Input",
})
class UpsertPeerEvaluationTableLecturerWhereInput {
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
class UpsertPeerEvaluationTableLecturerResponse {
  @Field((_type) => Boolean, {
    nullable: true,
    description: "Peer Evaluations Table Updated and Inserted Successfully",
  })
  completed: boolean | undefined;
}

@Resolver()
class UpsertPeerEvaluationTableLecturer {
  @Mutation((_returns) => UpsertPeerEvaluationTableLecturerResponse)
  async upsertPeerEvaluationTableLecturer(
    @Ctx() ctx: { prisma: PrismaClient },
    @Arg("where") where: UpsertPeerEvaluationTableLecturerWhereInput
  ): Promise<UpsertPeerEvaluationTableLecturerResponse> {
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
      criteriaScore: null,
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
          isInvalid: false,
          comment: null,
          criteriaScoreTotal: null,
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

export { UpsertPeerEvaluationTableLecturer };
