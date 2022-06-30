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
    description: "Peer Evaluation code unique value",
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
class PeerEvaluationExistQuery {
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
  lecturerEmail!: string;
}

@Resolver()
class PeerEvaluationsByLecturerQuery {
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
                  equals: where.lecturerEmail,
                },
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: "asc",
      },
      include: {
        _count: {
          select: {
            peerEvaluationTeachingMembers: true,
            columns: true,
            peerEvaluationStudents: true,
            peerEvaluationStudentTeams: true,
          },
        },
      },
    });

    return result;
  }
}

@InputType({
  isAbstract: true,
  description: "Peer Evaluation dashboard input",
})
class PeerEvaluationDashboardWhereInput {
  @Field((_type) => String, {
    nullable: false,
    description: "Peer Evaluation id value",
  })
  peerEvaluationId!: string;
}

@ObjectType({
  isAbstract: true,
  description: "Peer Evaluation Dashboard Object",
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
    const { peerEvaluationId } = where;

    const peerEvaluationData = await ctx.prisma.peerEvaluation.findFirst({
      where: {
        id: peerEvaluationId,
      },
      include: {
        _count: {
          select: { peerEvaluationTeachingMembers: true, columns: true, peerEvaluationStudents: true },
        },
      },
    });

    const aggregatePeerEvaluationStudentReview = await ctx.prisma.peerEvaluationStudentReview.aggregate({
      _count: {
        id: true,
      },
      where: {
        isCompleted: {
          equals: true,
        },
        peerEvaluationStudent: {
          is: {
            peerEvaluationId: {
              equals: peerEvaluationId,
            },
          },
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
            peerEvaluationId: peerEvaluationId,
          },
        },
      },
    });

    const result = {
      ...(peerEvaluationData as PeerEvaluation),
      totalCompletedPeerEvaluations: aggregatePeerEvaluationStudentReview._count.id,
      totalPeerEvaluationTeams: peerEvaluationStudentTeamData._count.id,
    };

    return result;
  }
}

@InputType({
  isAbstract: true,
  description: "Peer Evaluation Student Team Exist Where Input",
})
class PeerEvaluationStudentTeamExistWhereInput {
  @Field((_type) => [String], {
    nullable: false,
    description: "Students email list",
  })
  emailList!: [string];

  @Field((_type) => String, {
    nullable: false,
    description: "Peer Evaluation ID",
  })
  peerEvaluationId!: string;
}

@ObjectType({
  isAbstract: true,
  description: "Peer Evaluation Student Team Exist Response",
})
class PeerEvaluationStudentTeamExistResponse {
  @Field((_type) => String, {
    nullable: false,
    description: "Student Email",
  })
  email: string | undefined;

  @Field((_type) => String, {
    nullable: true,
    description: "Student ID",
  })
  id: string | undefined;
}

@ObjectType({
  isAbstract: true,
  description: "Peer Evaluation Student Team Exist Input",
})
class PeerEvaluationStudentTeamExist {
  @Field((_type) => [PeerEvaluationStudentTeamExistResponse], {
    nullable: false,
    description: "List of student that exist on the peer evaluation",
  })
  studentList: [PeerEvaluationStudentTeamExistResponse] | [] = [];
}

@Resolver()
class PeerEvaluationStudentTeamExistQuery {
  @Query((_returns) => PeerEvaluationStudentTeamExist || null, {
    nullable: true,
  })
  async peerEvaluationStudentTeamExist(
    @Ctx() ctx: { prisma: PrismaClient },
    @Arg("where") where: PeerEvaluationStudentTeamExistWhereInput
  ): Promise<PeerEvaluationStudentTeamExist | null> {
    const listOfUsers = where.emailList;

    const getStudentsInPeerEvaluation = async () =>
      await ctx.prisma.peerEvaluationStudent.groupBy({
        by: ["userId"],
        where: {
          peerEvaluationId: {
            equals: where.peerEvaluationId,
          },
          user: {
            is: {
              email: {
                in: listOfUsers,
              },
            },
          },
        },
      });

    const peerEvaluationStudents = await getStudentsInPeerEvaluation();

    if (!peerEvaluationStudents.length) {
      return {
        studentList: [],
      };
    }

    const usersByEmailAndUserID = await ctx.prisma.user.groupBy({
      by: ["email", "id"],
      where: {
        email: {
          in: listOfUsers,
        },
      },
    });

    const listStudents = listOfUsers.map((studentEmail) => ({
      email: studentEmail,
      id: usersByEmailAndUserID.find(({ email }) => email === studentEmail)?.id,
    }));

    const listStudentsSanitized = listStudents.filter(({ id }) => id !== undefined);

    return {
      studentList: listStudentsSanitized as [PeerEvaluationStudentTeamExistResponse],
    };
  }
}

export {
  PeerEvaluationDashboard,
  PeerEvaluationDashboardQuery,
  PeerEvaluationDashboardWhereInput,
  PeerEvaluationExistQuery,
  PeerEvaluationExistResponse,
  PeerEvaluationsByLecturerQuery,
  PeerEvaluationsByLecturerWhereInput,
  PeerEvaluationStudentTeamExist,
  PeerEvaluationStudentTeamExistQuery,
};
