import { resolvers } from "@generated/type-graphql";
import { buildSchema } from "type-graphql";

import { CreatePeerEvaluationTableGeneration } from "../resolvers/peer-evaluation-table";

import {
  PeerEvaluationDashboardQuery,
  PeerEvaluationExistQuery,
  PeerEvaluationStudentTeamExistQuery,
  PeerEvaluationsByLecturerQuery,
} from "@/pages/api/resolvers/peer-evaluation";

const schemaDefinitions = await buildSchema({
  resolvers: [
    ...resolvers,
    CreatePeerEvaluationTableGeneration,
    PeerEvaluationStudentTeamExistQuery,
    PeerEvaluationExistQuery,
    PeerEvaluationDashboardQuery,
    PeerEvaluationsByLecturerQuery,
  ],
});

export default schemaDefinitions;
