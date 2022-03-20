import { ServerResponse } from "http";

import { ModuleWhereInput, ModuleWhereUniqueInput } from "@generated/type-graphql";
import { PrismaClient } from "@prisma/client";
import * as Sentry from "@sentry/nextjs";
import { ApolloError } from "apollo-server-errors";
import { MicroRequest } from "apollo-server-micro/dist/types";
import { allow, deny, or, rule, shield } from "graphql-shield";
import { getSession } from "next-auth/react";

import { ModulesByLecturerWhereInput } from "../resolvers/module";

import { Role } from "@/utils/permissions";

export interface Context {
  prisma: PrismaClient;
  res: ServerResponse;
  req: MicroRequest;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const isAuthenticated = rule({ cache: "contextual" })(async (_parent, _args, { req }: Context) => {
  const session = await getSession({ req });
  return Boolean(session);
});

const isAdmin = rule({ cache: "contextual" })(async (_parent, _args, { req }: Context) => {
  const session = await getSession({ req });

  if (session?.user.role === Role.ADMIN) {
    return true;
  }

  return false;
});

const isLecturer = rule({ cache: "contextual" })(async (_parent, _args, { req }: Context) => {
  const session = await getSession({ req });

  if (session?.user.role === Role.LECTURER) {
    return true;
  }

  return false;
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const isStudent = rule({ cache: "contextual" })(async (_parent, _args, { req }: Context) => {
  const session = await getSession({ req });

  if (session?.user.role === Role.STUDENT) {
    return true;
  }

  return false;
});

const isModuleTeachingMember = rule({ cache: "contextual" })(
  async (_parent, _args: { where: ModuleWhereInput }, { req, prisma }: Context) => {
    const session = await getSession({ req });

    const moduleId = _args.where.id as unknown as string;

    if (moduleId && session?.user.email) {
      const result = await prisma.module.findFirst({
        where: {
          moduleTeachingMembers: {
            some: {
              user: {
                is: {
                  email: {
                    equals: session?.user.email,
                  },
                },
              },
            },
          },
          id: {
            equals: moduleId,
          },
        },
      });

      return !!result;
    }

    return false;
  }
);

const isModuleTeachingMemberOwner = rule({ cache: "contextual" })(
  async (_parent, _args: { where: ModuleWhereUniqueInput }, { req, prisma }: Context) => {
    const session = await getSession({ req });

    const moduleId = _args.where.id as unknown as string;

    if (moduleId && session?.user.email) {
      const result = await prisma.module.findFirst({
        where: {
          moduleTeachingMembers: {
            some: {
              user: {
                is: {
                  email: {
                    equals: session?.user.email,
                  },
                },
              },
              role: {
                equals: "OWNER",
              },
            },
          },
          id: {
            equals: moduleId,
          },
        },
      });

      return !!result;
    }

    return false;
  }
);

const isModuleTeachingMemberEditor = rule({ cache: "contextual" })(
  async (_parent, _args: { where: ModuleWhereUniqueInput }, { req, prisma }: Context) => {
    const session = await getSession({ req });

    const moduleId = _args.where.id as unknown as string;

    if (moduleId && session?.user.email) {
      const result = await prisma.module.findFirst({
        where: {
          moduleTeachingMembers: {
            some: {
              user: {
                is: {
                  email: {
                    equals: session?.user.email,
                  },
                },
              },
              role: {
                equals: "EDITOR",
              },
            },
          },
          id: {
            equals: moduleId,
          },
        },
      });

      return !!result;
    }

    return false;
  }
);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const isModuleTeachingMemberViewer = rule({ cache: "contextual" })(
  async (_parent, _args: { where: ModuleWhereUniqueInput }, { req, prisma }: Context) => {
    const session = await getSession({ req });

    const moduleId = _args.where.id as unknown as string;

    if (moduleId && session?.user.email) {
      const result = await prisma.module.findFirst({
        where: {
          moduleTeachingMembers: {
            some: {
              user: {
                is: {
                  email: {
                    equals: session?.user.email,
                  },
                },
              },
              role: {
                equals: "VIEWER",
              },
            },
          },
          id: {
            equals: moduleId,
          },
        },
      });

      return !!result;
    }

    return false;
  }
);

const isUserRequestedModuleTeachingMemberModule = rule({ cache: "contextual" })(
  async (_parent, _args: { where: ModulesByLecturerWhereInput }, { req }: Context) => {
    const session = await getSession({ req });

    if (session?.user.email === _args.where.email) {
      return true;
    }

    return false;
  }
);

const permissions = shield(
  {
    Query: {
      "*": deny,
      users: or(isAdmin, isLecturer),
      groupByUser: or(isAdmin, isLecturer),
      moduleExist: or(isAdmin, isLecturer),
      modules: isAdmin,
      modulesByLecturer: or(isAdmin, isUserRequestedModuleTeachingMemberModule),
      module: or(isAdmin, isModuleTeachingMember),
    },
    Mutation: {
      "*": deny,
      createManyUser: isAdmin,
      updateUser: isAdmin,
      deleteManyUser: isAdmin,
      createUser: isAdmin,
      createModule: or(isAdmin, isLecturer),
      updateModule: or(isAdmin, isModuleTeachingMemberOwner, isModuleTeachingMemberEditor),
      deleteModule: or(isAdmin, isModuleTeachingMemberOwner),
    },
  },
  {
    allowExternalErrors: true,
    fallbackError: (thrownThing) => {
      if (thrownThing instanceof ApolloError) {
        return thrownThing;
      } else if (thrownThing instanceof Error) {
        Sentry.captureException(thrownThing);
        return new ApolloError("Internal server error", "ERR_INTERNAL_SERVER");
      } else {
        return new ApolloError("Internal server error", "ERR_INTERNAL_SERVER");
      }
    },
  }
);

export { permissions };
