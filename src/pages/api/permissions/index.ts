import { ServerResponse } from "http";

import { PrismaClient } from "@prisma/client";
import { MicroRequest } from "apollo-server-micro/dist/types";
import { deny, rule, shield } from "graphql-shield";
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

/* 
TODO: Module Owner or Collaborator
Student with access to a module and live or editable
*/

const isFalse = rule()(async () => {
  return false;
});

const isTrue = rule()(async () => {
  return true;
});

const permissions = shield(
  {
    Query: {
      "*": deny,
      users: isTrue,
    },
    Mutation: {
      "*": deny,
      createManyUser: isTrue,
      createUser: isFalse,
    },
  },
  { allowExternalErrors: true }
);

export { permissions };
