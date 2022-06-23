import { resolvers } from "@generated/type-graphql";
import { buildSchema } from "type-graphql";

import {
  PeerEvaluationDashboardQuery,
  PeerEvaluationExistQuery,
  PeerEvaluationStudentTeamExistQuery,
  PeerEvaluationsByLecturerQuery,
} from "@/pages/api/resolvers/lecturer/peer-evaluation";
import { PeerEvaluationCreateStudentBulkMutationResolver } from "@/pages/api/resolvers/lecturer/peer-evaluation-create-student-bulk";
import { PeerEvaluationStudentsLecturerMark } from "@/pages/api/resolvers/lecturer/peer-evaluation-student-lecturer-mark";
import { PeerEvaluationStudentTeamCalculateResultsTable } from "@/pages/api/resolvers/lecturer/peer-evaluation-student-team-calculate-results-table";
import { PeerEvaluationStudentTeamCalculateResultsTableByTeam } from "@/pages/api/resolvers/lecturer/peer-evaluation-student-team-calculate-results-table-by-team";
import { PeerEvaluationStudentTeamCalculatedResultsTable } from "@/pages/api/resolvers/lecturer/peer-evaluation-student-team-calculated-results-table";
import { PeerEvaluationTableStudentLecturerQuery } from "@/pages/api/resolvers/lecturer/peer-evaluation-table-student-lecturer-query";
import { UpdatePeerEvaluationTableStudentData } from "@/pages/api/resolvers/student/peer-evaluation-table-student-mutation";
import { PeerEvaluationTableStudentQuery } from "@/pages/api/resolvers/student/peer-evaluation-table-student-query";

const schemaDefinitions = await buildSchema({
  resolvers: [
    ...resolvers,
    PeerEvaluationCreateStudentBulkMutationResolver,
    PeerEvaluationStudentTeamCalculateResultsTableByTeam,
    PeerEvaluationStudentTeamCalculateResultsTable,
    PeerEvaluationStudentTeamCalculatedResultsTable,
    PeerEvaluationTableStudentLecturerQuery,
    PeerEvaluationStudentsLecturerMark,
    UpdatePeerEvaluationTableStudentData,
    PeerEvaluationTableStudentQuery,
    PeerEvaluationStudentTeamExistQuery,
    PeerEvaluationExistQuery,
    PeerEvaluationDashboardQuery,
    PeerEvaluationsByLecturerQuery,
  ],
});

export default schemaDefinitions;
