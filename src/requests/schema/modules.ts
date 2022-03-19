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

const MODULE_EXIST = gql`
  query Query($where: ModuleExistWhereInput!) {
    moduleExist(where: $where) {
      exist
    }
  }
`;

export { CREATE_MODULE, GET_MODULES, MODULE_EXIST };
