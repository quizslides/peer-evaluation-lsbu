import "reflect-metadata";
import { PrismaClient } from "@prisma/client";
import { ApolloServer } from "apollo-server-micro";
import { applyMiddleware } from "graphql-middleware";
import type { NextApiRequest, NextApiResponse } from "next";
import { PageConfig } from "next";

import ErrorHandler from "@/pages/api/error";
import { welcomeUserEmailHook } from "@/pages/api/hooks/auth";
import {
  onDeletePeerEvaluationStudentsHookAfter,
  onUpdatePeerEvaluationStudentHookAfterData,
  onUpdatePeerEvaluationStudentHookBeforeData,
} from "@/pages/api/hooks/peer-evaluation";
import { permissions } from "@/pages/api/permissions";
import prisma from "@/pages/api/prisma";
import schemaDefinitions from "@/pages/api/prisma/schema";

const config: PageConfig = {
  api: {
    bodyParser: false,
  },
};

prisma.$use(async (params, next) => {
  if (params.model === "User" && (params.action === "createMany" || params.action === "create")) {
    await welcomeUserEmailHook(params);
  }

  const result = await next(params);

  return result;
});

prisma.$use(async (params, next) => {
  let onUpdatePeerEvaluationStudentData = null;

  if (params.model === "PeerEvaluationStudent" && params.action === "update") {
    onUpdatePeerEvaluationStudentData = await onUpdatePeerEvaluationStudentHookBeforeData(params);
  }

  const result = await next(params);

  if (
    params.model === "PeerEvaluationStudent" &&
    params.action === "update" &&
    onUpdatePeerEvaluationStudentData &&
    onUpdatePeerEvaluationStudentData.peerEvaluationStudentTeamIdPrevious
  ) {
    const peerEvaluationStudentTeamIdPrevious = onUpdatePeerEvaluationStudentData.peerEvaluationStudentTeamIdPrevious;

    const peerEvaluationStudentTeamIdCurrent = result.peerEvaluationStudentTeamId;

    if (peerEvaluationStudentTeamIdCurrent !== peerEvaluationStudentTeamIdPrevious) {
      await onUpdatePeerEvaluationStudentHookAfterData(
        onUpdatePeerEvaluationStudentData.userId,
        onUpdatePeerEvaluationStudentData.peerEvaluationId,
        peerEvaluationStudentTeamIdCurrent,
        peerEvaluationStudentTeamIdPrevious
      );
    }
  }

  return result;
});

prisma.$use(async (params, next) => {
  const result = await next(params);

  if (params.model === "PeerEvaluationStudent" && params.action === "deleteMany") {
    const peerEvaluationData = await prisma.peerEvaluationStudent.findFirst({
      where: {
        id: params.args.where.id[0],
      },
      select: {
        peerEvaluationId: true,
      },
    });

    if (peerEvaluationData) {
      await onDeletePeerEvaluationStudentsHookAfter(peerEvaluationData.peerEvaluationId);
    }
  }

  return result;
});

const getApolloServer = (prisma: PrismaClient) => {
  const isProduction = process.env.NODE_ENV === "production";

  const schemaWithRules = applyMiddleware(schemaDefinitions, permissions);

  return new ApolloServer({
    schema: schemaWithRules,
    context: ({ req, res }) => ({ prisma, req, res }),
    debug: !isProduction,
    introspection: !isProduction,
    formatError: (error) => ErrorHandler(error),
  });
};

const createApolloServerHandler = (apolloServer: ApolloServer) => {
  return apolloServer.createHandler({
    path: "/api/graphql",
  });
};

const apolloInstance = await getApolloServer(prisma);

await apolloInstance.start();

const apolloServerHandler = (req: NextApiRequest, res: NextApiResponse) => {
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Origin", "https://studio.apollographql.com");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

  if (req.method === "OPTIONS") {
    res.end();
    return false;
  }

  return createApolloServerHandler(apolloInstance)(req, res);
};

export { config };

export default apolloServerHandler;
