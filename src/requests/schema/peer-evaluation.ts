import { gql } from "@apollo/client";

const UPDATE_PEER_EVALUATION_STUDENTS_LECTURER_MARK = gql`
  mutation UpdatePeerEvaluationStudentsLecturerMark($where: PeerEvaluationStudentsLecturerMarkInputData!) {
    updatePeerEvaluationStudentsLecturerMark(where: $where) {
      completed
      message
      code
    }
  }
`;

const UPDATE_PEER_EVALUATION_REVIEWEE = gql`
  mutation UpdateOnePeerEvaluationReviewee(
    $data: PeerEvaluationRevieweeUpdateInput!
    $where: PeerEvaluationRevieweeWhereUniqueInput!
  ) {
    updateOnePeerEvaluationReviewee(data: $data, where: $where) {
      id
    }
  }
`;

const DELETE_MANY_PEER_EVALUATION_STUDENTS = gql`
  mutation DeleteManyPeerEvaluationStudent($where: PeerEvaluationStudentWhereInput) {
    deleteManyPeerEvaluationStudent(where: $where) {
      count
    }
  }
`;

const DELETE_PEER_EVALUATION_STUDENT_TEAM = gql`
  mutation DeleteOnePeerEvaluationStudentTeam($where: PeerEvaluationStudentTeamWhereUniqueInput!) {
    deleteOnePeerEvaluationStudentTeam(where: $where) {
      id
    }
  }
`;

const UPDATE_PEER_EVALUATION_STUDENT_TEAM = gql`
  mutation UpdateOnePeerEvaluationStudentTeam(
    $data: PeerEvaluationStudentTeamUpdateInput!
    $where: PeerEvaluationStudentTeamWhereUniqueInput!
  ) {
    updateOnePeerEvaluationStudentTeam(data: $data, where: $where) {
      id
      createdAt
      name
      mark
      updatedAt
      peerEvaluationId
    }
  }
`;

const UPDATE_PEER_EVALUATION_STUDENT_TEAM_CALCULATE_RESULTS_TABLE = gql`
  mutation PeerEvaluationStudentTeamCalculateResultsTable(
    $where: PeerEvaluationStudentTeamCalculateResultsTableWhereInput!
  ) {
    peerEvaluationStudentTeamCalculateResultsTable(where: $where) {
      code
      completed
      message
    }
  }
`;

const UPDATE_PEER_EVALUATION_STUDENT_TEAM_CALCULATE_RESULTS_TABLE_BY_TEAM = gql`
  mutation PeerEvaluationStudentTeamCalculateResultsTableByTeam(
    $where: PeerEvaluationStudentTeamCalculateResultsTableByTeamWhereInput!
  ) {
    peerEvaluationStudentTeamCalculateResultsTableByTeam(where: $where) {
      completed
      message
      code
    }
  }
`;

const UPDATE_PEER_EVALUATION_TABLE_STUDENT = gql`
  mutation UpdatePeerEvaluationTableStudent($where: UpdatePeerEvaluationTableStudentDataInputList!) {
    updatePeerEvaluationTableStudent(where: $where) {
      completed
      message
    }
  }
`;

const GET_PEER_EVALUATIONS_STUDENT = gql`
  query PeerEvaluationsStudent {
    peerEvaluationsStudent {
      peerEvaluationsStudent {
        updatedAt
        title
        code
        isCompleted
        submissionsLockDate
        peerEvaluationStatus
      }
    }
  }
`;

const GET_PEER_EVALUATION_STUDENT_TEAMS = gql`
  query PeerEvaluationStudentTeams(
    $where: PeerEvaluationStudentTeamWhereInput
    $orderBy: [PeerEvaluationStudentTeamOrderByWithRelationInput!]
  ) {
    peerEvaluationStudentTeams(where: $where, orderBy: $orderBy) {
      createdAt
      mark
      name
      id
      comment
      _count {
        peerEvaluationStudentList
      }
    }
  }
`;

const GET_PEER_EVALUATION_TEACHING_MEMBER_USER_ROLE = gql`
  query PeerEvaluationTeachingMember($where: PeerEvaluationTeachingMemberWhereUniqueInput!) {
    peerEvaluationTeachingMember(where: $where) {
      role
    }
  }
`;

