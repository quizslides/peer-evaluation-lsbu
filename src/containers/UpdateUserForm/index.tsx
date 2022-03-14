import React, { useEffect } from "react";

import { UserForm } from "@/forms";
import useUpdateUser from "@/requests/hooks/mutations/useUpdateUser";
import { IUserData } from "@/types/user";
import { Role, loadingNotification } from "@/utils";

interface IUpdateUserForm extends IUserData {
  state: boolean;
  updateUserFormState: (state: boolean) => void;
}

const UpdateUserForm = ({ email, name, role, state, updateUserFormState }: IUpdateUserForm) => {
  const [updateUser, { data, loading, reset }] = useUpdateUser("UserForm");

  const submitForm = (userValuesForm: IUserData) => {
    loadingNotification("Updating user...", "UserForm");
    updateUser({
      variables: {
        data: {
          name: {
            set: userValuesForm.name,
          },
          role: {
            set: userValuesForm.role as Role,
          },
          email: {
            set: userValuesForm.email,
          },
        },
        where: {
          email: email,
        },
      },
    });
  };

  useEffect(() => {
    if (data && !loading) {
      updateUserFormState(false);
    }
  }, [data, loading, reset, updateUserFormState]);

  if (!state) {
    return null;
  }

  return (
    <UserForm
      email={email}
      name={name}
      role={role}
      updateUserFormState={updateUserFormState}
      formTitle="Update user"
      state={state}
      onSubmitForm={submitForm}
    />
  );
};

export default UpdateUserForm;
