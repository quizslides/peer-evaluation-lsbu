import { useLazyQuery } from "@apollo/client";
import { User, UserWhereUniqueInput } from "@generated/type-graphql";

import { GET_SESSION_USER } from "@/requests/schema/user";
import { errorNotification } from "@/utils";

const useGetSessionUser = () => {
  return useLazyQuery<{ users: User }, { where: UserWhereUniqueInput }>(GET_SESSION_USER, {
    fetchPolicy: "no-cache",
    onError: (error) => {
      errorNotification(error.message);
    },
  });
};

export default useGetSessionUser;
