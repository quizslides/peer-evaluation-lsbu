import { array, date, mixed, number, ref, string } from "yup";

import { ModuleStatus, Schools } from "@/types/module";
import { tomorrowDate } from "@/utils/form";
import { Role } from "@/utils/permissions";
import content from "@/utils/validator/content";

const userEmailValidator = {
  email: string()
    .default(content.userEmail.defaultValue)
    .email(content.userEmail.invalid)
    .matches(content.userEmail.regex, content.userEmail.invalidDomain)
    .required(content.userEmail.required),
};

const userNameValidator = {
  name: string()
    .min(2, content.userName.minLength)
    .max(70, content.userName.maxLength)
    .required(content.userName.required),
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
    .required(content.moduleCode.required),
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
  reminderEmailTitle: string()
    .matches(content.reminderEmailTitle.matchModuleCodeRegex, {
      message: content.reminderEmailTitle.matchModuleCode,
    })
    .min(2, content.reminderEmailTitle.minLength)
    .max(70, content.reminderEmailTitle.maxLength)
    .required(content.reminderEmailTitle.required),
};

const moduleEmailBodyValidator = {
  reminderEmailBody: string().matches(content.reminderEmailBody.matchUrlRegex, {
    message: content.reminderEmailBody.matchUrl,
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
  moduleSchoolValidator,
  moduleStatusValidator,
  moduleSubmissionsLockDateValidator,
  moduleTitleValidator,
  userEmailValidator,
  userNameValidator,
  userRoleValidator,
};
