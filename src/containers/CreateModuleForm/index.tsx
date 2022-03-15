import React, { useEffect, useState } from "react";

import { useSession } from "next-auth/react";

import { LoadingContainer } from "@/containers";
import { ModuleForm } from "@/forms";
import { IModuleData, initialModuleState } from "@/types/module";
import { loadingNotification } from "@/utils";

interface ICreateUserForm {
  updateFormState: (state: boolean) => void;
}

const CreateModuleForm = ({ updateFormState }: ICreateUserForm) => {
  const { data: session, status } = useSession();

  const [moduleValues, setModuleValues] = useState(initialModuleState);
  // const [createOneUser, { data, loading, reset }] = useCreateOneUser("UserForm");

  const submitForm = (valuesForm: IModuleData) => {
    loadingNotification("Creating module", "ModuleForm");
    console.log(valuesForm);
  };

  const loading = status === "loading";

  useEffect(() => {
    if (session) {
      let moduleValuesUpdated = moduleValues;
      moduleValuesUpdated.moduleMembers[0].email = typeof session.user.email === "string" ? session.user.email : "";
      moduleValuesUpdated.moduleMembers[0].name = typeof session.user.name === "string" ? session.user.name : "";
      setModuleValues(moduleValuesUpdated);
    }
  }, [session, moduleValues]);

  // useEffect(() => {
  //   if (data && !loading) {
  //     updateFormState(false);
  //   }
  // }, [data, loading, reset, updateFormState]);

  if (loading) {
    return <LoadingContainer loading={loading} />;
  }

  return (
    <ModuleForm
      title={moduleValues.title}
      moduleCode={moduleValues.moduleCode}
      schools={moduleValues.schools}
      status={moduleValues.status}
      maxGradeIncrease={moduleValues.maxGradeIncrease}
      maxGradeDecrease={moduleValues.maxGradeDecrease}
      submissionsLockDate={moduleValues.submissionsLockDate}
      reminderEmailTitle={moduleValues.reminderEmailTitle}
      reminderEmailBody={moduleValues.reminderEmailBody}
      criteriaScoreRangeMin={moduleValues.criteriaScoreRangeMin}
      criteriaScoreRangeMax={moduleValues.criteriaScoreRangeMax}
      columns={moduleValues.columns}
      moduleMembers={moduleValues.moduleMembers}
      isNewModule={true}
      updateFormState={updateFormState}
      onSubmitForm={submitForm}
    />
  );
};

export default CreateModuleForm;
