import { gql } from "graphql-request";

export const CREATE_MULTIPLE_USERS = gql`
  mutation CreateMultipleUser($data: [UserCreateManyInput!]!, $skipDuplicates: Boolean) {
    createManyUser(data: $data, skipDuplicates: $skipDuplicates) {
      count
    }
  }
`;

export const GET_USERS = gql`
  query Users {
    users {
      name
      email
      role
      emailVerified
    }
  }
`;
