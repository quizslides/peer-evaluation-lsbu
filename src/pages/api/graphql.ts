import "reflect-metadata";
import type { NextApiRequest, NextApiResponse } from "next";
import { ApolloServer } from "apollo-server-micro";
import { PrismaClient } from "@prisma/client";
import { buildSchema } from "type-graphql";
import { resolvers } from "@generated/type-graphql";
import { applyMiddleware } from "graphql-middleware";
import { shield, deny } from "graphql-shield";

const prisma = new PrismaClient();

export const permissions = shield({
  Query: {
    "*": deny,
  },
  Mutation: {
    "*": deny,
  },
});

const handler = async (req: NextApiRequest, res: NextApiResponse<any>) => {
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
    context: () => ({ prisma }),
    debug: process.env.NODE_ENV !== "production",
    introspection: process.env.NODE_ENV !== "production",
  });

  await apolloServer.start();

  await apolloServer.createHandler({
    path: "/api/graphql",
  })(req, res);
};

export const config = {
  api: {
    bodyParser: false,
  },
};

export default handler;
