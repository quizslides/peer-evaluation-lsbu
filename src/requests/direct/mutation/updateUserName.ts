import { TApolloClientType } from "@/graphql/client";
import { UPDATE_USER } from "@/requests/schema/user";

const updateUserName = (apolloClient: TApolloClientType, userName: string, userEmail: string) => {
  return apolloClient.mutate({
    mutation: UPDATE_USER,
    variables: {
      data: {
        name: {
          set: userName,
        },
      },
      where: {
        email: userEmail,
      },
    },
    errorPolicy: "all",
    fetchPolicy: "no-cache",
  });
};

export default updateUserName;
