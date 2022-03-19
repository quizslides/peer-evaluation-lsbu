import { array, date, mixed, number, object, ref, string } from "yup";

import client from "@/graphql/client";
import moduleExist from "@/requests/direct/query/moduleExist";
import { ModuleMemberPermissions, ModuleStatus, Schools } from "@/types/module";
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

const moduleMemberNameValidator = {
  name: string(),
};

const moduleMemberIdValidator = {
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
          console.log(data.moduleExist.exist);
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

const moduleColumnsValidator = {
  columns: array().min(1, content.columns.minLength),
};

const moduleMembersValidator = {
  moduleMembers: array()
    .of(
      object().shape({
        permission: string(),
      })
    )
    .test({
      name: "one-owner-teaching-module-member",
      message: content.moduleMembers.minLength,
      test: (values) => {
        const isOwnerPermission = (currentValue: string) => currentValue === "OWNER";

        if (values && values.length) {
          return values.some(({ permission }) => isOwnerPermission(permission || ""));
        }

        return false;
      },
    }),
};

const moduleMemberPermissionValidator = {
  permission: mixed()
    .oneOf([...Object.keys(ModuleMemberPermissions)], content.moduleMemberPermission.oneOf)
    .required(content.moduleMemberPermission.required),
};

export {
  moduleCodeValidator,
  moduleColumnsValidator,
  moduleColumnValidator,
  moduleCriteriaScoreRangeMaxValidator,
  moduleCriteriaScoreRangeMinValidator,
  moduleEmailBodyValidator,
  moduleEmailTitleValidator,
  moduleMaxGradeDecreaseValidator,
  moduleMaxGradeIncreaseValidator,
  moduleMemberIdValidator,
  moduleMemberNameValidator,
  moduleMemberPermissionValidator,
  moduleMembersValidator,
  moduleSchoolValidator,
  moduleStatusValidator,
  moduleSubmissionsLockDateValidator,
  moduleTitleValidator,
  userEmailValidator,
  userNameValidator,
  userRoleValidator,
};
