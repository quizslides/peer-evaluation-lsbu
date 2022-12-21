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
    createOneUser(data: $data) {
      name
      email
      role
    }
  }
`;

const GET_USERS = gql`
  query Users($orderBy: [UserOrderByWithRelationInput!]) {
    users(orderBy: $orderBy) {
      _count {
        peerEvaluationStudentList
        peerEvaluationTeachingMembers
      }
      createdAt
      email
      emailVerified
      name
      role
    }
  }
`;

const UPDATE_USER = gql`
  mutation UpdateOneUser($data: UserUpdateInput!, $where: UserWhereUniqueInput!) {
    updateOneUser(data: $data, where: $where) {
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
  query GroupByUser(
    $by: [UserScalarFieldEnum!]!
    $where: UserWhereInput
    $orderBy: [UserOrderByWithAggregationInput!]
  ) {
    groupByUser(by: $by, where: $where, orderBy: $orderBy) {
      email
      id
    }
  }
`;

const GET_USERS_LECTURER = gql`
  query UsersLecturer {
    usersLecturer {
      id
      name
      email
      role
    }
  }
`;

export {
  CREATE_MULTIPLE_USERS,
  CREATE_ONE_USER,
  DELETE_USERS,
  GET_USERS,
  GET_USERS_LECTURER,
  GROUP_BY_USER,
  UPDATE_USER,
};
