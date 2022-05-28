import { resolvers } from "@generated/type-graphql";
import { buildSchema } from "type-graphql";

import {
  PeerEvaluationDashboardQuery,
  PeerEvaluationExistQuery,
  PeerEvaluationStudentTeamExistQuery,
  PeerEvaluationsByLecturerQuery,
} from "@/pages/api/resolvers/peer-evaluation";
import { UpsertPeerEvaluationTableLecturer } from "@/pages/api/resolvers/peer-evaluation-table-lecturer";
import { PeerEvaluationTableStudentQuery } from "@/pages/api/resolvers/peer-evaluation-table-student";

const schemaDefinitions = await buildSchema({
  resolvers: [
    ...resolvers,
    PeerEvaluationTableStudentQuery,
    UpsertPeerEvaluationTableLecturer,
    PeerEvaluationStudentTeamExistQuery,
    PeerEvaluationExistQuery,
    PeerEvaluationDashboardQuery,
    PeerEvaluationsByLecturerQuery,
  ],
});

export default schemaDefinitions;
