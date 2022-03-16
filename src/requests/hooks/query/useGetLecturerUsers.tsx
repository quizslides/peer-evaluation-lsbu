import { useQuery } from "@apollo/client";
import { User } from "@generated/type-graphql";

import { GET_LECTURER_USERS } from "@/requests/schema/user";
import { errorNotification } from "@/utils";

const useGetLecturerUsers = () => {
  return useQuery<{ users: User[] }>(GET_LECTURER_USERS, {
    fetchPolicy: "no-cache",
    variables: {
      where: {
        role: {
          in: ["LECTURER"],
        },
      },
    },
    onError: (error) => {
      errorNotification(error.message);
    },
  });
};

export default useGetLecturerUsers;
