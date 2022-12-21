import { useQuery } from "@apollo/client";
import { User } from "@generated/type-graphql";

import { GET_USERS_LECTURER } from "@/requests/schema/user";
import { errorNotification } from "@/utils";

const useGetLecturerUsers = () => {
  return useQuery<{ usersLecturer: User[] }>(GET_USERS_LECTURER, {
    fetchPolicy: "no-cache",
    onError: (error) => {
      errorNotification(error.message);
    },
  });
};

export default useGetLecturerUsers;
