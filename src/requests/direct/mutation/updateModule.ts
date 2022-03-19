import { ModuleUpdateInput } from "@generated/type-graphql";

import { TApolloClientType } from "@/graphql/client";
import { UPDATE_MODULE } from "@/requests/schema/modules";

const updateModule = (apolloClient: TApolloClientType, moduleData: ModuleUpdateInput) => {
  return apolloClient.mutate({
    mutation: UPDATE_MODULE,
    variables: {
      data: moduleData,
      where: {
        moduleCode: moduleData.id,
      },
    },
    errorPolicy: "all",
    fetchPolicy: "no-cache",
  });
};

export default updateModule;
