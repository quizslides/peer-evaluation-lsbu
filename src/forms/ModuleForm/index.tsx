import React, { useState } from "react";

import { Container, Stack } from "@mui/material";
import { Form, Formik } from "formik";
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
import content from "@/content";
import { FieldWrapper } from "@/forms/style";
import { IModuleData, ModuleStatus, SchoolAcronyms, SchoolsDropdown } from "@/types/module";
import {
  moduleCodeValidator,
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
} from "@/utils";
import { arrayToObject, rangeNumber } from "@/utils/form";

interface IModuleForm extends IModuleData {
  state: boolean;
  updateFormState: (state: boolean) => void;
  onSubmitForm: (data: IModuleData) => void;
  isNewModule: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const ModuleForm = ({ state, updateFormState, onSubmitForm, isNewModule = false, ...moduleData }: IModuleForm) => {
  const handleCloseDialog = (reason?: string) => {
    if (reason === "backdropClick") {
      return;
    }

    updateFormState(false);
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
            <FieldWrapper>
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

            <FieldWrapper>
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
                }}
              />
            </FieldWrapper>

            <FieldWrapper>
              <SelectMultipleFieldForm
                name="schools"
                options={SchoolAcronyms}
                answerMapper={SchoolsDropdown}
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

            <FieldWrapper>
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

            <Divider>Email Reminder</Divider>

            <FieldWrapper>
              <TextFieldForm
                testId="module-form-email-title-field"
                name="reminderEmailTitle"
                props={{
                  required: true,
                  fullWidth: true,
                  label: content.containers.moduleForm.form.reminderEmailTitle.label,
                  type: "text",
                  variant: "outlined",
                  placeholder: content.containers.moduleForm.form.reminderEmailTitle.placeholder,
                }}
              />
            </FieldWrapper>

            <FieldWrapper>
              <WYSIWYGForm
                testId={"module-form-email-body-field"}
                helperText={content.containers.moduleForm.form.reminderEmailBody.helperText}
                fieldName={"reminderEmailBody"}
                resetButtonText={content.containers.moduleForm.form.reminderEmailBody.resetButtonText}
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

            <Stack direction="column" spacing={3}>
              <Button onClick={() => handleCloseDialog()} testId="module-form-cancel-button" variant="outlined">
                {content.containers.userForm.form.button.cancel}
              </Button>
              <Button disabled={isSubmitting} testId="module-form-submit-button" variant="contained" type="submit">
                {content.containers.userForm.form.button.submit}
              </Button>
            </Stack>
          </Container>
        </Form>
      )}
    </Formik>
  );
};

export default ModuleForm;
