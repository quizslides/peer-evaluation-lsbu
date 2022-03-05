import { ApolloClient } from "@apollo/client";

import { CREATE_MULTIPLE_USERS, IUserData } from "../../schema/user";

import { TApolloClientType } from "@/graphql/client";

const createMultipleUsers = (apolloClient: ApolloClient<TApolloClientType>, usersData: IUserData[]) => {
  return apolloClient.mutate({
    mutation: CREATE_MULTIPLE_USERS,
    variables: { data: usersData, skipDuplicates: true },
    errorPolicy: "all",
    fetchPolicy: "no-cache",
  });
};

export default createMultipleUsers;
