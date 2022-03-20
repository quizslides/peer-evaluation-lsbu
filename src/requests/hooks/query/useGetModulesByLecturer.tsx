import { useLazyQuery } from "@apollo/client";
import { Module } from "@generated/type-graphql";

import { ModulesByLecturerWhereInput } from "@/pages/api/resolvers/module";
import { GET_MODULES_BY_LECTURER } from "@/requests/schema/modules";
import { errorNotification, successNotification } from "@/utils";

const useGetModulesByLecturer = (notificationsId: string) => {
  return useLazyQuery<{ modulesByLecturer: Module[] }, { where: ModulesByLecturerWhereInput }>(
    GET_MODULES_BY_LECTURER,
    {
      fetchPolicy: "no-cache",
      onError: (error) => {
        errorNotification(error.message, notificationsId);
      },
      onCompleted: () => {
        successNotification("Module fetched successfully", notificationsId);
      },
    }
  );
};

export default useGetModulesByLecturer;
