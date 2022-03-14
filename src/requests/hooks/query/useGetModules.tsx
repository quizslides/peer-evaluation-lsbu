import { useQuery } from "@apollo/client";
import { Module } from "@generated/type-graphql";

import { GET_MODULES } from "@/requests/schema/modules";
import { errorNotification } from "@/utils";

const useGetModules = () => {
  return useQuery<{ modules: Module[] }>(GET_MODULES, {
    fetchPolicy: "no-cache",
    onError: (error) => {
      errorNotification(error.message);
    },
  });
};

export default useGetModules;
