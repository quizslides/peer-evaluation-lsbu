import React, { memo, useState } from "react";

import { useApolloClient } from "@apollo/client";
import styled from "@emotion/styled";
import { Container, Stack, ThemeProvider, createTheme } from "@mui/material";
import { red } from "@mui/material/colors";
import { Form, Formik, yupToFormErrors } from "formik";
import { object } from "yup";

import {
  Button,
  DatePickerForm,
  Divider,
  SelectFieldForm,
  SelectMultipleFieldForm,
  TextFieldForm,
  WYSIWYGForm,
} from "@/components";
import ModuleMemberFormWrapper from "@/components/ModuleMemberFormWrapper";
import PeerEvaluationColumnManagement from "@/containers/PeerEvaluationColumnManagement";
import content from "@/content";
import { FieldWrapper } from "@/forms/style";
import { theme } from "@/styles";
import { IModuleData, ModuleStatus, SchoolAcronyms, SchoolsDropdown } from "@/types/module";
import {
  moduleCodeValidator,
  moduleColumnsValidator,
  moduleCriteriaScoreRangeMaxValidator,
  moduleCriteriaScoreRangeMinValidator,
  moduleEmailBodyValidator,
  moduleEmailTitleValidator,
  moduleMaxGradeDecreaseValidator,
  moduleMaxGradeIncreaseValidator,
  moduleMembersValidator,
  moduleSchoolValidator,
  moduleStatusValidator,
  moduleSubmissionsLockDateValidator,
  moduleTitleValidator,
} from "@/utils";
import { arrayToObject, rangeNumber } from "@/utils/form";

interface IModuleForm extends IModuleData {
  onSubmitForm: (data: IModuleData) => void;
  isNewModule: boolean;
}

