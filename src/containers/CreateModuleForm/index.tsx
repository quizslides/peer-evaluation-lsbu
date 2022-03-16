import React, { useEffect, useState } from "react";

import { useApolloClient } from "@apollo/client";
import { Session } from "next-auth";
import { useSession } from "next-auth/react";

import { LoadingContainer } from "@/containers";
import { ModuleForm } from "@/forms";
import createModule from "@/requests/direct/mutation/createModule";
import { IModuleData, initialModuleState } from "@/types/module";
import { loadingNotification } from "@/utils";

interface ICreateUserForm {
  onSubmit: () => void;
}

const CreateModuleForm = ({ onSubmit }: ICreateUserForm) => {
  const { data: session, status } = useSession();

  const apolloClient = useApolloClient();

  const [moduleValues, setModuleValues] = useState(initialModuleState);

  const submitForm = (valuesForm: IModuleData) => {
    loadingNotification("Creating module", "CreateModuleForm");
    console.log(valuesForm);

    // const dataSubmitted = {
    //   title: "Test Module",
    //   moduleCode: "test_0001",
    //   status: "DRAFT",

    //   schools: ["LSBU_BUSINESS_SCHOOL"],
    //   reminderEmailTitle: "Peer Evaluation Reminder - {{moduleCode}}",
    //   reminderEmailBody: "<p>Email body {{peerEvaluationUrl}}</p>",

    //   columns: [
    //     {
    //       id: "column1",
    //       status: "NEW",
    //       description: "Attends group meetings regularly and on time",
    //       createdAt: "2022-03-16T01:30:49.803Z",
    //       updatedAt: "2022-03-16T01:30:49.803Z",
    //     },
    //     {
    //       id: "column2",
    //       status: "NEW",
    //       description: "Contributes significantly towards the success of the project",
    //       createdAt: "2022-03-16T01:30:49.803Z",
    //       updatedAt: "2022-03-16T01:30:49.803Z",
    //     },
    //     {
    //       id: "column3",
    //       status: "NEW",
    //       description: "Completes assigned tasks on time and to good quality",
    //       createdAt: "2022-03-16T01:30:49.803Z",
    //       updatedAt: "2022-03-16T01:30:49.803Z",
    //     },
    //     {
    //       id: "column4",
    //       status: "NEW",
    //       description: "Cooperative and supportive attitude towards team",
    //       createdAt: "2022-03-16T01:30:49.803Z",
    //       updatedAt: "2022-03-16T01:30:49.803Z",
    //     },
    //     {
    //       id: "column5",
    //       status: "NEW",
    //       description: "Listens and contributes meaningfully in team discussions",
    //       createdAt: "2022-03-16T01:30:49.803Z",
    //       updatedAt: "2022-03-16T01:30:49.803Z",
    //     },
    //   ],
    //   moduleMembers: [
    //     {
    //       name: "Administrator",
    //       email: "local@gmail.com",
    //       permission: "OWNER",
    //     },
    //   ],
    // };

    // const sanitizeModuleInput = () => {
    //   const data = {
    //     title: dataSubmitted.title,
    //     moduleCode: dataSubmitted.moduleCode,
    //     status: dataSubmitted.status,
    //     maxGradeIncrease: dataSubmitted.maxGradeIncrease,
    //     maxGradeDecrease: dataSubmitted.maxGradeDecrease,
    //     submissionsLockDate: dataSubmitted.submissionsLockDate ? new Date(dataSubmitted.submissionsLockDate) : null,
    //     criteriaScoreRangeMin: dataSubmitted.criteriaScoreRangeMin,
    //     criteriaScoreRangeMax: dataSubmitted.criteriaScoreRangeMax,
    //   };
    // };

    // const test = {
    //   schools: {
    //     set: [
    //       "INSTITUTE_OF_HEALTH_AND_SOCIAL_CARE",
    //       "LSBU_BUSINESS_SCHOOL",
    //       "SCHOOL_OF_APPLIED_SCIENCES",
    //       "SCHOOL_OF_ARTS_AND_CREATIVE_INDUSTRIES",
    //       "SCHOOL_OF_ENGINEERING",
    //       "SCHOOL_OF_LAW_AND_SOCIAL_SCIENCES",
    //       "SCHOOL_OF_THE_BUILT_ENVIRONMENT_AND_ARCHITECTURE",
    //     ],
    //   },
    //   moduleMembers: {
    //     create: [
    //       {
    //         permission: "OWNER",
    //         user: {
    //           connect: {
    //             email: "local@gmail.com",
    //           },
    //         },
    //       },
    //     ],
    //   },
    //   columns: {
    //     create: [
    //       {
    //         description: "Column A",
    //       },
    //       {
    //         description: "Column B",
    //       },
    //     ],
    //   },
    //   reminderEmail: {
    //     create: {
    //       title: "null",
    //       body: "null",
    //     },
    //   },
    // };

    // createModule(apolloClient, {
    //   title: "Example Module",
    //   moduleCode: "jcbd_0016",
    //   status: "DRAFT",
    //   maxGradeIncrease: 10,
    //   maxGradeDecrease: 100,
    //   submissionsLockDate: new Date("12/31/2024"),
    //   criteriaScoreRangeMin: 0,
    //   criteriaScoreRangeMax: 10,
    //   schools: {
    //     set: [
    //       "INSTITUTE_OF_HEALTH_AND_SOCIAL_CARE",
    //       "LSBU_BUSINESS_SCHOOL",
    //       "SCHOOL_OF_APPLIED_SCIENCES",
    //       "SCHOOL_OF_ARTS_AND_CREATIVE_INDUSTRIES",
    //       "SCHOOL_OF_ENGINEERING",
    //       "SCHOOL_OF_LAW_AND_SOCIAL_SCIENCES",
    //       "SCHOOL_OF_THE_BUILT_ENVIRONMENT_AND_ARCHITECTURE",
    //     ],
    //   },
    //   moduleMembers: {
    //     create: [
    //       {
    //         permission: "OWNER",
    //         user: {
    //           connect: {
    //             email: "local@gmail.com",
    //           },
    //         },
    //       },
    //     ],
    //   },
    //   columns: {
    //     create: [
    //       {
    //         description: "Column A",
    //       },
    //       {
    //         description: "Column B",
    //       },
    //     ],
    //   },
    //   reminderEmail: {
    //     create: {
    //       title: "null",
    //       body: "null",
    //     },
    //   },
    // });
    // onSubmit();
  };

  const loading = status === "loading";

  useEffect(() => {
    if (session) {
      const setCurrentUserAsOwner = (moduleData: IModuleData, session: Session) => {
        moduleData.moduleMembers[0].email = typeof session.user.email === "string" ? session.user.email : "";
        moduleData.moduleMembers[0].name = typeof session.user.name === "string" ? session.user.name : "";
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
      reminderEmailTitle={moduleValues.reminderEmailTitle}
      reminderEmailBody={moduleValues.reminderEmailBody}
      criteriaScoreRangeMin={moduleValues.criteriaScoreRangeMin}
      criteriaScoreRangeMax={moduleValues.criteriaScoreRangeMax}
      columns={moduleValues.columns}
      moduleMembers={moduleValues.moduleMembers}
      onSubmitForm={submitForm}
    />
  );
};

export default CreateModuleForm;