const GET_PEER_EVALUATION_INFO = gql`
  query PeerEvaluation($where: PeerEvaluationWhereUniqueInput!) {
    peerEvaluation(where: $where) {
      status
      code
      title
    }
  }
`;

const GET_PEER_EVALUATION_STUDENT_TEAM_EXIST = gql`
  query PeerEvaluationStudentTeamExist($where: PeerEvaluationStudentTeamExistWhereInput!) {
    peerEvaluationStudentTeamExist(where: $where) {
      studentList {
        email
        id
      }
    }
  }
`;

const GET_GROUP_BY_PEER_EVALUATION_STUDENT_TEAMS = gql`
  query GroupByPeerEvaluationStudentTeam(
    $orderBy: [PeerEvaluationStudentTeamOrderByWithAggregationInput!]
    $by: [PeerEvaluationStudentTeamScalarFieldEnum!]!
    $where: PeerEvaluationStudentTeamWhereInput
  ) {
    groupByPeerEvaluationStudentTeam(orderBy: $orderBy, by: $by, where: $where) {
      name
    }
  }
`;

const GET_PEER_EVALUATIONS = gql`
  query PeerEvaluations($orderBy: [PeerEvaluationOrderByWithRelationInput!]) {
    peerEvaluations(orderBy: $orderBy) {
      id
      updatedAt
      createdAt
      title
      schools
      maxMarkIncrease
      status
      code
      maxMarkDecrease
      submissionsLockDate
      criteriaScoreRangeMin
      criteriaScoreRangeMax
      _count {
        columns
        peerEvaluationStudents
        peerEvaluationTeachingMembers
      }
      peerEvaluationTeachingMembers {
        id
        createdAt
        updatedAt
        role
        peerEvaluationId
        userId
        user {
          role
          email
          name
          id
          createdAt
          updatedAt
        }
      }
      reminderEmail {
        subject
        body
        updatedAt
        createdAt
        id
        peerEvaluationId
      }
      columns {
        createdAt
        id
        updatedAt
        description
        peerEvaluationId
      }
    }
  }
`;

const GET_PEER_EVALUATION_EMAIL_REMINDER = gql`
  query Email(
    $whereEmail: EmailWhereUniqueInput!
    $whereTeachingMemberRole: PeerEvaluationTeachingMemberWhereUniqueInput!
  ) {
    email(where: $whereEmail) {
      createdAt
      id
      updatedAt
      subject
      body
    }
    peerEvaluationTeachingMember(where: $whereTeachingMemberRole) {
      role
    }
  }
`;

const GET_PEER_EVALUATIONS_BY_LECTURER = gql`
  query PeerEvaluationsByLecturerQuery($where: PeerEvaluationsByLecturerWhereInput!) {
    peerEvaluationsByLecturer(where: $where) {
      id
      updatedAt
      createdAt
      title
      schools
      maxMarkIncrease
      status
      code
      maxMarkDecrease
      submissionsLockDate
      criteriaScoreRangeMin
      criteriaScoreRangeMax
      _count {
        columns
        peerEvaluationTeachingMembers
        peerEvaluationStudents
      }
      peerEvaluationTeachingMembers {
        id
        createdAt
        updatedAt
        role
        peerEvaluationId
        userId
        user {
          role
          email
          name
          id
          createdAt
          updatedAt
        }
      }
      reminderEmail {
        subject
        body
        updatedAt
        createdAt
        id
        peerEvaluationId
      }
      columns {
        createdAt
        id
        updatedAt
        description
        peerEvaluationId
      }
    }
  }
`;

const GET_PEER_EVALUATION = gql`
  query PeerEvaluation(
    $where: PeerEvaluationWhereUniqueInput!
    $orderBy: [PeerEvaluationColumnOrderByWithRelationInput!]
  ) {
    peerEvaluation(where: $where) {
      title
      id
      schools
      code
      status
      maxMarkIncrease
      maxMarkDecrease
      submissionsLockDate
      criteriaScoreRangeMin
      criteriaScoreRangeMax
      _count {
        peerEvaluationStudents
        peerEvaluationTeachingMembers
        columns
      }
      peerEvaluationTeachingMembers {
        user {
          email
          name
          updatedAt
          createdAt
          id
          role
        }
        createdAt
        updatedAt
        role
        userId
        peerEvaluationId
        id
      }
      reminderEmail {
        subject
        body
        peerEvaluationId
        id
      }
      columns(orderBy: $orderBy) {
        peerEvaluationId
        description
        id
        createdAt
        updatedAt
        _count {
          peerEvaluationRevieweeColumns
        }
      }
      createdAt
      updatedAt
      instructions
      scaleExplanation
    }
  }
`;

