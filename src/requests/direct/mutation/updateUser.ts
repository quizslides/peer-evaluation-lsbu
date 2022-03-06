import { IUserData, UPDATE_USER } from "../../schema/user";

import { TApolloClientType } from "@/graphql/client";

const updateUser = (apolloClient: TApolloClientType, userData: IUserData) => {
  return apolloClient.mutate({
    mutation: UPDATE_USER,
    variables: {
      data: {
        name: {
          set: userData.name,
        },
        role: {
          set: userData.role,
        },
        email: {
          set: userData.email,
        },
      },
      where: {
        email: userData.email,
      },
    },
    errorPolicy: "all",
    fetchPolicy: "no-cache",
  });
};

export default updateUser;
