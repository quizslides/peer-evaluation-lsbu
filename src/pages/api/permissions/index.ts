import { ServerResponse } from "http";

import { PeerEvaluationWhereInput, PeerEvaluationWhereUniqueInput } from "@generated/type-graphql";
import { PrismaClient } from "@prisma/client";
import * as Sentry from "@sentry/nextjs";
import { ApolloError } from "apollo-server-errors";
import { MicroRequest } from "apollo-server-micro/dist/types";
import { allow, deny, or, rule, shield } from "graphql-shield";
import { getSession } from "next-auth/react";

import { PeerEvaluationsByLecturerWhereInput } from "@/pages/api/resolvers/peer-evaluation";
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

const isPeerEvaluationTeachingMember = rule({ cache: "contextual" })(
  async (_parent, _args: { where: PeerEvaluationWhereInput }, { req, prisma }: Context) => {
    const session = await getSession({ req });

    const peerEvaluationId = _args.where.id as unknown as string;

    if (peerEvaluationId && session?.user.email) {
      const result = await prisma.peerEvaluation.findFirst({
        where: {
          peerEvaluationTeachingMembers: {
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
            equals: peerEvaluationId,
          },
        },
      });

      return !!result;
    }

    return false;
  }
);

const isPeerEvaluationTeachingMemberOwner = rule({ cache: "contextual" })(
  async (_parent, _args: { where: PeerEvaluationWhereUniqueInput }, { req, prisma }: Context) => {
    const session = await getSession({ req });

    const peerEvaluationId = _args.where.id as unknown as string;

    if (peerEvaluationId && session?.user.email) {
      const result = await prisma.peerEvaluation.findFirst({
        where: {
          peerEvaluationTeachingMembers: {
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
            equals: peerEvaluationId,
          },
        },
      });

      return !!result;
    }

    return false;
  }
);

const isPeerEvaluationTeachingMemberEditor = rule({ cache: "contextual" })(
  async (_parent, _args: { where: PeerEvaluationWhereUniqueInput }, { req, prisma }: Context) => {
    const session = await getSession({ req });

    const peerEvaluationId = _args.where.id as unknown as string;

    if (peerEvaluationId && session?.user.email) {
      const result = await prisma.peerEvaluation.findFirst({
        where: {
          peerEvaluationTeachingMembers: {
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
            equals: peerEvaluationId,
          },
        },
      });

      return !!result;
    }

    return false;
  }
);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const isPeerEvaluationTeachingMemberViewer = rule({ cache: "contextual" })(
  async (_parent, _args: { where: PeerEvaluationWhereUniqueInput }, { req, prisma }: Context) => {
    const session = await getSession({ req });

    const peerEvaluationId = _args.where.id as unknown as string;

    if (peerEvaluationId && session?.user.email) {
      const result = await prisma.peerEvaluation.findFirst({
        where: {
          peerEvaluationTeachingMembers: {
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
            equals: peerEvaluationId,
          },
        },
      });

      return !!result;
    }

    return false;
  }
);

const isUserRequestedPeerEvaluationTeachingMemberPeerEvaluation = rule({ cache: "contextual" })(
  async (_parent, _args: { where: PeerEvaluationsByLecturerWhereInput }, { req }: Context) => {
    const session = await getSession({ req });

    if (session?.user.email === _args.where.email) {
      return true;
    }

    return false;
  }
);

// TODO: Add granular permissions for the student view
const permissions = shield(
  {
    Query: {
      "*": allow,
      // users: or(isAdmin, isLecturer),
      // groupByUser: or(isAdmin, isLecturer),
      // peerEvaluationExist: or(isAdmin, isLecturer),
      // peerEvaluations: isAdmin,
      // peerEvaluationsByLecturer: or(isAdmin, isUserRequestedPeerEvaluationTeachingMemberPeerEvaluation),
      // peerEvaluation: or(isAdmin, isPeerEvaluationTeachingMember),
    },
    Mutation: {
      "*": allow,
      // createManyUser: isAdmin,
      // updateUser: isAdmin,
      // deleteManyUser: isAdmin,
      // createUser: isAdmin,
      // createPeerEvaluation: or(isAdmin, isLecturer),
      // updatePeerEvaluation: or(isAdmin, isPeerEvaluationTeachingMemberOwner, isPeerEvaluationTeachingMemberEditor),
      // deletePeerEvaluation: or(isAdmin, isPeerEvaluationTeachingMemberOwner),
      // TBC - createManyStudents -> or(isAdmin, isLecturer)
      // TBC - createStudent -> or(isAdmin, isLecturer)
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
