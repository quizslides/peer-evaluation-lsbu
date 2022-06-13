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
  mutation UpdatePeerEvaluationReviewee(
    $data: PeerEvaluationRevieweeUpdateInput!
    $where: PeerEvaluationRevieweeWhereUniqueInput!
  ) {
    updatePeerEvaluationReviewee(data: $data, where: $where) {
      id
    }
  }
`;

const DELETE_PEER_EVALUATION_STUDENT_TEAM = gql`
  mutation DeletePeerEvaluationStudentTeam($where: PeerEvaluationStudentTeamWhereUniqueInput!) {
    deletePeerEvaluationStudentTeam(where: $where) {
      id
    }
  }
`;

const UPDATE_PEER_EVALUATION_STUDENT_TEAM = gql`
  mutation UpdatePeerEvaluationStudentTeam(
    $data: PeerEvaluationStudentTeamUpdateInput!
    $where: PeerEvaluationStudentTeamWhereUniqueInput!
  ) {
    updatePeerEvaluationStudentTeam(data: $data, where: $where) {
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

const GET_PEER_EVALUATION_STUDENT_TEAMS = gql`
  query PeerEvaluationStudentTeams($where: PeerEvaluationStudentTeamWhereInput) {
    peerEvaluationStudentTeams(where: $where) {
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

const GET_PEER_EVALUATION_COLUMNS = gql`
  query PeerEvaluation($where: PeerEvaluationWhereUniqueInput!) {
    peerEvaluation(where: $where) {
      columns {
        id
      }
    }
  }
`;

const GET_PEER_EVALUATIONS = gql`
  query PeerEvaluations {
    peerEvaluations {
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
  query PeerEvaluation($where: PeerEvaluationWhereUniqueInput!) {
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
      columns {
        peerEvaluationId
        description
        id
        createdAt
        updatedAt
        _count {
          PeerEvaluationRevieweeColumn
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
  mutation CreatePeerEvaluation($data: PeerEvaluationCreateInput!) {
    createPeerEvaluation(data: $data) {
      id
    }
  }
`;

const UPDATE_PEER_EVALUATION = gql`
  mutation UpdatePeerEvaluation($data: PeerEvaluationUpdateInput!, $where: PeerEvaluationWhereUniqueInput!) {
    updatePeerEvaluation(data: $data, where: $where) {
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
          PeerEvaluationRevieweeColumn
        }
      }
    }
  }
`;

const UPDATE_PEER_EVALUATION_EMAIL = gql`
  mutation UpdateEmail($data: EmailUpdateInput!, $where: EmailWhereUniqueInput!) {
    updateEmail(data: $data, where: $where) {
      subject
      body
    }
  }
`;

const DELETE_PEER_EVALUATION = gql`
  mutation DeletePeerEvaluation($where: PeerEvaluationWhereUniqueInput!) {
    deletePeerEvaluation(where: $where) {
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
  query FindFirstPeerEvaluationStudentTeam($where: PeerEvaluationStudentTeamWhereInput) {
    findFirstPeerEvaluationStudentTeam(where: $where) {
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

const UPSERT_PEER_EVALUATION_TABLE_LECTURER = gql`
  mutation UpsertPeerEvaluationTableLecturer($where: UpsertPeerEvaluationTableLecturerWhereInput!) {
    upsertPeerEvaluationTableLecturer(where: $where) {
      completed
    }
  }
`;

const UPDATE_PEER_EVALUATION_STUDENT = gql`
  mutation UpdatePeerEvaluationStudent(
    $data: PeerEvaluationStudentUpdateInput!
    $where: PeerEvaluationStudentWhereUniqueInput!
  ) {
    updatePeerEvaluationStudent(data: $data, where: $where) {
      id
    }
  }
`;

const CREATE_PEER_EVALUATION_STUDENT = gql`
  mutation CreatePeerEvaluationStudent($data: PeerEvaluationStudentCreateInput!) {
    createPeerEvaluationStudent(data: $data) {
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
          PeerEvaluationReviewees
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
        PeerEvaluationReviewees(orderBy: $orderBy) {
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
          PeerEvaluationRevieweeColumn {
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
        columns {
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
      }
    }
  }
`;

const GET_PEER_EVALUATION_TABLE_STUDENT_LECTURER = gql`
  query PeerEvaluationTableStudentLecturer($where: PeerEvaluationTableStudentLecturerWhereInput!) {
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
          PeerEvaluationReviewees
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
        PeerEvaluationReviewees {
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
          PeerEvaluationRevieweeColumn {
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
        columns {
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
      }
    }
  }
`;

export {
  CREATE_MANY_PEER_EVALUATION_STUDENT_TEAMS,
  CREATE_PEER_EVALUATION,
  CREATE_PEER_EVALUATION_STUDENT,
  DELETE_PEER_EVALUATION,
  DELETE_PEER_EVALUATION_STUDENT_TEAM,
  GET_GROUP_BY_PEER_EVALUATION_STUDENT_TEAMS,
  GET_PEER_EVALUATION,
  GET_PEER_EVALUATION_COLUMNS,
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
  UPSERT_PEER_EVALUATION_TABLE_LECTURER,
};
