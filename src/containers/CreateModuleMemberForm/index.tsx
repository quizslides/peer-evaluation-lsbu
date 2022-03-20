import React, { memo } from "react";

import { User } from "@generated/type-graphql";

import ModuleMemberForm from "@/forms/ModuleMemberForm";
import { ModuleMember, initialModuleMember } from "@/types/module";

interface ICreateModuleMemberForm {
  state: boolean;
  updateFormState: (state: boolean) => void;
  onSubmit: (data: ModuleMember) => void;
  users: User[];
}

const CreateModuleMemberForm = ({ state, users, updateFormState, onSubmit }: ICreateModuleMemberForm) => {
  const submitForm = (dataForm: ModuleMember) => {
    onSubmit(dataForm);
    updateFormState(false);
  };

  if (!state) {
    return null;
  }

  return (
    <ModuleMemberForm
      state={state}
      formTitle={"New Module Member"}
      updateFormState={updateFormState}
      onSubmitForm={submitForm}
      data={initialModuleMember}
      users={users}
      isModuleMemberOwner={true}
    />
  );
};

export default memo(CreateModuleMemberForm);
