import React, { memo } from "react";

import { User } from "@generated/type-graphql";

import ModuleTeachingMemberForm from "@/forms/ModuleTeachingMemberForm";
import { ModuleTeachingMember, initialModuleTeachingMember } from "@/types/module";

interface ICreateModuleTeachingMemberForm {
  state: boolean;
  updateFormState: (state: boolean) => void;
  onSubmit: (data: ModuleTeachingMember) => void;
  users: User[];
}

const CreateModuleTeachingMemberForm = ({
  state,
  users,
  updateFormState,
  onSubmit,
}: ICreateModuleTeachingMemberForm) => {
  const submitForm = (dataForm: ModuleTeachingMember) => {
    onSubmit(dataForm);
    updateFormState(false);
  };

  if (!state) {
    return null;
  }

  return (
    <ModuleTeachingMemberForm
      state={state}
      formTitle={"New Module Teaching Member"}
      updateFormState={updateFormState}
      onSubmitForm={submitForm}
      data={initialModuleTeachingMember}
      users={users}
      isModuleTeachingMemberOwner={true}
    />
  );
};

export default memo(CreateModuleTeachingMemberForm);