const ModuleForm = ({ onSubmitForm, isNewModule = false, ...moduleData }: IModuleForm) => {
  const apolloClient = useApolloClient();

  const handleCloseDialog = (reason?: string) => {
    if (reason === "backdropClick") {
      return;
    }
  };

  const [isSubmitting, setSubmitting] = useState<boolean>(false);

  const validationSchema = object({
    ...moduleTitleValidator,
    ...moduleCodeValidator,
    ...moduleSchoolValidator,
    ...moduleStatusValidator,
    ...moduleMaxGradeIncreaseValidator,
    ...moduleMaxGradeDecreaseValidator,
    ...moduleSubmissionsLockDateValidator,
    ...moduleCriteriaScoreRangeMaxValidator,
    ...moduleCriteriaScoreRangeMinValidator,
    ...moduleEmailTitleValidator,
    ...moduleEmailBodyValidator,
    ...moduleColumnsValidator,
    ...moduleMembersValidator,
  });

  const submitForm = (userValuesForm: IModuleData) => {
    setSubmitting(true);
    onSubmitForm(userValuesForm);
  };

  return (
    <Formik
      initialValues={{
        ...moduleData,
      }}
      validationSchema={validationSchema}
      onSubmit={submitForm}
    >
      {() => (
        <Form>
          <Container maxWidth="lg">
            <Divider>Information</Divider>
            <FieldWrapper marginBottom="3em">
              <TextFieldForm
                testId="module-form-title-field"
                name="title"
                props={{
                  required: true,
                  fullWidth: true,
                  label: content.containers.moduleForm.form.title.label,
                  type: "text",
                  variant: "outlined",
                  placeholder: content.containers.moduleForm.form.title.placeholder,
                }}
              />
            </FieldWrapper>

            <FieldWrapper marginBottom="3em">
              <TextFieldForm
                testId="module-form-module-code-field"
                name="moduleCode"
                props={{
                  required: true,
                  fullWidth: true,
                  label: content.containers.moduleForm.form.moduleCode.label,
                  type: "text",
                  variant: "outlined",
                  placeholder: content.containers.moduleForm.form.moduleCode.placeholder,
                  helperText: content.containers.moduleForm.form.moduleCode.helperText,
                  sx: {
                    input: {
                      textTransform: "uppercase",
                      "&::placeholder": {
                        textTransform: "none",
                      },
                    },
                  },
                }}
              />
            </FieldWrapper>

            <FieldWrapper marginBottom="3em">
              <SelectMultipleFieldForm
                name="schools"
                options={SchoolsDropdown}
                props={{
                  required: true,
                  label: content.containers.moduleForm.form.moduleSchools.label,
                  helperText: content.containers.moduleForm.form.moduleSchools.helperText,
                  fullWidth: true,
                }}
                testId="module-form-module-school-field"
              />
            </FieldWrapper>

            <Divider>Peer Evaluation</Divider>

            <FieldWrapper marginBottom="3em">
              <SelectFieldForm
                name="status"
                options={ModuleStatus}
                props={{
                  required: true,
                  label: content.containers.moduleForm.form.moduleStatus.label,
                  helperText: content.containers.moduleForm.form.moduleStatus.helperText,
                  fullWidth: true,
                  disabled: isNewModule,
                }}
                testId="module-form-module-status-field"
              />
            </FieldWrapper>

            <FieldWrapper marginBottom="3em">
              <SelectFieldForm
                name="maxGradeIncrease"
                options={arrayToObject(rangeNumber(100, 0))}
                props={{
                  required: true,
                  label: content.containers.moduleForm.form.maxGradeIncrease.label,
                  helperText: content.containers.moduleForm.form.maxGradeIncrease.helperText,
                  fullWidth: true,
                }}
                testId="module-form-module-max-grade-increase-field"
              />
            </FieldWrapper>

            <FieldWrapper marginBottom="3em">
              <SelectFieldForm
                name="maxGradeDecrease"
                options={arrayToObject(rangeNumber(100, 0))}
                props={{
                  required: true,
                  label: content.containers.moduleForm.form.maxGradeDecrease.label,
                  helperText: content.containers.moduleForm.form.maxGradeDecrease.helperText,
                  fullWidth: true,
                }}
                testId="module-form-module-max-grade-increase-field"
              />
            </FieldWrapper>

            <FieldWrapper marginBottom="3em">
              <DatePickerForm
                testId="module-form-module-submissions-lock-date-field"
                name="submissionsLockDate"
                disablePast
                label={content.containers.moduleForm.form.submissionsLockDate.label}
                props={{
                  helperText: content.containers.moduleForm.form.submissionsLockDate.helperText,
                  fullWidth: true,
                }}
              />
            </FieldWrapper>

            <FieldWrapper marginBottom="3em">
              <PeerEvaluationColumnManagement
                name="columns"
                helperText={content.containers.moduleForm.form.columnManagement.helperText}
                testId={"module-form-module-peer-evaluation-column-management-field"}
              />
            </FieldWrapper>

            <Divider>Email Reminder</Divider>

            <FieldWrapper marginBottom="3em">
              <TextFieldForm
                testId="module-form-email-title-field"
                name="emailTitleReminder"
                props={{
                  required: true,
                  fullWidth: true,
                  label: content.containers.moduleForm.form.emailTitleReminder.label,
                  type: "text",
                  variant: "outlined",
                  placeholder: content.containers.moduleForm.form.emailTitleReminder.placeholder,
                }}
              />
            </FieldWrapper>

            <FieldWrapper marginBottom="3em">
              <WYSIWYGForm
                testId={"module-form-email-body-field"}
                helperText={content.containers.moduleForm.form.emailBodyReminder.helperText}
                fieldName={"emailBodyReminder"}
                resetButtonText={content.containers.moduleForm.form.emailBodyReminder.resetButtonText}
              />
            </FieldWrapper>

            <Divider>Criteria Score</Divider>

            <FieldWrapper marginBottom="3em">
              <SelectFieldForm
                name="criteriaScoreRangeMin"
                options={arrayToObject(rangeNumber(20, 0))}
                props={{
                  required: true,
                  label: content.containers.moduleForm.form.criteriaScoreRangeMin.label,
                  helperText: content.containers.moduleForm.form.criteriaScoreRangeMin.helperText,
                  fullWidth: true,
                }}
                testId="module-form-module-criteria-score-range-min-field"
              />
            </FieldWrapper>

            <FieldWrapper marginBottom="3em">
              <SelectFieldForm
                name="criteriaScoreRangeMax"
                options={arrayToObject(rangeNumber(20, 0))}
                props={{
                  required: true,
                  label: content.containers.moduleForm.form.criteriaScoreRangeMax.label,
                  helperText: content.containers.moduleForm.form.criteriaScoreRangeMax.helperText,
                  fullWidth: true,
                }}
                testId="module-form-module-criteria-score-range-max-field"
              />
            </FieldWrapper>

            <Divider>Module Members</Divider>

            <FieldWrapper marginBottom="3em">
              <ModuleMemberFormWrapper
                helperText={content.containers.moduleForm.form.moduleMembers.helperText}
                testId={"module-form-module-member-field"}
                name={"moduleMembers"}
              />
            </FieldWrapper>

            <Stack direction="column" spacing={3}>
              <Button onClick={() => handleCloseDialog()} testId="module-form-cancel-button" variant="outlined">
                {content.containers.moduleForm.form.button.cancel}
              </Button>
              <Button disabled={isSubmitting} testId="module-form-submit-button" variant="contained" type="submit">
                {content.containers.moduleForm.form.button.submit}
              </Button>
            </Stack>
          </Container>
        </Form>
      )}
    </Formik>
  );
};

export default memo(ModuleForm);