const GET_PEER_EVALUATION_STUDENT_TEAM_CALCULATES_RESULTS_TABLE = gql`
  query PeerEvaluationStudentTeamCalculatedResultsTable(
    $where: PeerEvaluationStudentTeamCalculatedResultsTableWhereInput!
  ) {
    peerEvaluationStudentTeamCalculatedResultsTable(where: $where) {
      studentsColumnList {
        name
        label
      }
      table
      teamName
      updatedAt
      mark
      isAvailable
      areMarksCalculated
      comment
      message
    }
  }
`;

const CREATE_PEER_EVALUATION = gql`
  mutation CreateOnePeerEvaluation($data: PeerEvaluationCreateInput!) {
    createOnePeerEvaluation(data: $data) {
      id
    }
  }
`;

const UPDATE_PEER_EVALUATION = gql`
  mutation UpdatePeerEvaluation(
    $dataPeerEvaluation: PeerEvaluationUpdateInput!
    $wherePeerEvaluation: PeerEvaluationWhereUniqueInput!
    $dataPeerEvaluationStudentReview: PeerEvaluationStudentReviewUpdateManyMutationInput!
    $wherePeerEvaluationStudentReview: PeerEvaluationStudentReviewWhereInput
    $dataPeerEvaluationRevieweeColumnData: PeerEvaluationRevieweeColumnUpdateManyMutationInput!
    $wherePeerEvaluationRevieweeColumnData: PeerEvaluationRevieweeColumnWhereInput
  ) {
    updateOnePeerEvaluation(data: $dataPeerEvaluation, where: $wherePeerEvaluation) {
      title
      id
      createdAt
      updatedAt
      code
      schools
      status
      maxMarkIncrease
      maxMarkDecrease
      submissionsLockDate
      criteriaScoreRangeMin
      criteriaScoreRangeMax
      _count {
        peerEvaluationTeachingMembers
        peerEvaluationStudents
        columns
      }
      peerEvaluationTeachingMembers {
        userId
        peerEvaluationId
        role
        updatedAt
        createdAt
        id
        user {
          email
          name
          updatedAt
          createdAt
          id
          role
        }
      }
      reminderEmail {
        id
        createdAt
        updatedAt
        subject
        body
        peerEvaluationId
      }
      columns {
        id
        createdAt
        updatedAt
        description
        peerEvaluationId
        _count {
          peerEvaluationRevieweeColumns
        }
      }
    }

    updateManyPeerEvaluationStudentReview(
      data: $dataPeerEvaluationStudentReview
      where: $wherePeerEvaluationStudentReview
    ) {
      count
    }

    updateManyPeerEvaluationRevieweeColumn(
      data: $dataPeerEvaluationRevieweeColumnData
      where: $wherePeerEvaluationRevieweeColumnData
    ) {
      count
    }
  }
`;

const UPDATE_PEER_EVALUATION_EMAIL = gql`
  mutation UpdateOneEmail($data: EmailUpdateInput!, $where: EmailWhereUniqueInput!) {
    updateOneEmail(data: $data, where: $where) {
      subject
      body
    }
  }
`;

const DELETE_PEER_EVALUATION = gql`
  mutation DeleteOnePeerEvaluation($where: PeerEvaluationWhereUniqueInput!) {
    deleteOnePeerEvaluation(where: $where) {
      id
    }
  }
`;

const PEER_EVALUATION_EXIST = gql`
  query PeerEvaluationExistQuery($where: PeerEvaluationExistWhereInput!) {
    peerEvaluationExist(where: $where) {
      exist
    }
  }
`;

const PEER_EVALUATION_STUDENT_TEAM_EXIST = gql`
  query FindFirstPeerEvaluationStudentTeam(
    $where: PeerEvaluationStudentTeamWhereInput
    $orderBy: [PeerEvaluationStudentTeamOrderByWithRelationInput!]
  ) {
    findFirstPeerEvaluationStudentTeam(where: $where, orderBy: $orderBy) {
      name
    }
  }
`;

