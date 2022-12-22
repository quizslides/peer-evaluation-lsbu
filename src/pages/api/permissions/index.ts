import { ServerResponse } from "http";

import { PeerEvaluationWhereInput, PeerEvaluationWhereUniqueInput } from "@generated/type-graphql";
import { PrismaClient } from "@prisma/client";
import * as Sentry from "@sentry/nextjs";
import { ApolloError } from "apollo-server-errors";
import { MicroRequest } from "apollo-server-micro/dist/types";
import { deny, or, rule, shield } from "graphql-shield";
import { getSession } from "next-auth/react";

import { PeerEvaluationsByLecturerWhereInput } from "@/pages/api/resolvers/lecturer/peer-evaluation";
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

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const isAdmin = rule({ cache: "contextual" })(async (_parent, _args, { req }: Context) => {
  const session = await getSession({ req });

  if (session?.user.role === Role.ADMIN) {
    return true;
  }

  return false;
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
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

// eslint-disable-next-line @typescript-eslint/no-unused-vars
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

// eslint-disable-next-line @typescript-eslint/no-unused-vars
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

// eslint-disable-next-line @typescript-eslint/no-unused-vars
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

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const isUserRequestedPeerEvaluationTeachingMemberPeerEvaluation = rule({ cache: "contextual" })(
  async (_parent, _args: { where: PeerEvaluationsByLecturerWhereInput }, { req }: Context) => {
    const session = await getSession({ req });

    if (session?.user.email === _args.where.lecturerEmail) {
      return true;
    }

    return false;
  }
);

const getStudentPermissionConfiguration = () => or(isAdmin, isLecturer, isStudent);

const permissions = shield(
  {
    Query: {
      "*": deny,
      email: or(isAdmin, isLecturer),
      findFirstPeerEvaluationStudentTeam: or(isAdmin, isLecturer),
      groupByPeerEvaluationStudentTeam: or(isAdmin, isLecturer),
      groupByUser: or(isAdmin, isLecturer),
      peerEvaluation: or(isAdmin, isLecturer),
      peerEvaluationDashboard: or(isAdmin, isLecturer),
      peerEvaluationExist: or(isAdmin, isLecturer),
      peerEvaluationStudentTeamCalculatedResultsTable: or(isAdmin, isLecturer),
      peerEvaluationStudentTeamExist: or(isAdmin, isLecturer),
      peerEvaluationStudentTeams: or(isAdmin, isLecturer),
      peerEvaluationStudents: or(isAdmin, isLecturer),
      peerEvaluationTableStudent: getStudentPermissionConfiguration(),
      peerEvaluationTableStudentLecturer: or(isAdmin, isLecturer),
      peerEvaluationTeachingMember: or(isAdmin, isLecturer),
      peerEvaluations: isAdmin,
      peerEvaluationsByLecturer: or(isAdmin, isLecturer),
      peerEvaluationsStudent: getStudentPermissionConfiguration(),
      users: isAdmin,
      usersLecturer: or(isAdmin, isLecturer),
    },
    Mutation: {
      "*": deny,
      createManyPeerEvaluationStudentTeam: or(isAdmin, isLecturer),
      createManyUser: or(isAdmin, isLecturer),
      createOnePeerEvaluation: or(isAdmin, isLecturer),
      createOnePeerEvaluationStudent: or(isAdmin, isLecturer),
      createOneUser: or(isAdmin, isLecturer),
      createPeerEvaluationStudentBulk: or(isAdmin, isLecturer),
      deleteManyPeerEvaluationStudent: or(isAdmin, isLecturer),
      deleteManyUser: isAdmin,
      deleteOnePeerEvaluation: or(isAdmin, isLecturer),
      deleteOnePeerEvaluationStudentTeam: or(isAdmin, isLecturer),
      peerEvaluationStudentTeamCalculateResultsTable: or(isAdmin, isLecturer),
      peerEvaluationStudentTeamCalculateResultsTableByTeam: or(isAdmin, isLecturer),
      updateManyPeerEvaluationRevieweeColumn: or(isAdmin, isLecturer),
      updateManyPeerEvaluationStudentReview: or(isAdmin, isLecturer),
      updateOneEmail: or(isAdmin, isLecturer),
      updateOnePeerEvaluation: or(isAdmin, isLecturer),
      updateOnePeerEvaluationReviewee: or(isAdmin, isLecturer),
      updateOnePeerEvaluationStudent: or(isAdmin, isLecturer),
      updateOnePeerEvaluationStudentTeam: or(isAdmin, isLecturer),
      updateOneUser: isAdmin,
      updatePeerEvaluationStudentsLecturerMark: or(isAdmin, isLecturer),
      updatePeerEvaluationTableStudent: getStudentPermissionConfiguration(),
    },
  },
  {
    allowExternalErrors: true,
    fallbackError: (errorThrown) => {
      if (errorThrown instanceof ApolloError) {
        return errorThrown;
      } else if (errorThrown instanceof Error) {
        Sentry.captureException(errorThrown);
      }

      return new ApolloError("Internal server error", "ERR_INTERNAL_SERVER");
    },
  }
);

export { permissions };
