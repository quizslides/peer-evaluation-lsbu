import { array, date, mixed, number, object, ref, string } from "yup";

import client from "@/graphql/client";
import peerEvaluationExist from "@/requests/direct/query/peerEvaluationExist";
import { PeerEvaluationStatus, PeerEvaluationTeachingMemberRoles, Schools } from "@/types/peer-evaluation";
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

const peerEvaluationTeachingMemberNameValidator = {
  name: string(),
};

const peerEvaluationTeachingMemberIdValidator = {
  name: string(),
};

const userRoleValidator = {
  role: mixed()
    .oneOf([...Object.keys(Role)], content.userRole.oneOf)
    .required(content.userRole.required),
};

const peerEvaluationTitleValidator = {
  title: string()
    .min(2, content.peerEvaluationTitle.minLength)
    .max(70, content.peerEvaluationTitle.maxLength)
    .required(content.peerEvaluationTitle.required),
};

const peerEvaluationCodeValidator = {
  code: string()
    .min(2, content.code.minLength)
    .max(70, content.code.maxLength)
    .required(content.code.required)
    .matches(content.code.regex, {
      message: content.code.messageRegex,
    })
    .test({
      name: "unique-peer-evaluation-code",
      message: content.code.unique,
      test: async (values) => {
        if (values) {
          const { data } = await peerEvaluationExist(client, values);
          return !!!data.peerEvaluationExist.exist;
        }

        // If backend is not or has not responded, the validation should return false as the input will be invalid
        return false;
      },
    })
    .transform((value) => {
      return value && value.toUpperCase();
    }),
};

const peerEvaluationSchoolValidator = {
  schools: array()
    .of(mixed().oneOf([...Object.keys(Schools)]))
    .min(1, content.peerEvaluationSchools.minLength)
    .required(content.peerEvaluationSchools.required),
};

const peerEvaluationStatusValidator = {
  status: mixed()
    .oneOf([...Object.keys(PeerEvaluationStatus)], content.peerEvaluationStatus.oneOf)
    .required(content.peerEvaluationStatus.required),
};

const peerEvaluationMaxGradeIncreaseValidator = {
  maxGradeIncrease: number()
    .typeError(content.maxGradeIncrease.typeError)
    .required(content.maxGradeIncrease.required)
    .min(0, content.maxGradeIncrease.min)
    .max(100, content.maxGradeIncrease.max),
};

const peerEvaluationMaxGradeDecreaseValidator = {
  maxGradeDecrease: number()
    .typeError(content.maxGradeDecrease.typeError)
    .required(content.maxGradeDecrease.required)
    .min(0, content.maxGradeDecrease.min)
    .max(100, content.maxGradeDecrease.max),
};

const peerEvaluationSubmissionsLockDateValidator = {
  submissionsLockDate: date().min(tomorrowDate(), content.submissionsLockDate.min).nullable(),
};

const peerEvaluationCriteriaScoreRangeMinValidator = {
  criteriaScoreRangeMin: number()
    .typeError(content.criteriaScoreRangeMin.typeError)
    .required(content.criteriaScoreRangeMin.required)
    .min(0, content.criteriaScoreRangeMin.min)
    .max(100, content.criteriaScoreRangeMin.max),
};

const peerEvaluationCriteriaScoreRangeMaxValidator = {
  criteriaScoreRangeMax: number()
    .typeError(content.criteriaScoreRangeMax.typeError)
    .required(content.criteriaScoreRangeMax.required)
    .min(ref("criteriaScoreRangeMin"), content.criteriaScoreRangeMax.min)
    .max(100, content.criteriaScoreRangeMax.max),
};

const peerEvaluationEmailTitleValidator = {
  emailTitleReminder: string()
    .matches(content.emailTitleReminder.matchPeerEvaluationCodeRegex, {
      message: content.emailTitleReminder.matchPeerEvaluationCode,
    })
    .min(2, content.emailTitleReminder.minLength)
    .max(70, content.emailTitleReminder.maxLength)
    .required(content.emailTitleReminder.required),
};

const peerEvaluationEmailBodyValidator = {
  emailBodyReminder: string().matches(content.emailBodyReminder.matchUrlRegex, {
    message: content.emailBodyReminder.matchUrl,
  }),
};

const peerEvaluationColumnValidator = {
  description: string()
    .min(2, content.column.minLength)
    .max(70, content.column.maxLength)
    .required(content.column.required),
};

const peerEvaluationColumnIdValidator = {
  description: string(),
};

const peerEvaluationColumnsValidator = {
  columns: array().min(1, content.columns.minLength),
};

const peerEvaluationTeachingMembersValidator = {
  peerEvaluationTeachingMembers: array()
    .of(
      object().shape({
        role: string(),
      })
    )
    .test({
      name: "one-owner-teaching-peer-evaluation-member",
      message: content.peerEvaluationTeachingMembers.minLength,
      test: (values) => {
        const isOwnerRole = (currentValue: string) => currentValue === "OWNER";

        if (values && values.length) {
          return values.some(({ role }) => isOwnerRole(role || ""));
        }

        return false;
      },
    }),
};

const peerEvaluationTeachingMemberRoleValidator = {
  role: mixed()
    .oneOf([...Object.keys(PeerEvaluationTeachingMemberRoles)], content.peerEvaluationTeachingMemberRole.oneOf)
    .required(content.peerEvaluationTeachingMemberRole.required),
};

export {
  peerEvaluationCodeValidator,
  peerEvaluationColumnIdValidator,
  peerEvaluationColumnsValidator,
  peerEvaluationColumnValidator,
  peerEvaluationCriteriaScoreRangeMaxValidator,
  peerEvaluationCriteriaScoreRangeMinValidator,
  peerEvaluationEmailBodyValidator,
  peerEvaluationEmailTitleValidator,
  peerEvaluationMaxGradeDecreaseValidator,
  peerEvaluationMaxGradeIncreaseValidator,
  peerEvaluationSchoolValidator,
  peerEvaluationStatusValidator,
  peerEvaluationSubmissionsLockDateValidator,
  peerEvaluationTeachingMemberIdValidator,
  peerEvaluationTeachingMemberNameValidator,
  peerEvaluationTeachingMemberRoleValidator,
  peerEvaluationTeachingMembersValidator,
  peerEvaluationTitleValidator,
  userEmailValidator,
  userNameValidator,
  userRoleValidator,
};
