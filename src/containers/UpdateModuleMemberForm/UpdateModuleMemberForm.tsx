import React, { memo } from "react";

import ModuleMemberForm from "@/forms/ModuleMemberForm";
import { ModuleMember } from "@/types/module";
import { IUserData } from "@/types/user";

interface IUpdateModuleMemberForm {
  state: boolean;
  users: IUserData[];
  updateModuleMember: ModuleMember;
  isModuleMemberOwner: boolean;
  updateFormState: (state: boolean) => void;
  onSubmit: (data: ModuleMember) => void;
}

const UpdateModuleMemberForm = ({
  state,
  users,
  updateModuleMember,
  isModuleMemberOwner,
  updateFormState,
  onSubmit,
}: IUpdateModuleMemberForm) => {
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
      formTitle={"Update Module Member"}
      updateFormState={updateFormState}
      onSubmitForm={submitForm}
      data={updateModuleMember}
      users={users}
      isModuleMemberOwner={isModuleMemberOwner}
    />
  );
};

export default memo(UpdateModuleMemberForm);
