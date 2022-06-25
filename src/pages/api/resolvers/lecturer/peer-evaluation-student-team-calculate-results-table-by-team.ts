import { PrismaClient } from "@prisma/client";
import { Arg, Ctx, Field, InputType, Mutation, ObjectType, Resolver } from "type-graphql";

import {
  calculatePeerEvaluationStudentMark,
  getPeerEvaluationStudentTeamIdByName,
} from "@/utils/peer-evaluation/mark-calculation";

@InputType({
  isAbstract: true,
  description: "Peer Evaluation Student Team Calculated Results Table Where Input",
})
class PeerEvaluationStudentTeamCalculateResultsTableByTeamWhereInput {
  @Field((_type) => String, {
    nullable: false,
    description: "Peer Evaluation ID",
  })
  peerEvaluationId!: string;

  @Field((_type) => String, {
    nullable: false,
    description: "Peer Evaluation Student Team Name",
  })
  peerEvaluationStudentTeamName!: string;
}

@ObjectType({
  isAbstract: true,
  description: "Peer Evaluation Student Team Calculated Results Table Response",
})
class PeerEvaluationStudentTeamCalculateResultsTableByTeamResponse {
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
class PeerEvaluationStudentTeamCalculateResultsTableByTeam {
  @Mutation((_returns) => PeerEvaluationStudentTeamCalculateResultsTableByTeamResponse)
  async peerEvaluationStudentTeamCalculateResultsTableByTeam(
    @Ctx() ctx: { prisma: PrismaClient },
    @Arg("where") where: PeerEvaluationStudentTeamCalculateResultsTableByTeamWhereInput
  ): Promise<PeerEvaluationStudentTeamCalculateResultsTableByTeamResponse> {
    const { peerEvaluationId, peerEvaluationStudentTeamName } = where;

    const peerEvaluationStudentTeamId = await getPeerEvaluationStudentTeamIdByName(
      peerEvaluationId,
      peerEvaluationStudentTeamName
    );

    if (peerEvaluationStudentTeamId) {
      await calculatePeerEvaluationStudentMark(peerEvaluationId, peerEvaluationStudentTeamId);
    }

    return {
      code: 200,
      completed: true,
      message: "Peer evaluation updated successfully",
    };
  }
}

export {
  PeerEvaluationStudentTeamCalculateResultsTableByTeam,
  PeerEvaluationStudentTeamCalculateResultsTableByTeamResponse,
  PeerEvaluationStudentTeamCalculateResultsTableByTeamWhereInput,
};
