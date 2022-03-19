import { useLazyQuery } from "@apollo/client";
import { Module, ModuleWhereUniqueInput } from "@generated/type-graphql";

import { GET_MODULE } from "@/requests/schema/modules";
import { errorNotification, successNotification } from "@/utils";

const useGetModule = (notificationsId: string) => {
  return useLazyQuery<{ module: Module }, { where: ModuleWhereUniqueInput }>(GET_MODULE, {
    fetchPolicy: "no-cache",

    onError: (error) => {
      errorNotification(error.message, notificationsId);
    },
    onCompleted: () => {
      successNotification("Module fetched successfully", notificationsId);
    },
  });
};

export default useGetModule;