const PEER_EVALUATION_DASHBOARD = gql`
  query PeerEvaluationDashboard($where: PeerEvaluationDashboardWhereInput!) {
    peerEvaluationDashboard(where: $where) {
      title
      id
      schools
      code
      status
      maxMarkIncrease
      maxMarkDecrease
      submissionsLockDate
      _count {
        peerEvaluationStudents
        peerEvaluationTeachingMembers
      }
      createdAt
      updatedAt
      totalCompletedPeerEvaluations
      totalPeerEvaluationTeams
      peerEvaluationTeachingMembers {
        role
      }
    }
  }
`;

const PEER_EVALUATION_STUDENTS = gql`
  query PeerEvaluationStudents(
    $where: PeerEvaluationStudentWhereInput
    $orderBy: [PeerEvaluationStudentOrderByWithRelationInput!]
  ) {
    peerEvaluationStudents(where: $where, orderBy: $orderBy) {
      id
      createdAt
      updatedAt
      userId
      studentName
      peerEvaluationId
      peerEvaluationStudentTeamId
      averageCriteriaScore
      averageCriteriaScoreByTeamMember
      systemCalculatedMark
      systemAdjustedMark
      lecturerAdjustedMark
      finalMark
      user {
        name
        email
        emailVerified
      }
      peerEvaluationStudentTeam {
        name
        mark
        createdAt
        updatedAt
      }
      peerEvaluationReviewed {
        isCompleted
      }
    }
  }
`;

const UPDATE_PEER_EVALUATION_STUDENT = gql`
  mutation UpdateOnePeerEvaluationStudent(
    $data: PeerEvaluationStudentUpdateInput!
    $where: PeerEvaluationStudentWhereUniqueInput!
  ) {
    updateOnePeerEvaluationStudent(data: $data, where: $where) {
      id
    }
  }
`;

const CREATE_PEER_EVALUATION_STUDENT = gql`
  mutation CreateOnePeerEvaluationStudent($data: PeerEvaluationStudentCreateInput!) {
    createOnePeerEvaluationStudent(data: $data) {
      id
    }
  }
`;

const CREATE_MANY_PEER_EVALUATION_STUDENT_TEAMS = gql`
  mutation CreateManyPeerEvaluationStudentTeam(
    $data: [PeerEvaluationStudentTeamCreateManyInput!]!
    $skipDuplicates: Boolean
  ) {
    createManyPeerEvaluationStudentTeam(data: $data, skipDuplicates: $skipDuplicates) {
      count
    }
  }
`;

const GET_PEER_EVALUATION_TABLE_STUDENT = gql`
  query PeerEvaluationTableStudent(
    $where: PeerEvaluationTableStudentWhereInput!
    $orderBy: [PeerEvaluationRevieweeOrderByWithRelationInput!]
    $columnsOrderBy: [PeerEvaluationColumnOrderByWithRelationInput!]
  ) {
    peerEvaluationTableStudent(where: $where) {
      readOnly
      visible
      message
      peerEvaluationStudentReview {
        id
        createdAt
        peerEvaluationStudentId
        updatedAt
        isCompleted
        _count {
          peerEvaluationReviewees
        }
        peerEvaluationStudent {
          studentName
          user {
            role
            email
            name
            id
          }
        }
        peerEvaluationReviewees(orderBy: $orderBy) {
          id
          criteriaScoreTotal
          studentReviewedId
          comment
          isValid
          studentReviewed {
            studentName
            user {
              name
              email
            }
          }
          peerEvaluationReviewId
          peerEvaluationRevieweeColumns {
            peerEvaluationColumnId
            criteriaScore
            updatedAt
            createdAt
            id
            peerEvaluationRevieweeId
            peerEvaluationColumn {
              description
            }
          }
        }
      }
      peerEvaluation {
        id
        status
        columns(orderBy: $columnsOrderBy) {
          description
          id
        }
        criteriaScoreRangeMin
        criteriaScoreRangeMax
        submissionsLockDate
        title
        code
        instructions
        scaleExplanation
      }
      peerEvaluationStudentInfo {
        studentName
        studentEmail
        submissionsLockDate
        studentTeamName
        updatedAt
        isCompleted
      }
    }
  }
`;

