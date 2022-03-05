import { ApolloClient } from "@apollo/client";

import { CREATE_MULTIPLE_USERS, IUserData } from "../../schema/user";

const createMultipleUsers = (apolloClient: ApolloClient<object>, usersData: IUserData[]) => {
  return apolloClient.mutate({
    mutation: CREATE_MULTIPLE_USERS,
    variables: { data: usersData, skipDuplicates: true },
    errorPolicy: "all",
    fetchPolicy: "no-cache",
  });
};

export default createMultipleUsers;
