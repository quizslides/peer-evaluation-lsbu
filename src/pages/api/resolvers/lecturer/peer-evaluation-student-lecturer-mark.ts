import { PrismaClient } from "@prisma/client";
import { Arg, Ctx, Field, InputType, Mutation, ObjectType, Resolver } from "type-graphql";

import { getMarkSanitized } from "@/utils/peer-evaluation/mark-calculation/utils";

@InputType("PeerEvaluationStudentsLecturerMarkInput")
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

@InputType("PeerEvaluationStudentsLecturerMarkInputData")
class PeerEvaluationStudentsLecturerMarkInputData {
  @Field((_type) => [PeerEvaluationStudentsLecturerMarkInput], {
    nullable: true,
    description: "Peer Evaluation Students Lecturer Mark Input Data",
  })
  peerEvaluationStudentsLecturerMarkData!: PeerEvaluationStudentsLecturerMarkInput[];
}

@ObjectType("PeerEvaluationStudentsLecturerMarkResponse")
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
      const lecturerAdjustedMarkSanitized = getMarkSanitized(lecturerAdjustedMark);

      await ctx.prisma.peerEvaluationStudent.updateMany({
        data: {
          lecturerAdjustedMark: lecturerAdjustedMarkSanitized,
          finalMark: lecturerAdjustedMarkSanitized,
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
          peerEvaluationStudentTeam: {
            select: {
              mark: true,
            },
          },
        },
        where: {
          id,
        },
      });

      const systemAdjustedMark = peerEvaluationStudentData?.systemAdjustedMark;

      const peerEvaluationStudentTeamMark = peerEvaluationStudentData?.peerEvaluationStudentTeam?.mark;

      await ctx.prisma.peerEvaluationStudent.updateMany({
        data: {
          systemAdjustedMark,
          lecturerAdjustedMark: null,
          finalMark: systemAdjustedMark !== null ? systemAdjustedMark : peerEvaluationStudentTeamMark,
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
