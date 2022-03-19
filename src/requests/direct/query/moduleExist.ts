import { TApolloClientType } from "@/graphql/client";
import { ModuleExistResponse } from "@/pages/api/resolvers/module";
import { MODULE_EXIST } from "@/requests/schema/modules";

const moduleExist = (apolloClient: TApolloClientType, moduleCodeId: string) => {
  return apolloClient.query<{ moduleExist: ModuleExistResponse }>({
    query: MODULE_EXIST,
    errorPolicy: "all",
    fetchPolicy: "no-cache",
    variables: {
      where: {
        moduleCode: moduleCodeId,
      },
    },
  });
};

export default moduleExist;
