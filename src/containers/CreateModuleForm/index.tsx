import React, { useEffect } from "react";

import { ModuleForm } from "@/forms";
import useCreateOneUser from "@/requests/hooks/mutations/useCreateOneUser";
import { initialModuleState } from "@/types/module";
import { loadingNotification } from "@/utils";

interface ICreateUserForm {
  state: boolean;
  updateFormState: (state: boolean) => void;
}

const CreateModuleForm = ({ state, updateFormState }: ICreateUserForm) => {
  const [createOneUser, { data, loading, reset }] = useCreateOneUser("UserForm");

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const submitForm = (userValuesForm: any) => {
    loadingNotification("Creating module", "UserForm");
    createOneUser({ variables: { data: userValuesForm } });
  };

  useEffect(() => {
    if (data && !loading) {
      updateFormState(false);
    }
  }, [data, loading, reset, updateFormState]);

  if (!state) {
    return null;
  }

  return (
    <ModuleForm
      title={initialModuleState.title}
      moduleCode={initialModuleState.moduleCode}
      schools={initialModuleState.schools}
      status={initialModuleState.status}
      maxGradeIncrease={initialModuleState.maxGradeIncrease}
      maxGradeDecrease={initialModuleState.maxGradeDecrease}
      submissionsLockDate={initialModuleState.submissionsLockDate}
      reminderEmailTitle={initialModuleState.reminderEmailTitle}
      reminderEmailBody={initialModuleState.reminderEmailBody}
      criteriaScoreRangeMin={initialModuleState.criteriaScoreRangeMin}
      criteriaScoreRangeMax={initialModuleState.criteriaScoreRangeMax}
      isNewModule={true}
      updateFormState={updateFormState}
      state={state}
      onSubmitForm={submitForm}
    />
  );
};

export default CreateModuleForm;
