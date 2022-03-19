import { gql } from "@apollo/client";

const GET_MODULES = gql`
  query Modules {
    modules {
      id
      createdAt
      updatedAt
      title
      schools
      moduleCode
      status
      maxGradeIncrease
      maxGradeDecrease
      submissionsLockDate
      criteriaScoreRangeMin
      criteriaScoreRangeMax
      _count {
        moduleMembers
        columns
        students
      }
      reminderEmail {
        title
        body
        updatedAt
        createdAt
        id
      }
    }
  }
`;

const GET_MODULE = gql`
  query Module($where: ModuleWhereUniqueInput!) {
    module(where: $where) {
      title
      id
      schools
      moduleCode
      status
      maxGradeIncrease
      maxGradeDecrease
      submissionsLockDate
      criteriaScoreRangeMin
      criteriaScoreRangeMax
      _count {
        moduleMembers
        columns
        students
      }
      moduleMembers {
        user {
          email
        }
        createdAt
        updatedAt
        permission
        userId
        _count {
          studentsMarkAdjusted
        }
        moduleId
        id
      }
      reminderEmail {
        title
        body
        moduleId
        id
      }
      columns {
        moduleId
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

const CREATE_MODULE = gql`
  mutation CreateModule($data: ModuleCreateInput!) {
    createModule(data: $data) {
      id
      title
      createdAt
      updatedAt
      schools
      moduleCode
      status
      maxGradeIncrease
      maxGradeDecrease
      submissionsLockDate
      criteriaScoreRangeMin
      criteriaScoreRangeMax
      _count {
        moduleMembers
        columns
        students
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
      moduleMembers {
        permission
        user {
          email
          name
        }
      }
    }
  }
`;

const UPDATE_MODULE = gql`
  mutation UpdateModule($data: ModuleUpdateInput!, $where: ModuleWhereUniqueInput!) {
    updateModule(data: $data, where: $where) {
      title
      id
      createdAt
      updatedAt
      moduleCode
      schools
      status
      maxGradeIncrease
      maxGradeDecrease
      submissionsLockDate
      criteriaScoreRangeMin
      criteriaScoreRangeMax
      _count {
        moduleMembers
        columns
        students
      }
      moduleMembers {
        userId
        moduleId
        permission
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
        moduleId
      }
      columns {
        id
        createdAt
        updatedAt
        description
        moduleId
        _count {
          PeerEvaluationRevieweeColumn
        }
      }
    }
  }
`;

const DELETE_MODULE = gql`
  mutation Mutation($where: ModuleWhereUniqueInput!) {
    deleteModule(where: $where) {
      id
    }
  }
`;

const MODULE_EXIST = gql`
  query Query($where: ModuleExistWhereInput!) {
    moduleExist(where: $where) {
      exist
    }
  }
`;

export { CREATE_MODULE, DELETE_MODULE, GET_MODULE, GET_MODULES, MODULE_EXIST, UPDATE_MODULE };
