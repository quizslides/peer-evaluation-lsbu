import React, { memo } from "react";

import { User } from "@generated/type-graphql";

import ModuleTeachingMemberForm from "@/forms/ModuleTeachingMemberForm";
import { ModuleTeachingMember } from "@/types/module";

interface IUpdateModuleTeachingMemberForm {
  state: boolean;
  users: User[];
  updateModuleTeachingMember: ModuleTeachingMember;
  isModuleTeachingMemberOwner: boolean;
  updateFormState: (state: boolean) => void;
  onSubmit: (data: ModuleTeachingMember) => void;
}

const UpdateModuleTeachingMemberForm = ({
  state,
  users,
  updateModuleTeachingMember,
  isModuleTeachingMemberOwner,
  updateFormState,
  onSubmit,
}: IUpdateModuleTeachingMemberForm) => {
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
      formTitle={"Update Module Teaching Member"}
      updateFormState={updateFormState}
      onSubmitForm={submitForm}
      data={updateModuleTeachingMember}
      users={users}
      isModuleTeachingMemberOwner={isModuleTeachingMemberOwner}
    />
  );
};

export default memo(UpdateModuleTeachingMemberForm);