const GET_PEER_EVALUATION_TABLE_STUDENT_LECTURER = gql`
  query PeerEvaluationTableStudentLecturer(
    $where: PeerEvaluationTableStudentLecturerWhereInput!
    $orderBy: [PeerEvaluationRevieweeOrderByWithRelationInput!]
    $columnsOrderBy: [PeerEvaluationColumnOrderByWithRelationInput!]
  ) {
    peerEvaluationTableStudentLecturer(where: $where) {
      readOnly
      visible
      message
      peerEvaluationStudentReview {
        id
        createdAt
        peerEvaluationStudentId
        updatedAt
        isCompleted
        _count {
          peerEvaluationReviewees
        }
        peerEvaluationStudent {
          studentName
          user {
            role
            email
            name
            id
          }
        }
        peerEvaluationReviewees(orderBy: $orderBy) {
          id
          criteriaScoreTotal
          studentReviewedId
          comment
          isValid
          studentReviewed {
            studentName
            user {
              name
              email
            }
          }
          peerEvaluationReviewId
          peerEvaluationRevieweeColumns {
            peerEvaluationColumnId
            criteriaScore
            updatedAt
            createdAt
            id
            peerEvaluationRevieweeId
            peerEvaluationColumn {
              description
            }
          }
        }
      }
      peerEvaluation {
        id
        status
        columns(orderBy: $columnsOrderBy) {
          description
          id
        }
        criteriaScoreRangeMin
        criteriaScoreRangeMax
        submissionsLockDate
        title
        code
        instructions
        scaleExplanation
      }
      peerEvaluationStudentInfo {
        studentName
        studentEmail
        submissionsLockDate
        studentTeamName
        updatedAt
        isCompleted
      }
    }
  }
`;

const CREATE_PEER_EVALUATION_STUDENT_BULK = gql`
  mutation CreatePeerEvaluationStudentBulk($data: PeerEvaluationCreateStudentBulkInput!) {
    createPeerEvaluationStudentBulk(data: $data) {
      processSuccessfully
    }
  }
`;

export {
  CREATE_MANY_PEER_EVALUATION_STUDENT_TEAMS,
  CREATE_PEER_EVALUATION,
  CREATE_PEER_EVALUATION_STUDENT,
  CREATE_PEER_EVALUATION_STUDENT_BULK,
  DELETE_MANY_PEER_EVALUATION_STUDENTS,
  DELETE_PEER_EVALUATION,
  DELETE_PEER_EVALUATION_STUDENT_TEAM,
  GET_GROUP_BY_PEER_EVALUATION_STUDENT_TEAMS,
  GET_PEER_EVALUATION,
  GET_PEER_EVALUATION_EMAIL_REMINDER,
  GET_PEER_EVALUATION_INFO,
  GET_PEER_EVALUATION_STUDENT_TEAM_CALCULATES_RESULTS_TABLE,
  GET_PEER_EVALUATION_STUDENT_TEAM_EXIST,
  GET_PEER_EVALUATION_STUDENT_TEAMS,
  GET_PEER_EVALUATION_TABLE_STUDENT,
  GET_PEER_EVALUATION_TABLE_STUDENT_LECTURER,
  GET_PEER_EVALUATION_TEACHING_MEMBER_USER_ROLE,
  GET_PEER_EVALUATIONS,
  GET_PEER_EVALUATIONS_BY_LECTURER,
  GET_PEER_EVALUATIONS_STUDENT,
  PEER_EVALUATION_DASHBOARD,
  PEER_EVALUATION_EXIST,
  PEER_EVALUATION_STUDENT_TEAM_EXIST,
  PEER_EVALUATION_STUDENTS,
  UPDATE_PEER_EVALUATION,
  UPDATE_PEER_EVALUATION_EMAIL,
  UPDATE_PEER_EVALUATION_REVIEWEE,
  UPDATE_PEER_EVALUATION_STUDENT,
  UPDATE_PEER_EVALUATION_STUDENT_TEAM,
  UPDATE_PEER_EVALUATION_STUDENT_TEAM_CALCULATE_RESULTS_TABLE,
  UPDATE_PEER_EVALUATION_STUDENT_TEAM_CALCULATE_RESULTS_TABLE_BY_TEAM,
  UPDATE_PEER_EVALUATION_STUDENTS_LECTURER_MARK,
  UPDATE_PEER_EVALUATION_TABLE_STUDENT,
};
