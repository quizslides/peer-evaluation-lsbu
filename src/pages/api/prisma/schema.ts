import { resolvers } from "@generated/type-graphql";
import { buildSchema } from "type-graphql";

import {
  PeerEvaluationDashboardQuery,
  PeerEvaluationExistQuery,
  PeerEvaluationStudentTeamExistQuery,
  PeerEvaluationsByLecturerQuery,
} from "@/pages/api/resolvers/peer-evaluation";
import { UpsertPeerEvaluationTableLecturer } from "@/pages/api/resolvers/peer-evaluation-table-lecturer";
import { UpdatePeerEvaluationTableStudentData } from "@/pages/api/resolvers/peer-evaluation-table-student-mutation";
import { PeerEvaluationTableStudentQuery } from "@/pages/api/resolvers/peer-evaluation-table-student-query";

const schemaDefinitions = await buildSchema({
  resolvers: [
    ...resolvers,
    UpdatePeerEvaluationTableStudentData,
    PeerEvaluationTableStudentQuery,
    UpsertPeerEvaluationTableLecturer,
    PeerEvaluationStudentTeamExistQuery,
    PeerEvaluationExistQuery,
    PeerEvaluationDashboardQuery,
    PeerEvaluationsByLecturerQuery,
  ],
});

export default schemaDefinitions;
