import { gql } from "@apollo/client";

const GET_PEER_EVALUATIONS = gql`
  query PeerEvaluations {
    peerEvaluations {
      id
      updatedAt
      createdAt
      title
      schools
      maxGradeIncrease
      status
      code
      maxGradeDecrease
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
        title
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

const GET_PEER_EVALUATIONS_BY_LECTURER = gql`
  query PeerEvaluationsByLecturer($where: PeerEvaluationsByLecturerWhereInput!) {
    peerEvaluationsByLecturer(where: $where) {
      id
      updatedAt
      createdAt
      title
      schools
      maxGradeIncrease
      status
      code
      maxGradeDecrease
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
        title
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
      maxGradeIncrease
      maxGradeDecrease
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
        _count {
          studentsMarkAdjusted
        }
        peerEvaluationId
        id
      }
      reminderEmail {
        title
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
    }
  }
`;

const CREATE_PEER_EVALUATION = gql`
  mutation CreatePeerEvaluation($data: PeerEvaluationCreateInput!) {
    createPeerEvaluation(data: $data) {
      id
      title
      createdAt
      updatedAt
      schools
      code
      status
      maxGradeIncrease
      maxGradeDecrease
      submissionsLockDate
      criteriaScoreRangeMin
      criteriaScoreRangeMax
      _count {
        peerEvaluationStudents
        peerEvaluationTeachingMembers
        columns
      }
      reminderEmail {
        id
        body
        title
        updatedAt
        createdAt
      }
      columns {
        id
        description
      }
      peerEvaluationTeachingMembers {
        role
        user {
          email
          name
        }
      }
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
      maxGradeIncrease
      maxGradeDecrease
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
        _count {
          studentsMarkAdjusted
        }
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
        title
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

const DELETE_PEER_EVALUATION = gql`
  mutation DeletePeerEvaluation($where: PeerEvaluationWhereUniqueInput!) {
    deletePeerEvaluation(where: $where) {
      id
    }
  }
`;

const PEER_EVALUATION_EXIST = gql`
  query PeerEvaluationExist($where: PeerEvaluationExistWhereInput!) {
    peerEvaluationExist(where: $where) {
      exist
    }
  }
`;

export {
  CREATE_PEER_EVALUATION,
  DELETE_PEER_EVALUATION,
  GET_PEER_EVALUATION,
  GET_PEER_EVALUATIONS,
  GET_PEER_EVALUATIONS_BY_LECTURER,
  PEER_EVALUATION_EXIST,
  UPDATE_PEER_EVALUATION,
};
