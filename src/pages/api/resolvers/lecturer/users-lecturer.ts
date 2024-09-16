import { User } from "@generated/type-graphql";
import { PrismaClient } from "@prisma/client";
import { Ctx, Query, Resolver } from "type-graphql";

@Resolver()
class UsersLecturer {
  // @ts-ignore
  @Query((_returns) => [User] || null, {
    nullable: true,
  })
  async usersLecturer(@Ctx() ctx: { prisma: PrismaClient }): Promise<User[] | null> {
    try {
      const users = await ctx.prisma.user.findMany({
        where: {
          role: {
            in: ["LECTURER"],
          },
        },
        orderBy: [
          {
            createdAt: "asc",
          },
        ],
      });

      return users;
    } catch {
      return null;
    }
  }
}

export { UsersLecturer };
