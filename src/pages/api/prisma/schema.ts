import { resolvers } from "@generated/type-graphql";
import { buildSchema } from "type-graphql";

import { PeerEvaluationExist, PeerEvaluationsByLecturer } from "@/pages/api/resolvers/peer-evaluation";

const schemaDefinitions = await buildSchema({
  resolvers: [...resolvers, PeerEvaluationExist, PeerEvaluationsByLecturer],
});

export default schemaDefinitions;
