import React, { memo } from "react";

import ModuleMemberForm from "@/forms/ModuleMemberForm";
import { ModuleMember } from "@/types/module";
import { IUserData } from "@/types/user";

interface IUpdateModuleMemberForm {
  state: boolean;
  updateFormState: (state: boolean) => void;
  onSubmit: (data: ModuleMember) => void;
  users: IUserData[];
  updateModuleMember: ModuleMember;
}

const UpdateModuleMemberForm = ({
  state,
  users,
  updateModuleMember,
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
    />
  );
};

export default memo(UpdateModuleMemberForm);
