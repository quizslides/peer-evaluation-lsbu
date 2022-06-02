import { PrismaClient } from "@prisma/client";
import { Arg, Ctx, Field, InputType, Mutation, ObjectType, Resolver } from "type-graphql";

@InputType({ description: "Peer Evaluation Students Lecturer Mark Input" })
class PeerEvaluationStudentsLecturerMarkInput {
  @Field((_type) => String, {
    nullable: false,
    description: "Peer Evaluation Students ID",
  })
  id!: string;

  @Field((_type) => Number, {
    nullable: true,
    description: "Peer Evaluation is completed",
  })
  lecturerAdjustedMark!: number | null;
}

@InputType({
  isAbstract: true,
  description: "Update Peer Evaluation Table Students Data Input",
})
class PeerEvaluationStudentsLecturerMarkInputData {
  @Field((_type) => [PeerEvaluationStudentsLecturerMarkInput], {
    nullable: true,
    description: "Peer Evaluation Students Lecturer Mark Input Data",
  })
  peerEvaluationStudentsLecturerMarkData!: PeerEvaluationStudentsLecturerMarkInput[];
}

@ObjectType({
  isAbstract: true,
  description: "Peer Evaluation Table Students Response",
})
class PeerEvaluationStudentsLecturerMarkResponse {
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
class PeerEvaluationStudentsLecturerMark {
  @Mutation((_returns) => PeerEvaluationStudentsLecturerMarkResponse)
  async updatePeerEvaluationStudentsLecturerMark(
    @Ctx() ctx: { prisma: PrismaClient },
    @Arg("where") where: PeerEvaluationStudentsLecturerMarkInputData
  ): Promise<PeerEvaluationStudentsLecturerMarkResponse> {
    const updateFinalMark = async (id: string, lecturerAdjustedMark: number) => {
      await ctx.prisma.peerEvaluationStudent.update({
        data: {
          lecturerAdjustedMark,
          finalMark: lecturerAdjustedMark,
        },
        where: {
          id,
        },
      });
    };

    const updateSystemAdjustedMark = async (id: string) => {
      const peerEvaluationStudentData = await ctx.prisma.peerEvaluationStudent.findFirst({
        select: {
          systemAdjustedMark: true,
        },
        where: {
          id,
        },
      });

      const systemAdjustedMark = peerEvaluationStudentData?.systemAdjustedMark;

      await ctx.prisma.peerEvaluationStudent.update({
        data: {
          systemAdjustedMark,
          lecturerAdjustedMark: null,
          finalMark: systemAdjustedMark,
        },
        where: {
          id,
        },
      });
    };

    for (const { id, lecturerAdjustedMark } of where.peerEvaluationStudentsLecturerMarkData) {
      if (lecturerAdjustedMark) {
        await updateFinalMark(id, lecturerAdjustedMark);
      } else {
        await updateSystemAdjustedMark(id);
      }
    }

    return {
      code: 200,
      completed: true,
      message: "Peer evaluation updated successfully",
    };
  }
}

export {
  PeerEvaluationStudentsLecturerMark,
  PeerEvaluationStudentsLecturerMarkInput,
  PeerEvaluationStudentsLecturerMarkInputData,
  PeerEvaluationStudentsLecturerMarkResponse,
};
