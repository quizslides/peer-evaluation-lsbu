import { TApolloClientType } from "@/graphql/client";
import updateUser from "@/requests/direct/mutation/updateUser";
import { IUserData } from "@/types/user";

const updateManyUsers = async (apolloClient: TApolloClientType, usersData: IUserData[]) => {
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
