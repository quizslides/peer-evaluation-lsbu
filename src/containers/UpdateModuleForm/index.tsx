import React, { memo, useEffect, useState } from "react";

import { useApolloClient } from "@apollo/client";
import { Session } from "next-auth";
import { useSession } from "next-auth/react";

import LoadingContainer from "@/containers/LoadingContainer";
import { ModuleForm } from "@/forms";
import updateModule from "@/requests/direct/mutation/updateModule";
import useGetModule from "@/requests/hooks/query/useGetModule";
import { sanitizeModuleDataOnFetch, sanitizeModuleDataOnUpdate } from "@/transformers/module";
import { IModuleData, ModuleTeachingMember, ModuleTeachingMemberRoles } from "@/types/module";
import { Role, blankNotification, errorNotification, loadingNotification, successNotification } from "@/utils";

interface IUpdateUserForm {
  onSubmit: () => void;
  onCancel: () => void;
  moduleId: string;
  setError: () => void;
}

const UpdateModuleForm = ({ onSubmit, onCancel, setError, moduleId }: IUpdateUserForm) => {
  const apolloClient = useApolloClient();

  const [moduleValues, setModuleValues] = useState<IModuleData | null>(null);

  const [isModuleViewOnly, setModuleViewOnly] = useState<boolean | null>(null);

  const [module, { loading: loadingFetch, error, data }] = useGetModule("UpdateModule");

  const { data: session, status } = useSession();

  const submitForm = async (valuesForm: IModuleData) => {
    loadingNotification("Updating module", "UpdateModuleForm");

    const moduleDataSanitizedOnUpdate = sanitizeModuleDataOnUpdate(valuesForm);

    const { errors } = await updateModule(apolloClient, moduleDataSanitizedOnUpdate, moduleId);

    if (!errors) {
      successNotification("Module updated successfully", "UpdateModuleForm");
    } else {
      // TODO: Create a granular error notification to the user with all the errors
      errorNotification("Error updating module", "UpdateModuleForm");
    }

    onSubmit();
  };

  const isModuleTeachingMemberViewOnly = (
    moduleTeachingMember: ModuleTeachingMember[] | undefined,
    session: Session
  ) => {
    if (session.user.role === Role.ADMIN) {
      return false;
    }

    if (moduleTeachingMember) {
      const userModuleTeachingMember = moduleTeachingMember.filter(({ email }) => email === session?.user.email);
      if (userModuleTeachingMember.length) {
        return userModuleTeachingMember[0].role === ModuleTeachingMemberRoles.VIEWER;
      }
    }

    return false;
  };

  const isLoading = status === "loading" || loadingFetch || !moduleValues;

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
    if (data && session) {
      const sanitizedModuleDataOnFetch = sanitizeModuleDataOnFetch(data.module);
      setModuleValues(sanitizedModuleDataOnFetch || null);
      setModuleViewOnly(isModuleTeachingMemberViewOnly(sanitizedModuleDataOnFetch?.moduleTeachingMembers, session));
    }
  }, [data, session]);

  useEffect(() => {
    if (isModuleViewOnly) {
      blankNotification("You have permission view only permission view only of this module");
    }
  }, [isModuleViewOnly]);

  if (isLoading) {
    return <LoadingContainer loading={isLoading} />;
  }

  return (
    <ModuleForm
      isNewModule={false}
      isViewOnly={!!isModuleViewOnly}
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
      moduleTeachingMembers={moduleValues.moduleTeachingMembers}
      onSubmitForm={submitForm}
      onCancelForm={onCancel}
    />
  );
};

export default memo(UpdateModuleForm);
