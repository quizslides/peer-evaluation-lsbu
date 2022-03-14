import React, { useEffect } from "react";

import { UserForm } from "@/forms";
import useCreateOneUser from "@/requests/hooks/mutations/useCreateOneUser";
import { IUserData, initialUserState } from "@/types/user";
import { loadingNotification } from "@/utils";

interface ICreateUserForm {
  state: boolean;
  updateUserFormState: (state: boolean) => void;
}

const CreateUserForm = ({ state, updateUserFormState }: ICreateUserForm) => {
  const [createOneUser, { data, loading, reset }] = useCreateOneUser("UserForm");

  const submitForm = (userValuesForm: IUserData) => {
    loadingNotification("Creating user...", "UserForm");
    createOneUser({ variables: { data: userValuesForm } });
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
      email={initialUserState.email}
      name={initialUserState.name}
      role={initialUserState.role}
      updateUserFormState={updateUserFormState}
      formTitle="New user"
      state={state}
      onSubmitForm={submitForm}
    />
  );
};

export default CreateUserForm;
