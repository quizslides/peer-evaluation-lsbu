import "reflect-metadata";
import { Module } from "@generated/type-graphql";
import { PrismaClient } from "@prisma/client";
import { Arg, Ctx, Field, InputType, ObjectType, Query, Resolver } from "type-graphql";

@InputType({
  isAbstract: true,
  description: "Module exist input",
})
class ModuleExistWhereInput {
  @Field((_type) => String, {
    nullable: false,
    description: "Module code unique value",
  })
  moduleCode!: string;
}

@ObjectType({
  isAbstract: true,
  description: undefined,
})
class ModuleExistResponse {
  @Field((_type) => Boolean, {
    nullable: true,
    description: undefined,
  })
  exist: boolean | undefined;
}

@Resolver()
class ModuleExist {
  @Query((_returns) => ModuleExistResponse)
  async moduleExist(
    @Ctx() ctx: { prisma: PrismaClient },
    @Arg("where") where: ModuleExistWhereInput
  ): Promise<ModuleExistResponse> {
    const result = await ctx.prisma.module.findFirst({
      where: {
        moduleCode: where.moduleCode,
      },
    });

    return {
      exist: !!result,
    };
  }
}

@InputType({
  isAbstract: true,
  description: "Modules by Lecturer input",
})
class ModulesByLecturerWhereInput {
  @Field((_type) => String, {
    nullable: false,
    description: "Lecturers email",
  })
  email!: string;
}

@Resolver()
class ModulesByLecturer {
  @Query((_returns) => [Module])
  async moduleByLecturer(
    @Ctx() ctx: { prisma: PrismaClient },
    @Arg("where") where: ModulesByLecturerWhereInput
  ): Promise<Module[]> {
    const result = await ctx.prisma.module.findMany({
      where: {
        moduleMembers: {
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
          select: { moduleMembers: true, columns: true, students: true },
        },
      },
    });

    return result;
  }
}

export { ModuleExist, ModuleExistResponse, ModulesByLecturer, ModulesByLecturerWhereInput };
