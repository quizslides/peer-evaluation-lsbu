import { array, date, mixed, number, object, ref, string } from "yup";

import client from "@/graphql/client";
import moduleExist from "@/requests/direct/query/moduleExist";
import { ModuleStatus, ModuleTeachingMemberRoles, Schools } from "@/types/module";
import { tomorrowDate } from "@/utils/form";
import { Role } from "@/utils/permissions";
import content from "@/utils/validator/content";

const userEmailValidator = {
  email: string()
    .default(content.userEmail.defaultValue)
    .email(content.userEmail.invalid)
    .matches(content.userEmail.regex, content.userEmail.invalidDomainRegex)
    .required(content.userEmail.required),
};

const userNameValidator = {
  name: string()
    .min(2, content.userName.minLength)
    .max(70, content.userName.maxLength)
    .required(content.userName.required),
};

const moduleTeachingMemberNameValidator = {
  name: string(),
};

const moduleTeachingMemberIdValidator = {
  name: string(),
};

const userRoleValidator = {
  role: mixed()
    .oneOf([...Object.keys(Role)], content.userRole.oneOf)
    .required(content.userRole.required),
};

const moduleTitleValidator = {
  title: string()
    .min(2, content.moduleTitle.minLength)
    .max(70, content.moduleTitle.maxLength)
    .required(content.moduleTitle.required),
};

const moduleCodeValidator = {
  moduleCode: string()
    .min(2, content.moduleCode.minLength)
    .max(70, content.moduleCode.maxLength)
    .required(content.moduleCode.required)
    .matches(content.moduleCode.regex, {
      message: content.moduleCode.messageRegex,
    })
    .test({
      name: "unique-module-code",
      message: content.moduleCode.unique,
      test: async (values) => {
        if (values) {
          const { data } = await moduleExist(client, values);
          return !!!data.moduleExist.exist;
        }

        // If backend is not or has not responded, the validation should return false as the input will be invalid
        return false;
      },
    })
    .transform((value) => {
      return value && value.toUpperCase();
    }),
};

const moduleSchoolValidator = {
  schools: array()
    .of(mixed().oneOf([...Object.keys(Schools)]))
    .min(1, content.moduleSchools.minLength)
    .required(content.moduleSchools.required),
};

const moduleStatusValidator = {
  status: mixed()
    .oneOf([...Object.keys(ModuleStatus)], content.moduleStatus.oneOf)
    .required(content.moduleStatus.required),
};

const moduleMaxGradeIncreaseValidator = {
  maxGradeIncrease: number()
    .typeError(content.maxGradeIncrease.typeError)
    .required(content.maxGradeIncrease.required)
    .min(0, content.maxGradeIncrease.min)
    .max(100, content.maxGradeIncrease.max),
};

const moduleMaxGradeDecreaseValidator = {
  maxGradeDecrease: number()
    .typeError(content.maxGradeDecrease.typeError)
    .required(content.maxGradeDecrease.required)
    .min(0, content.maxGradeDecrease.min)
    .max(100, content.maxGradeDecrease.max),
};

const moduleSubmissionsLockDateValidator = {
  submissionsLockDate: date().min(tomorrowDate(), content.submissionsLockDate.min).nullable(),
};

const moduleCriteriaScoreRangeMinValidator = {
  criteriaScoreRangeMin: number()
    .typeError(content.criteriaScoreRangeMin.typeError)
    .required(content.criteriaScoreRangeMin.required)
    .min(0, content.criteriaScoreRangeMin.min)
    .max(100, content.criteriaScoreRangeMin.max),
};

const moduleCriteriaScoreRangeMaxValidator = {
  criteriaScoreRangeMax: number()
    .typeError(content.criteriaScoreRangeMax.typeError)
    .required(content.criteriaScoreRangeMax.required)
    .min(ref("criteriaScoreRangeMin"), content.criteriaScoreRangeMax.min)
    .max(100, content.criteriaScoreRangeMax.max),
};

const moduleEmailTitleValidator = {
  emailTitleReminder: string()
    .matches(content.emailTitleReminder.matchModuleCodeRegex, {
      message: content.emailTitleReminder.matchModuleCode,
    })
    .min(2, content.emailTitleReminder.minLength)
    .max(70, content.emailTitleReminder.maxLength)
    .required(content.emailTitleReminder.required),
};

const moduleEmailBodyValidator = {
  emailBodyReminder: string().matches(content.emailBodyReminder.matchUrlRegex, {
    message: content.emailBodyReminder.matchUrl,
  }),
};

const moduleColumnValidator = {
  description: string()
    .min(2, content.column.minLength)
    .max(70, content.column.maxLength)
    .required(content.column.required),
};

const moduleColumnIdValidator = {
  description: string(),
};

const moduleColumnsValidator = {
  columns: array().min(1, content.columns.minLength),
};

const moduleTeachingMembersValidator = {
  moduleTeachingMembers: array()
    .of(
      object().shape({
        role: string(),
      })
    )
    .test({
      name: "one-owner-teaching-module-member",
      message: content.moduleTeachingMembers.minLength,
      test: (values) => {
        const isOwnerRole = (currentValue: string) => currentValue === "OWNER";

        if (values && values.length) {
          return values.some(({ role }) => isOwnerRole(role || ""));
        }

        return false;
      },
    }),
};

const moduleTeachingMemberRoleValidator = {
  role: mixed()
    .oneOf([...Object.keys(ModuleTeachingMemberRoles)], content.moduleTeachingMemberRole.oneOf)
    .required(content.moduleTeachingMemberRole.required),
};

export {
  moduleCodeValidator,
  moduleColumnIdValidator,
  moduleColumnsValidator,
  moduleColumnValidator,
  moduleCriteriaScoreRangeMaxValidator,
  moduleCriteriaScoreRangeMinValidator,
  moduleEmailBodyValidator,
  moduleEmailTitleValidator,
  moduleMaxGradeDecreaseValidator,
  moduleMaxGradeIncreaseValidator,
  moduleSchoolValidator,
  moduleStatusValidator,
  moduleSubmissionsLockDateValidator,
  moduleTeachingMemberIdValidator,
  moduleTeachingMemberNameValidator,
  moduleTeachingMemberRoleValidator,
  moduleTeachingMembersValidator,
  moduleTitleValidator,
  userEmailValidator,
  userNameValidator,
  userRoleValidator,
};
