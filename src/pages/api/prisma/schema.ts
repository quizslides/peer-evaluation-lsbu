import { resolvers } from "@generated/type-graphql";
import { buildSchema } from "type-graphql";

import { ModuleExist } from "@/pages/api/resolvers/module";

const schemaDefinitions = await buildSchema({
  resolvers: [...resolvers, ModuleExist],
});

export default schemaDefinitions;
