import { useQuery } from "@apollo/client";
import { User } from "@generated/type-graphql";

import { GET_USERS } from "../../schema/user";

import { errorNotification } from "@/utils";

const useGetUsers = () => {
  return useQuery<{ users: User[] }>(GET_USERS, {
    fetchPolicy: "no-cache",
    onError: (error) => {
      errorNotification(error.message);
    },
  });
};

export default useGetUsers;
