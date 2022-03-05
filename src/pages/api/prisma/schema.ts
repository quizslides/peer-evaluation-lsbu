import { resolvers } from "@generated/type-graphql";
import { buildSchema } from "type-graphql";

const schemaDefinitions = await buildSchema({
  resolvers,
});

export default schemaDefinitions;
