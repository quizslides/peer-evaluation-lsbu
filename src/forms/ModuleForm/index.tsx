import React, { memo, useState } from "react";

import { Container, Stack } from "@mui/material";
import { Form, Formik } from "formik";
import { object } from "yup";

import {
  Button,
  ConfirmationDialog,
  DatePickerForm,
  Divider,
  SelectFieldForm,
  SelectMultipleFieldForm,
  TextFieldForm,
  WYSIWYGForm,
} from "@/components";
import ModuleTeachingMemberFormWrapper from "@/components/ModuleTeachingMemberFormWrapper";
import PeerEvaluationColumnManagement from "@/containers/PeerEvaluationColumnManagement";
import content from "@/content";
import { FieldWrapper } from "@/forms/style";
import { IModuleData, ModuleStatus, SchoolsDropdown } from "@/types/module";
import {
  moduleCodeValidator,
  moduleColumnsValidator,
  moduleCriteriaScoreRangeMaxValidator,
  moduleCriteriaScoreRangeMinValidator,
  moduleEmailBodyValidator,
  moduleEmailTitleValidator,
  moduleMaxGradeDecreaseValidator,
  moduleMaxGradeIncreaseValidator,
  moduleSchoolValidator,
  moduleStatusValidator,
  moduleSubmissionsLockDateValidator,
  moduleTeachingMembersValidator,
  moduleTitleValidator,
} from "@/utils";
import { arrayToObject, rangeNumber } from "@/utils/form";

interface IModuleForm extends IModuleData {
  onSubmitForm: (data: IModuleData) => void;
  onCancelForm: () => void;
  isNewModule: boolean;
  isViewOnly: boolean;
}

const ModuleForm = ({ onSubmitForm, onCancelForm, isViewOnly, isNewModule, ...moduleData }: IModuleForm) => {
  const [isSubmitting, setSubmitting] = useState<boolean>(false);

  const [isCancelDialogOpen, setCancelDialogOpen] = useState(false);

  const validatorOnAction = () => {
    if (isNewModule) {
      return moduleCodeValidator;
    }

    return {};
  };

  const validationSchema = object({
    ...moduleTitleValidator,
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
    ...moduleTeachingMembersValidator,
    ...validatorOnAction(),
  });

  const submitForm = (userValuesForm: IModuleData) => {
    setSubmitting(true);
    onSubmitForm(userValuesForm);
  };

  const onCancelConfirmation = () => setCancelDialogOpen(true);

  const onCancelDialogAccept = () => onCancelForm();

  const onCancelDialogClose = () => setCancelDialogOpen(false);

  const onViewOnlyGoBack = () => onCancelForm();

  return (
    <>
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
                    disabled: isViewOnly,
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
                    disabled: !isNewModule || isViewOnly,
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
                    disabled: isViewOnly,
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
                    disabled: isViewOnly || isNewModule,
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
                    disabled: isViewOnly,
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
                    disabled: isViewOnly,
                  }}
                  testId="module-form-module-max-grade-increase-field"
                />
              </FieldWrapper>

              <FieldWrapper marginBottom="3em">
                <DatePickerForm
                  testId="module-form-module-submissions-lock-date-field"
                  name="submissionsLockDate"
                  disablePast
                  disabled={isViewOnly}
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
                  isDisabled={isViewOnly}
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
                    disabled: isViewOnly,
                  }}
                />
              </FieldWrapper>

              <FieldWrapper marginBottom="3em">
                <WYSIWYGForm
                  testId={"module-form-email-body-field"}
                  helperText={content.containers.moduleForm.form.emailBodyReminder.helperText}
                  fieldName={"emailBodyReminder"}
                  resetButtonText={content.containers.moduleForm.form.emailBodyReminder.resetButtonText}
                  isDisabled={isViewOnly}
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
                    disabled: isViewOnly,
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
                    disabled: isViewOnly,
                  }}
                  testId="module-form-module-criteria-score-range-max-field"
                />
              </FieldWrapper>

              <Divider>Module Teaching Members</Divider>

              <FieldWrapper marginBottom="3em">
                <ModuleTeachingMemberFormWrapper
                  helperText={content.containers.moduleForm.form.moduleTeachingMembers.helperText}
                  testId={"module-form-module-member-field"}
                  name={"moduleTeachingMembers"}
                  isDisabled={isViewOnly}
                />
              </FieldWrapper>

              <Stack direction="column" spacing={3}>
                {isViewOnly ? (
                  <Button onClick={onViewOnlyGoBack} testId="module-form-view-only-go-back-button" variant="outlined">
                    {content.containers.moduleForm.form.button.viewOnlyGoBack}
                  </Button>
                ) : (
                  <>
                    <Button onClick={onCancelConfirmation} testId="module-form-cancel-button" variant="outlined">
                      {content.containers.moduleForm.form.button.cancel}
                    </Button>
                    <Button
                      disabled={isSubmitting}
                      testId="module-form-submit-button"
                      variant="contained"
                      type="submit"
                    >
                      {content.containers.moduleForm.form.button.submit}
                    </Button>
                  </>
                )}
              </Stack>
            </Container>
          </Form>
        )}
      </Formik>

      <ConfirmationDialog
        testId={"module-form-confirmation-on-cancel"}
        isOpen={isCancelDialogOpen}
        title={content.containers.moduleForm.confirmationOnCancel.title}
        textContent={content.containers.moduleForm.confirmationOnCancel.bodyText}
        onAccept={onCancelDialogAccept}
        onClose={onCancelDialogClose}
        closeText={content.containers.moduleForm.confirmationOnCancel.closeText}
        acceptText={content.containers.moduleForm.confirmationOnCancel.acceptText}
      />
    </>
  );
};

export default memo(ModuleForm);
