import { ServerResponse } from "http";

import { PeerEvaluationWhereInput, PeerEvaluationWhereUniqueInput } from "@generated/type-graphql";
import { PrismaClient } from "@prisma/client";
import * as Sentry from "@sentry/nextjs";
import { ApolloError } from "apollo-server-errors";
import { MicroRequest } from "apollo-server-micro/dist/types";
import { and, deny, or, rule, shield } from "graphql-shield";
import { getSession } from "next-auth/react";

import { DEFAULT_ERROR_CODE, getErrorMessageByCode } from "@/pages/api/error/list";
import { PeerEvaluationsByLecturerWhereInput } from "@/pages/api/resolvers/lecturer/peer-evaluation";
import { Role } from "@/utils/permissions";

export interface Context {
  prisma: PrismaClient;
  res: ServerResponse;
  req: MicroRequest;
}

const isAuthenticated = rule({ cache: "contextual" })(async (_parent, _args, { req }: Context) => {
  const session = await getSession({ req });

  if (session) {
    return true;
  }

  const { code, message } = getErrorMessageByCode("AUTHENTICATION_TOKEN_MISSING");

  return new ApolloError(message, code);
});

const isAdmin = rule({ cache: "contextual" })(async (_parent, _args, { req }: Context) => {
  const session = await getSession({ req });

  if (session?.user.role === Role.ADMIN) {
    return true;
  }

  const { code, message } = getErrorMessageByCode("PERMISSION_DENIED");

  return new ApolloError(message, code);
});

const isLecturer = rule({ cache: "contextual" })(async (_parent, _args, { req }: Context) => {
  const session = await getSession({ req });

  if (session?.user.role === Role.LECTURER) {
    return true;
  }

  const { code, message } = getErrorMessageByCode("PERMISSION_DENIED");

  return new ApolloError(message, code);
});

const isStudent = rule({ cache: "contextual" })(async (_parent, _args, { req }: Context) => {
  const session = await getSession({ req });

  if (session?.user.role === Role.STUDENT) {
    return true;
  }

  const { code, message } = getErrorMessageByCode("PERMISSION_DENIED");

  return new ApolloError(message, code);
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const isPeerEvaluationTeachingMember = rule({ cache: "contextual" })(async (
  _parent,
  _args: { where: PeerEvaluationWhereInput },
  { req, prisma }: Context
) => {
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
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const isPeerEvaluationTeachingMemberOwner = rule({ cache: "contextual" })(async (
  _parent,
  _args: { where: PeerEvaluationWhereUniqueInput },
  { req, prisma }: Context
) => {
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
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const isPeerEvaluationTeachingMemberEditor = rule({ cache: "contextual" })(async (
  _parent,
  _args: { where: PeerEvaluationWhereUniqueInput },
  { req, prisma }: Context
) => {
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
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const isPeerEvaluationTeachingMemberViewer = rule({ cache: "contextual" })(async (
  _parent,
  _args: { where: PeerEvaluationWhereUniqueInput },
  { req, prisma }: Context
) => {
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
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const isUserRequestedPeerEvaluationTeachingMemberPeerEvaluation = rule({ cache: "contextual" })(async (
  _parent,
  _args: { where: PeerEvaluationsByLecturerWhereInput },
  { req }: Context
) => {
  const session = await getSession({ req });

  if (session?.user.email === _args.where.lecturerEmail) {
    return true;
  }

  return false;
});

const getAdminPermissionConfiguration = () => and(isAuthenticated, isAdmin);

const getLecturerPermissionConfiguration = () => and(isAuthenticated, or(isAdmin, isLecturer));

const getStudentPermissionConfiguration = () => and(isAuthenticated, or(isAdmin, isLecturer, isStudent));

const permissions = shield(
  {
    Query: {
      "*": deny,
      email: getLecturerPermissionConfiguration(),
      findFirstPeerEvaluationStudentTeam: getLecturerPermissionConfiguration(),
      groupByPeerEvaluationStudentTeam: getLecturerPermissionConfiguration(),
      groupByUser: getLecturerPermissionConfiguration(),
      peerEvaluation: getLecturerPermissionConfiguration(),
      peerEvaluationDashboard: getLecturerPermissionConfiguration(),
      peerEvaluationExist: getLecturerPermissionConfiguration(),
      peerEvaluationStudentTeamCalculatedResultsTable: getLecturerPermissionConfiguration(),
      peerEvaluationStudentTeamExist: getLecturerPermissionConfiguration(),
      peerEvaluationStudentTeams: getLecturerPermissionConfiguration(),
      peerEvaluationStudents: getLecturerPermissionConfiguration(),
      peerEvaluationTableStudent: getStudentPermissionConfiguration(),
      peerEvaluationTableStudentLecturer: getLecturerPermissionConfiguration(),
      peerEvaluationTeachingMember: getLecturerPermissionConfiguration(),
      peerEvaluations: getAdminPermissionConfiguration(),
      peerEvaluationsByLecturer: getLecturerPermissionConfiguration(),
      peerEvaluationsStudent: getStudentPermissionConfiguration(),
      users: getAdminPermissionConfiguration(),
      usersLecturer: getLecturerPermissionConfiguration(),
    },
    Mutation: {
      "*": deny,
      createManyPeerEvaluationStudentTeam: getLecturerPermissionConfiguration(),
      createManyUser: getLecturerPermissionConfiguration(),
      createOnePeerEvaluation: getLecturerPermissionConfiguration(),
      createOnePeerEvaluationStudent: getLecturerPermissionConfiguration(),
      createOneUser: getLecturerPermissionConfiguration(),
      createPeerEvaluationStudentBulk: getLecturerPermissionConfiguration(),
      deleteManyPeerEvaluationStudent: getLecturerPermissionConfiguration(),
      deleteManyUser: getAdminPermissionConfiguration(),
      deleteOnePeerEvaluation: getLecturerPermissionConfiguration(),
      deleteOnePeerEvaluationStudentTeam: getLecturerPermissionConfiguration(),
      peerEvaluationStudentTeamCalculateResultsTable: getLecturerPermissionConfiguration(),
      peerEvaluationStudentTeamCalculateResultsTableByTeam: getLecturerPermissionConfiguration(),
      updateManyPeerEvaluationReviewee: getLecturerPermissionConfiguration(),
      updateManyPeerEvaluationRevieweeColumn: getLecturerPermissionConfiguration(),
      updateManyPeerEvaluationStudentReview: getLecturerPermissionConfiguration(),
      updateOneEmail: getLecturerPermissionConfiguration(),
      updateOnePeerEvaluation: getLecturerPermissionConfiguration(),
      updateOnePeerEvaluationReviewee: getLecturerPermissionConfiguration(),
      updateOnePeerEvaluationStudent: getLecturerPermissionConfiguration(),
      updateOnePeerEvaluationStudentTeam: getLecturerPermissionConfiguration(),
      updateOneUser: getAdminPermissionConfiguration(),
      updatePeerEvaluationStudentsLecturerMark: getLecturerPermissionConfiguration(),
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

      const { code, message } = getErrorMessageByCode(DEFAULT_ERROR_CODE);

      return new ApolloError(message, code);
    },
  }
);

export { permissions };
