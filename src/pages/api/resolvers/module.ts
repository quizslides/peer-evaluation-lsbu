import "reflect-metadata";
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

export { ModuleExist, ModuleExistResponse };
