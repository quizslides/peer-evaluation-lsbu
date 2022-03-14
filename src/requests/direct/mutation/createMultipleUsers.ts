import { TApolloClientType } from "@/graphql/client";
import { CREATE_MULTIPLE_USERS } from "@/requests/schema/user";
import { IUserData } from "@/types/user";

const createMultipleUsers = (apolloClient: TApolloClientType, usersData: IUserData[]) => {
  return apolloClient.mutate({
    mutation: CREATE_MULTIPLE_USERS,
    variables: { data: usersData, skipDuplicates: true },
    errorPolicy: "all",
    fetchPolicy: "no-cache",
  });
};

export default createMultipleUsers;
