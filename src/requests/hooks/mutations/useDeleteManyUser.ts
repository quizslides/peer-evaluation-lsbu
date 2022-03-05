import { useMutation } from "@apollo/client";
import { AffectedRowsOutput, UserWhereInput } from "@generated/type-graphql";

import { DELETE_USERS } from "../../schema/user";

import { errorNotification, successNotification } from "@/utils";

const useDeleteManyUser = (notificationsId: string) => {
  return useMutation<
    {
      deleteManyUser: AffectedRowsOutput;
    },
    { where: UserWhereInput }
  >(DELETE_USERS, {
    fetchPolicy: "no-cache",
    onError: (error) => {
      errorNotification(error.message, notificationsId);
    },
    onCompleted: () => {
      successNotification("Users deleted successfully", notificationsId);
    },
  });
};

export default useDeleteManyUser;
