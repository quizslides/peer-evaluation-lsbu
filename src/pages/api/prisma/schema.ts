import { resolvers } from "@generated/type-graphql";
import { buildSchema } from "type-graphql";

import { ModuleExist, ModulesByLecturer } from "@/pages/api/resolvers/module";

const schemaDefinitions = await buildSchema({
  resolvers: [...resolvers, ModuleExist, ModulesByLecturer],
});

export default schemaDefinitions;
