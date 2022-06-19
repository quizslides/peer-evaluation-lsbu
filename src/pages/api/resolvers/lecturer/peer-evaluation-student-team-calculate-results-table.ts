import { PrismaClient } from "@prisma/client";
import { Arg, Ctx, Field, InputType, Mutation, ObjectType, Resolver } from "type-graphql";

import { calculatePeerEvaluationStudentMark } from "@/utils/peer-evaluation/mark-calculation";

@InputType({
  isAbstract: true,
  description: "Peer Evaluation Student Team Calculated Results Table Where Input",
})
class PeerEvaluationStudentTeamCalculateResultsTableWhereInput {
  @Field((_type) => String, {
    nullable: false,
    description: "Peer Evaluation ID",
  })
  peerEvaluationId!: string;
}

@ObjectType({
  isAbstract: true,
  description: "Peer Evaluation Student Team Calculated Results Table Response",
})
class PeerEvaluationStudentTeamCalculateResultsTableResponse {
  @Field((_type) => Boolean, {
    nullable: false,
    description: "Completed successfully",
  })
  completed!: boolean;

  @Field((_type) => String, {
    nullable: false,
    description: "Message of the action updating students lecturer mark",
  })
  message!: string;

  @Field((_type) => Number, {
    nullable: false,
    description: "Code of the action updating students lecturer mark",
  })
  code!: number;
}

@Resolver()
class PeerEvaluationStudentTeamCalculateResultsTable {
  @Mutation((_returns) => PeerEvaluationStudentTeamCalculateResultsTableResponse)
  async peerEvaluationStudentTeamCalculateResultsTable(
    @Ctx() ctx: { prisma: PrismaClient },
    @Arg("where") where: PeerEvaluationStudentTeamCalculateResultsTableWhereInput
  ): Promise<PeerEvaluationStudentTeamCalculateResultsTableResponse> {
    const { peerEvaluationId } = where;

    const peerEvaluationStudentTeamsData = await ctx.prisma.peerEvaluationStudentTeam.findMany({
      select: {
        id: true,
      },
      where: {
        peerEvaluationId: {
          equals: peerEvaluationId,
        },
      },
    });

    for (const { id } of peerEvaluationStudentTeamsData) {
      await calculatePeerEvaluationStudentMark(peerEvaluationId, id);
    }

    return {
      code: 200,
      completed: true,
      message: "Peer evaluation updated successfully",
    };
  }
}

export {
  PeerEvaluationStudentTeamCalculateResultsTable,
  PeerEvaluationStudentTeamCalculateResultsTableResponse,
  PeerEvaluationStudentTeamCalculateResultsTableWhereInput,
};
