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
        moduleTeachingMembers
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

const GET_MODULES_BY_LECTURER = gql`
  query ModulesByLecturer($where: ModulesByLecturerWhereInput!) {
    modulesByLecturer(where: $where) {
      id
      updatedAt
      createdAt
      title
      schools
      maxGradeIncrease
      status
      moduleCode
      maxGradeDecrease
      submissionsLockDate
      criteriaScoreRangeMin
      criteriaScoreRangeMax
      _count {
        columns
        moduleTeachingMembers
        students
      }
      moduleTeachingMembers {
        id
        createdAt
        updatedAt
        role
        moduleId
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
        moduleId
      }
      columns {
        createdAt
        id
        updatedAt
        description
        moduleId
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
        moduleTeachingMembers
        columns
        students
      }
      moduleTeachingMembers {
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
        moduleTeachingMembers
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
      moduleTeachingMembers {
        role
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
        moduleTeachingMembers
        columns
        students
      }
      moduleTeachingMembers {
        userId
        moduleId
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

export { CREATE_MODULE, DELETE_MODULE, GET_MODULE, GET_MODULES, GET_MODULES_BY_LECTURER, MODULE_EXIST, UPDATE_MODULE };
