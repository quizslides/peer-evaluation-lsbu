import { gql } from "@apollo/client";

const CREATE_MULTIPLE_USERS = gql`
  mutation CreateMultipleUser($data: [UserCreateManyInput!]!, $skipDuplicates: Boolean) {
    createManyUser(data: $data, skipDuplicates: $skipDuplicates) {
      count
    }
  }
`;

const CREATE_ONE_USER = gql`
  mutation CreateOneUser($data: UserCreateInput!) {
    createUser(data: $data) {
      name
      email
      role
    }
  }
`;

const GET_USERS = gql`
  query Users {
    users {
      name
      email
      role
      emailVerified
    }
  }
`;

const UPDATE_USER = gql`
  mutation UpdateUser($data: UserUpdateInput!, $where: UserWhereUniqueInput!) {
    updateUser(data: $data, where: $where) {
      name
      email
      role
    }
  }
`;

const DELETE_USERS = gql`
  mutation Mutation($where: UserWhereInput) {
    deleteManyUser(where: $where) {
      count
    }
  }
`;

const GROUP_BY_USER = gql`
  query GroupByUser($by: [UserScalarFieldEnum!]!, $where: UserWhereInput) {
    groupByUser(by: $by, where: $where) {
      email
      id
    }
  }
`;

const GET_LECTURER_USERS = gql`
  query Users($where: UserWhereInput) {
    users(where: $where) {
      id
      name
      email
      role
    }
  }
`;

const GET_SESSION_USER = gql`
  query SessionUser($where: UserWhereUniqueInput!) {
    user(where: $where) {
      id
      createdAt
      updatedAt
      name
      email
      role
      emailVerified
    }
  }
`;

export {
  CREATE_MULTIPLE_USERS,
  CREATE_ONE_USER,
  DELETE_USERS,
  GET_LECTURER_USERS,
  GET_SESSION_USER,
  GET_USERS,
  GROUP_BY_USER,
  UPDATE_USER,
};
