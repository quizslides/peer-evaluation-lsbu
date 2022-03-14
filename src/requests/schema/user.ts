import { gql } from "@apollo/client";

export const CREATE_MULTIPLE_USERS = gql`
  mutation CreateMultipleUser($data: [UserCreateManyInput!]!, $skipDuplicates: Boolean) {
    createManyUser(data: $data, skipDuplicates: $skipDuplicates) {
      count
    }
  }
`;

export const CREATE_ONE_USER = gql`
  mutation CreateOneUser($data: UserCreateInput!) {
    createUser(data: $data) {
      name
      email
      role
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

export const UPDATE_USER = gql`
  mutation UpdateUser($data: UserUpdateInput!, $where: UserWhereUniqueInput!) {
    updateUser(data: $data, where: $where) {
      name
      email
      role
    }
  }
`;

export const DELETE_USERS = gql`
  mutation Mutation($where: UserWhereInput) {
    deleteManyUser(where: $where) {
      count
    }
  }
`;

export const GROUP_BY_USER = gql`
  query GroupByUser($by: [UserScalarFieldEnum!]!, $where: UserWhereInput) {
    groupByUser(by: $by, where: $where) {
      email
    }
  }
`;
