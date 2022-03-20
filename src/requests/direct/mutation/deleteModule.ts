import { TApolloClientType } from "@/graphql/client";
import { DELETE_MODULE } from "@/requests/schema/modules";

const deleteModule = (apolloClient: TApolloClientType, moduleId: string) => {
  return apolloClient.mutate({
    mutation: DELETE_MODULE,
    variables: {
      where: {
        id: moduleId,
      },
    },
    errorPolicy: "all",
    fetchPolicy: "no-cache",
  });
};

export default deleteModule;
