import { ServerResponse } from "http";

import { PrismaClient } from "@prisma/client";
import * as Sentry from "@sentry/nextjs";
import { ApolloError } from "apollo-server-errors";
import { MicroRequest } from "apollo-server-micro/dist/types";
import { allow, rule, shield } from "graphql-shield";
import { getSession } from "next-auth/react";

import { Role } from "@/utils/permissions";

export interface Context {
  prisma: PrismaClient;
  res: ServerResponse;
  req: MicroRequest;
}

export const isAuthenticated = rule({ cache: "contextual" })(async (_parent, _args, { req }) => {
  const session = await getSession({ req });
  return Boolean(session);
});

export const isAdmin = rule({ cache: "contextual" })(async (_parent, _args, { req }) => {
  const session = await getSession({ req });

  if (session?.user.role === Role.ADMIN) {
    return true;
  }

  return false;
});

export const isLecturer = rule({ cache: "contextual" })(async (_parent, _args, { req }) => {
  const session = await getSession({ req });

  if (session?.user.role === Role.LECTURER) {
    return true;
  }

  return false;
});

export const isStudent = rule({ cache: "contextual" })(async (_parent, _args, { req }) => {
  const session = await getSession({ req });

  if (session?.user.role === Role.STUDENT) {
    return true;
  }

  return false;
});

/**
 * Module Owner
 * Module Viewer
 * Module Member
 * Module Editor
 *
 * Peer Evaluation Reviewer
 * Peer Evaluation Reviewees
 *
 *
 */

/**
 * TODO: Module Owner or Collaborator
 * Student with access to a module and live or editable
 */
export const isFalse = rule()(() => {
  return false;
});

export const isTrue = rule()(() => {
  return true;
});

const permissions = shield(
  {
    Query: {
      "*": allow,
      // users: isAdmin,
      // groupByUser: isAdmin,
      // isModuleExist: isTrue,
    },
    Mutation: {
      "*": allow,
      // createManyUser: isAdmin,
      // updateUser: isAdmin,
      // deleteManyUser: isAdmin,
      // createUser: isAdmin,
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
