import "reflect-metadata";

import { resolvers } from "@generated/type-graphql";
import { ApolloServer } from "apollo-server-micro";
import { applyMiddleware } from "graphql-middleware";
import type { NextApiRequest, NextApiResponse } from "next";
import { buildSchema } from "type-graphql";

import { welcomeUserEmailHook } from "@/pages/api/hooks/auth";
import { permissions } from "@/pages/api/permissions";
import prisma from "@/pages/api/prisma";

const config = {
  api: {
    bodyParser: false,
  },
};

prisma.$use(async (params, next) => {
  if (params.model === "User") {
    await welcomeUserEmailHook(params);
  }

  const result = await next(params);

  return result;
});

const apolloServer = async (req: NextApiRequest, res: NextApiResponse): Promise<false | undefined> => {
  const isProduction = process.env.NODE_ENV !== "production";

  const schemaDefinitions = await buildSchema({
    resolvers,
  });

  const schemaWithRules = applyMiddleware(schemaDefinitions, permissions);

  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Origin", "https://studio.apollographql.com");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

  if (req.method === "OPTIONS") {
    res.end();
    return false;
  }

  const apolloServer = new ApolloServer({
    schema: schemaWithRules,
    context: () => ({ prisma, req, res }),
    debug: isProduction,
    introspection: isProduction,
    formatError: (err) => {
      if (isProduction) {
        return err;
      }

      return new Error("Internal server error");
    },
  });

  await apolloServer.start();

  await apolloServer.createHandler({
    path: "/api/graphql",
  })(req, res);
};

export { config };

export default apolloServer;
