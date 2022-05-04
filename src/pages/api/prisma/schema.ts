import { resolvers } from "@generated/type-graphql";
import { buildSchema } from "type-graphql";

import {
  PeerEvaluationDashboardQuery,
  PeerEvaluationExist,
  PeerEvaluationsByLecturer,
} from "@/pages/api/resolvers/peer-evaluation";

const schemaDefinitions = await buildSchema({
  resolvers: [...resolvers, PeerEvaluationExist, PeerEvaluationDashboardQuery, PeerEvaluationsByLecturer],
});

export default schemaDefinitions;
