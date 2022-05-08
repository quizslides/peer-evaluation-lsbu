import React, { memo, useState } from "react";

import { Stack } from "@mui/material";
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
import content from "@/content";
import { FieldWrapper } from "@/forms/style";
import {
  peerEvaluationCodeValidator,
  peerEvaluationColumnsValidator,
  peerEvaluationCriteriaScoreRangeMaxValidator,
  peerEvaluationCriteriaScoreRangeMinValidator,
  peerEvaluationEmailBodyValidator,
  peerEvaluationEmailSubjectValidator,
  peerEvaluationMaxGradeDecreaseValidator,
  peerEvaluationMaxGradeIncreaseValidator,
  peerEvaluationSchoolValidator,
  peerEvaluationStatusValidator,
  peerEvaluationSubmissionsLockDateValidator,
  peerEvaluationTeachingMembersValidator,
  peerEvaluationTitleValidator,
} from "@/utils";

export interface EmailReminder {
  emailSubjectReminder: string;
  emailBodyReminder: string;
}

interface IPeerEvaluationEmailReminderForm extends EmailReminder {
  onSendEmailReminder: () => void;
  onSubmitForm: (data: EmailReminder) => Promise<void>;
  onCancelForm: () => void;
  isViewOnly: boolean;
}

const PeerEvaluationEmailReminderForm = ({
  onSendEmailReminder,
  onSubmitForm,
  onCancelForm,
  emailSubjectReminder,
  emailBodyReminder,
  isViewOnly,
}: IPeerEvaluationEmailReminderForm) => {
  const [isSubmitting, setSubmitting] = useState<boolean>(false);

  const [isCancelDialogOpen, setCancelDialogOpen] = useState(false);

  const validationSchema = object({
    ...peerEvaluationEmailBodyValidator,
    ...peerEvaluationEmailSubjectValidator,
  });

  const submitForm = async (data: EmailReminder) => {
    setSubmitting(true);
    await onSubmitForm(data);
    setSubmitting(false);
  };

  const onCancelConfirmation = () => setCancelDialogOpen(true);

  const onCancelDialogAccept = () => onCancelForm();

  const onCancelDialogClose = () => setCancelDialogOpen(false);

  const onViewOnlyGoBack = () => onCancelForm();

  return (
    <>
      <Formik
        initialValues={{
          emailSubjectReminder: emailSubjectReminder,
          emailBodyReminder: emailBodyReminder,
        }}
        validationSchema={validationSchema}
        onSubmit={submitForm}
      >
        {() => (
          <Form>
            <FieldWrapper marginBottom="3em">
              <TextFieldForm
                testId="peer-evaluation-email-reminder-form-email-subject-field"
                name="emailSubjectReminder"
                props={{
                  required: true,
                  fullWidth: true,
                  label: content.containers.peerEvaluationEmailReminderForm.form.emailSubjectReminder.label,
                  type: "text",
                  variant: "outlined",
                  placeholder: content.containers.peerEvaluationEmailReminderForm.form.emailSubjectReminder.placeholder,
                  disabled: isViewOnly,
                }}
              />
            </FieldWrapper>

            <FieldWrapper marginBottom="3em">
              <WYSIWYGForm
                testId={"peer-evaluation-email-reminder-form-email-body-field"}
                helperText={content.containers.peerEvaluationEmailReminderForm.form.emailBodyReminder.helperText}
                fieldName={"emailBodyReminder"}
                resetButtonText={
                  content.containers.peerEvaluationEmailReminderForm.form.emailBodyReminder.resetButtonText
                }
                isDisabled={isViewOnly}
              />
            </FieldWrapper>

            <Stack direction="column" spacing={3}>
              {isViewOnly ? (
                <Button
                  onClick={onViewOnlyGoBack}
                  testId="peer-evaluation-email-reminder-form-view-only-go-back-button"
                  variant="outlined"
                >
                  {content.containers.peerEvaluationEmailReminderForm.form.button.viewOnlyGoBack}
                </Button>
              ) : (
                <>
                  <Button
                    onClick={onCancelConfirmation}
                    testId="peer-evaluation-email-reminder-form-cancel-button"
                    variant="outlined"
                  >
                    {content.containers.peerEvaluationEmailReminderForm.form.button.cancel}
                  </Button>
                  <Button
                    disabled={isSubmitting}
                    testId="peer-evaluation-email-reminder-form-submit-button"
                    variant="contained"
                    type="submit"
                  >
                    {content.containers.peerEvaluationEmailReminderForm.form.button.submit}
                  </Button>

                  <Divider>Actions</Divider>

                  <Button
                    testId="peer-evaluation-email-reminder-form-submit-button"
                    variant="contained"
                    onClick={onSendEmailReminder}
                  >
                    {content.containers.peerEvaluationEmailReminderForm.form.button.send}
                  </Button>
                </>
              )}
            </Stack>
          </Form>
        )}
      </Formik>

      <ConfirmationDialog
        testId={"peer-evaluation-email-reminder-form-confirmation-on-cancel"}
        isOpen={isCancelDialogOpen}
        title={content.containers.peerEvaluationEmailReminderForm.confirmationOnCancel.title}
        textContent={content.containers.peerEvaluationEmailReminderForm.confirmationOnCancel.bodyText}
        onAccept={onCancelDialogAccept}
        onClose={onCancelDialogClose}
        closeText={content.containers.peerEvaluationEmailReminderForm.confirmationOnCancel.closeText}
        acceptText={content.containers.peerEvaluationEmailReminderForm.confirmationOnCancel.acceptText}
      />
    </>
  );
};

export default memo(PeerEvaluationEmailReminderForm);
