import React, { useEffect, useState } from "react";

import { useApolloClient } from "@apollo/client";
import { Session } from "next-auth";
import { useSession } from "next-auth/react";

import { LoadingContainer } from "@/containers";
import { ModuleForm } from "@/forms";
import createModule from "@/requests/direct/mutation/createModule";
import { sanitizeModuleDataOnCreate } from "@/transformers/module";
import { IModuleData, initialModuleState } from "@/types/module";
import { errorNotification, loadingNotification, successNotification } from "@/utils";

interface ICreateUserForm {
  onSubmit: () => void;
}

const CreateModuleForm = ({ onSubmit }: ICreateUserForm) => {
  const { data: session, status } = useSession();

  const apolloClient = useApolloClient();

  const [moduleValues, setModuleValues] = useState(initialModuleState);

  const submitForm = async (valuesForm: IModuleData) => {
    loadingNotification("Creating module", "CreateModuleForm");

    const moduleDataSanitizedOnCreate = sanitizeModuleDataOnCreate(valuesForm);

    const { errors } = await createModule(apolloClient, moduleDataSanitizedOnCreate);

    if (!errors) {
      successNotification("Module created successfully", "CreateModuleForm");
    } else {
      // TODO: Create a granular error notification to the user with all the errors
      errorNotification("Error creating module", "CreateModuleForm");
    }

    onSubmit();
  };

  const loading = status === "loading";

  useEffect(() => {
    if (session) {
      const setCurrentUserAsOwner = (moduleData: IModuleData, session: Session) => {
        moduleData.moduleMembers[0].email = typeof session.user.email === "string" ? session.user.email : "";
        moduleData.moduleMembers[0].name = typeof session.user.name === "string" ? session.user.name : "";
        moduleData.moduleMembers[0].id = typeof session.user.id === "string" ? session.user.id : "";
        setModuleValues(moduleData);
      };

      const moduleValuesUpdated = moduleValues;

      setCurrentUserAsOwner(moduleValuesUpdated, session);
    }
  }, [session, moduleValues]);

  if (loading) {
    return <LoadingContainer loading={loading} />;
  }

  return (
    <ModuleForm
      isNewModule={true}
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
    />
  );
};

export default CreateModuleForm;
