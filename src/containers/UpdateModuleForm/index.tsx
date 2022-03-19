import React, { memo, useEffect, useState } from "react";

import { useApolloClient } from "@apollo/client";
import { Session } from "next-auth";
import { useSession } from "next-auth/react";

import LoadingContainer from "@/containers/LoadingContainer";
import { ModuleForm } from "@/forms";
import updateModule from "@/requests/direct/mutation/updateModule";
import useGetModule from "@/requests/hooks/query/useGetModule";
import { sanitizeModuleDataOnFetch, sanitizeModuleDataOnUpdate } from "@/transformers/module";
import { IModuleData, initialModuleState } from "@/types/module";
import { errorNotification, loadingNotification, successNotification } from "@/utils";

interface IUpdateUserForm {
  onSubmit: () => void;
  onCancel: () => void;
  moduleId: string;
  setError: () => void;
}

const UpdateModuleForm = ({ onSubmit, onCancel, setError, moduleId }: IUpdateUserForm) => {
  const apolloClient = useApolloClient();

  const [moduleValues, setModuleValues] = useState<IModuleData | null>(null);

  const [module, { loading, error, data }] = useGetModule("UpdateModule");

  const submitForm = async (valuesForm: IModuleData) => {
    loadingNotification("Creating module", "UpdateModuleForm");

    const moduleDataSanitizedOnUpdate = sanitizeModuleDataOnUpdate(valuesForm);

    const { errors } = await updateModule(apolloClient, moduleDataSanitizedOnUpdate);

    if (!errors) {
      successNotification("Module updated successfully", "UpdateModuleForm");
    } else {
      // TODO: Create a granular error notification to the user with all the errors
      errorNotification("Error updating module", "UpdateModuleForm");
    }

    onSubmit();
  };

  useEffect(() => {
    module({
      variables: {
        where: {
          id: moduleId,
        },
      },
    });
  }, [module, moduleId]);

  useEffect(() => {
    if (error) {
      setError();
    }
  }, [error, setError]);

  useEffect(() => {
    if (data) {
      const sanitizedModuleDataOnFetch = sanitizeModuleDataOnFetch(data.module);
      setModuleValues(sanitizedModuleDataOnFetch || null);
    }
  }, [data]);

  const isLoading = loading || !moduleValues;

  if (isLoading) {
    return <LoadingContainer loading={isLoading} />;
  }

  return (
    <ModuleForm
      isNewModule={false}
      title={moduleValues.title}
      moduleCode={moduleValues.moduleCode}
      schools={moduleValues.schools}
      status={moduleValues.status}
      maxGradeIncrease={moduleValues.maxGradeIncrease}
      maxGradeDecrease={moduleValues.maxGradeDecrease}
      submissionsLockDate={moduleValues.submissionsLockDate}
      emailTitleReminder={moduleValues.emailTitleReminder}
      emailBodyReminder={moduleValues.emailBodyReminder}
      criteriaScoreRangeMin={moduleValues.criteriaScoreRangeMin}
      criteriaScoreRangeMax={moduleValues.criteriaScoreRangeMax}
      columns={moduleValues.columns}
      moduleMembers={moduleValues.moduleMembers}
      onSubmitForm={submitForm}
      onCancelForm={onCancel}
    />
  );
};

export default memo(UpdateModuleForm);
