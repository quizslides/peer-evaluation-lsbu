import { PrismaClient } from "@prisma/client";
import { Arg, Ctx, Field, InputType, Mutation, ObjectType, Resolver } from "type-graphql";

import { onCreatePeerEvaluationStudentBulk } from "@/utils/peer-evaluation/student/create";

@InputType("PeerEvaluationCreateStudentBulk")
class PeerEvaluationCreateStudentBulk {
  @Field((_type) => String, {
    nullable: false,
    description: "Peer Evaluation Student Email",
  })
  studentEmail!: string;

  @Field((_type) => String, {
    nullable: false,
    description: "Peer Evaluation Student Team Name",
  })
  studentTeamName!: string;
}

@InputType("PeerEvaluationCreateStudentBulkInput")
class PeerEvaluationCreateStudentBulkInput {
  @Field((_type) => [PeerEvaluationCreateStudentBulk], {
    nullable: true,
    description: "List of Peer Evaluation Create Student Bulk Object",
  })
  createStudentBulkData!: PeerEvaluationCreateStudentBulk[];

  @Field((_type) => String, {
    nullable: true,
    description: "Peer Evaluation ID",
  })
  peerEvaluationId!: string;
}

@ObjectType("PeerEvaluationCreateStudentBulkResponse")
class PeerEvaluationCreateStudentBulkResponse {
  @Field((_type) => Boolean, {
    nullable: false,
    description: "Bulk Process Successfully",
  })
  processSuccessfully!: boolean;
}

@Resolver()
class PeerEvaluationCreateStudentBulkMutationResolver {
  @Mutation((_returns) => PeerEvaluationCreateStudentBulkResponse)
  async createPeerEvaluationStudentBulk(
    @Ctx() ctx: { prisma: PrismaClient },
    @Arg("data") data: PeerEvaluationCreateStudentBulkInput
  ): Promise<PeerEvaluationCreateStudentBulkResponse> {
    const { peerEvaluationId, createStudentBulkData } = data;

    await onCreatePeerEvaluationStudentBulk(peerEvaluationId, createStudentBulkData);

    return {
      processSuccessfully: true,
    };
  }
}

export {
  PeerEvaluationCreateStudentBulk,
  PeerEvaluationCreateStudentBulkInput,
  PeerEvaluationCreateStudentBulkMutationResolver,
};
