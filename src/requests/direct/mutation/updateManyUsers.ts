import { ApolloClient } from "@apollo/client";

import { IUserData } from "../../schema/user";

import updateUser from "./updateUser";

import { TApolloClientType } from "@/graphql/client";

const updateManyUsers = async (apolloClient: ApolloClient<TApolloClientType>, usersData: IUserData[]) => {
  const usersUpdatePromise = usersData.map((userData) => updateUser(apolloClient, userData));

  const response = await Promise.all(usersUpdatePromise);

  const results = response.map((item, index) => {
    if (item.errors) {
      return {
        error: true,
        email: usersData[index].email,
      };
    }

    return undefined;
  });

  const errors = results.filter((result) => result !== undefined);

  return { errors: errors.length ? errors : undefined };
};

export default updateManyUsers;
