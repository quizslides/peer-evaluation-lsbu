import { useMutation } from "@apollo/client";
import { UserCreateInput } from "@generated/type-graphql";

import { CREATE_ONE_USER } from "@/requests/schema/user";
import { IUserData } from "@/types/user";
import { errorNotification, successNotification } from "@/utils";

const useCreateOneUser = (notificationsId: string) => {
  return useMutation<
    {
      createUser: UserCreateInput;
    },
    { data: IUserData }
  >(CREATE_ONE_USER, {
    fetchPolicy: "no-cache",
    onError: (error) => {
      errorNotification(error.message, notificationsId);
    },
    onCompleted: () => {
      successNotification("User created successfully", notificationsId);
    },
  });
};

export default useCreateOneUser;
