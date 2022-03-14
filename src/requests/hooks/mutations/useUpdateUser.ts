import { useMutation } from "@apollo/client";
import { User, UserUpdateInput, UserWhereUniqueInput } from "@generated/type-graphql";

import { UPDATE_USER } from "@/requests/schema/user";
import { errorNotification, successNotification } from "@/utils";

const useUpdateUser = (notificationsId: string) => {
  return useMutation<
    {
      updateUser: User;
    },
    { data: UserUpdateInput; where: UserWhereUniqueInput }
  >(UPDATE_USER, {
    fetchPolicy: "no-cache",
    onError: (error) => {
      errorNotification(error.message, notificationsId);
    },
    onCompleted: () => {
      successNotification("User updated successfully", notificationsId);
    },
  });
};

export default useUpdateUser;
