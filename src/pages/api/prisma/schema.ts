import {
  CreateManyPeerEvaluationStudentTeamResolver,
  CreateManyUserResolver,
  CreateOnePeerEvaluationResolver,
  CreateOnePeerEvaluationStudentResolver,
  CreateOneUserResolver,
  DeleteManyPeerEvaluationStudentResolver,
  DeleteManyUserResolver,
  DeleteOnePeerEvaluationResolver,
  DeleteOnePeerEvaluationStudentTeamResolver,
  FindFirstPeerEvaluationStudentTeamResolver,
  FindManyPeerEvaluationResolver,
  FindManyPeerEvaluationStudentResolver,
  FindManyPeerEvaluationStudentTeamResolver,
  FindManyUserResolver,
  FindUniqueEmailResolver,
  FindUniquePeerEvaluationResolver,
  FindUniquePeerEvaluationTeachingMemberResolver,
  GroupByPeerEvaluationStudentTeamResolver,
  GroupByUserResolver,
  PeerEvaluationRelationsResolver,
  PeerEvaluationRevieweeColumnRelationsResolver,
  PeerEvaluationRevieweeRelationsResolver,
  PeerEvaluationStudentRelationsResolver,
  PeerEvaluationStudentReviewRelationsResolver,
  PeerEvaluationTeachingMemberRelationsResolver,
  UpdateManyPeerEvaluationRevieweeColumnResolver,
  UpdateManyPeerEvaluationRevieweeResolver,
  UpdateManyPeerEvaluationStudentReviewResolver,
  UpdateOneEmailResolver,
  UpdateOnePeerEvaluationResolver,
  UpdateOnePeerEvaluationRevieweeResolver,
  UpdateOnePeerEvaluationStudentResolver,
  UpdateOnePeerEvaluationStudentTeamResolver,
  UpdateOneUserResolver,
} from "@generated/type-graphql";
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
import { UsersLecturer } from "@/pages/api/resolvers/lecturer/users-lecturer";
import { UpdatePeerEvaluationTableStudentData } from "@/pages/api/resolvers/student/peer-evaluation-table-student-mutation";
import { PeerEvaluationTableStudentQuery } from "@/pages/api/resolvers/student/peer-evaluation-table-student-query";
import { PeerEvaluationsStudentQueryResolver } from "@/pages/api/resolvers/student/peer-evaluations-query";

const schemaDefinitions = await buildSchema({
  resolvers: [
    CreateManyPeerEvaluationStudentTeamResolver,
    CreateManyUserResolver,
    CreateOnePeerEvaluationResolver,
    CreateOnePeerEvaluationStudentResolver,
    CreateOneUserResolver,
    DeleteManyPeerEvaluationStudentResolver,
    DeleteManyUserResolver,
    DeleteOnePeerEvaluationResolver,
    DeleteOnePeerEvaluationStudentTeamResolver,
    FindFirstPeerEvaluationStudentTeamResolver,
    FindManyPeerEvaluationResolver,
    FindManyPeerEvaluationStudentResolver,
    FindManyPeerEvaluationStudentTeamResolver,
    FindManyUserResolver,
    FindUniqueEmailResolver,
    FindUniquePeerEvaluationResolver,
    FindUniquePeerEvaluationTeachingMemberResolver,
    GroupByPeerEvaluationStudentTeamResolver,
    GroupByUserResolver,
    PeerEvaluationCreateStudentBulkMutationResolver,
    PeerEvaluationDashboardQuery,
    PeerEvaluationExistQuery,
    PeerEvaluationRelationsResolver,
    PeerEvaluationRevieweeColumnRelationsResolver,
    PeerEvaluationRevieweeRelationsResolver,
    PeerEvaluationStudentRelationsResolver,
    PeerEvaluationStudentReviewRelationsResolver,
    PeerEvaluationStudentTeamCalculateResultsTable,
    PeerEvaluationStudentTeamCalculateResultsTableByTeam,
    PeerEvaluationStudentTeamCalculatedResultsTable,
    PeerEvaluationStudentTeamExistQuery,
    PeerEvaluationStudentsLecturerMark,
    PeerEvaluationTableStudentLecturerQuery,
    PeerEvaluationTableStudentQuery,
    PeerEvaluationTeachingMemberRelationsResolver,
    PeerEvaluationsByLecturerQuery,
    PeerEvaluationsStudentQueryResolver,
    UpdateManyPeerEvaluationRevieweeColumnResolver,
    UpdateManyPeerEvaluationRevieweeResolver,
    UpdateManyPeerEvaluationStudentReviewResolver,
    UpdateOneEmailResolver,
    UpdateOnePeerEvaluationResolver,
    UpdateOnePeerEvaluationRevieweeResolver,
    UpdateOnePeerEvaluationStudentResolver,
    UpdateOnePeerEvaluationStudentTeamResolver,
    UpdateOneUserResolver,
    UpdatePeerEvaluationTableStudentData,
    UsersLecturer,
  ],
});

export default schemaDefinitions;
