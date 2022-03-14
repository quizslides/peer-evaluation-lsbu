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

export { GET_MODULES };
