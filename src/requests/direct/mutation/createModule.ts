import { ModuleCreateInput } from "@generated/type-graphql";

import { TApolloClientType } from "@/graphql/client";
import { CREATE_MODULE } from "@/requests/schema/modules";

const createModule = (apolloClient: TApolloClientType, moduleData: ModuleCreateInput) => {
  return apolloClient.mutate({
    mutation: CREATE_MODULE,
    variables: { data: moduleData },
    errorPolicy: "all",
    fetchPolicy: "no-cache",
  });
};

export default createModule;
