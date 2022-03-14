import { useMutation } from "@apollo/client";
import { AffectedRowsOutput } from "@generated/type-graphql";

import { CREATE_MULTIPLE_USERS } from "@/requests/schema/user";
import { IUserData } from "@/types/user";
import { errorNotification, successNotification } from "@/utils";

const useCreateMultipleUsers = (usersData: IUserData[], notificationsId: string) => {
  return useMutation<
    {
      createUser: AffectedRowsOutput;
    },
    { data: IUserData[]; skipDuplicates: boolean }
  >(CREATE_MULTIPLE_USERS, {
    fetchPolicy: "no-cache",
    variables: { data: usersData, skipDuplicates: true },
    onError: (error) => {
      errorNotification(error.message, notificationsId);
    },
    onCompleted: () => {
      successNotification("User created successfully", notificationsId);
    },
  });
};

export default useCreateMultipleUsers;
