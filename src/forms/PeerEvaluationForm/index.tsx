import React, { memo, useState } from "react";

import { Container, Stack } from "@mui/material";
import { Form, Formik } from "formik";
import { Session } from "next-auth";
import { object } from "yup";

import {
  Button,
  ConfirmationDialog,
  DateTimePickerForm,
  Divider,
  SelectFieldForm,
  SelectMultipleFieldForm,
  TextFieldForm,
  WYSIWYGForm,
  WarningUnsavedForm,
} from "@/components";
import PeerEvaluationTeachingMemberFormWrapper from "@/components/PeerEvaluationTeachingMemberFormWrapper";
import PeerEvaluationColumnManagement from "@/containers/PeerEvaluationColumnManagement";
import content from "@/content";
import { FieldWrapper } from "@/forms/style";
import {
  IPeerEvaluationData,
  PeerEvaluationStatus,
  PeerEvaluationStatusDefinition,
  SchoolsDropdown,
} from "@/types/peer-evaluation";
import {
  peerEvaluationCodeValidator,
  peerEvaluationColumnsValidator,
  peerEvaluationCriteriaScoreRangeMaxValidator,
  peerEvaluationCriteriaScoreRangeMinValidator,
  peerEvaluationEmailBodyValidator,
  peerEvaluationEmailSubjectValidator,
  peerEvaluationInstructionsValidator,
  peerEvaluationMaxMarkDecreaseValidator,
  peerEvaluationMaxMarkIncreaseValidator,
  peerEvaluationScaleExplanation,
  peerEvaluationSchoolValidator,
  peerEvaluationStatusValidator,
  peerEvaluationSubmissionsLockDateValidator,
  peerEvaluationTeachingMembersValidator,
  peerEvaluationTitleValidator,
} from "@/utils";
import { arrayToObject, rangeNumber } from "@/utils/form";

interface IPeerEvaluationForm extends IPeerEvaluationData {
  onSubmitForm: (data: IPeerEvaluationData) => void;
  onCancelForm: () => void;
  isNewPeerEvaluation: boolean;
  isViewOnly: boolean;
  session: Session;
}

const PeerEvaluationForm = ({
  onSubmitForm,
  onCancelForm,
  isViewOnly,
  isNewPeerEvaluation,
  session,
  ...peerEvaluationData
}: IPeerEvaluationForm) => {
  const [isSubmitting, setSubmitting] = useState<boolean>(false);

  const [isCancelDialogOpen, setCancelDialogOpen] = useState(false);

  const validatorOnAction = () => {
    if (isNewPeerEvaluation) {
      return peerEvaluationCodeValidator;
    }

    return {};
  };

  const validationSchema = object({
    ...peerEvaluationColumnsValidator,
    ...peerEvaluationCriteriaScoreRangeMaxValidator,
    ...peerEvaluationCriteriaScoreRangeMinValidator,
    ...peerEvaluationEmailBodyValidator,
    ...peerEvaluationEmailSubjectValidator,
    ...peerEvaluationInstructionsValidator,
    ...peerEvaluationMaxMarkDecreaseValidator,
    ...peerEvaluationMaxMarkIncreaseValidator,
    ...peerEvaluationScaleExplanation,
    ...peerEvaluationSchoolValidator,
    ...peerEvaluationStatusValidator,
    ...peerEvaluationSubmissionsLockDateValidator,
    ...peerEvaluationTeachingMembersValidator,
    ...peerEvaluationTitleValidator,
    ...validatorOnAction(),
  });

  const submitForm = (userValuesForm: IPeerEvaluationData) => {
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
          ...peerEvaluationData,
        }}
        validationSchema={validationSchema}
        onSubmit={(data, { resetForm }) => {
          submitForm(data);
          resetForm({
            values: data,
          });
        }}
      >
        {({ setFieldValue, dirty, values }) => (
          <Form>
            <WarningUnsavedForm areChangesUnsaved={dirty} />
            <Container maxWidth="lg">
              <Divider>Information</Divider>
              <FieldWrapper marginBottom="3em">
                <TextFieldForm
                  testId="peer-evaluation-form-title-field"
                  name="title"
                  props={{
                    required: true,
                    fullWidth: true,
                    label: content.containers.peerEvaluationForm.form.title.label,
                    type: "text",
                    variant: "outlined",
                    placeholder: content.containers.peerEvaluationForm.form.title.placeholder,
                    disabled: isViewOnly,
                  }}
                />
              </FieldWrapper>

              <FieldWrapper marginBottom="3em">
                <TextFieldForm
                  testId="peer-evaluation-form-peer-evaluation-code-field"
                  name="code"
                  props={{
                    required: true,
                    fullWidth: true,
                    label: content.containers.peerEvaluationForm.form.code.label,
                    type: "text",
                    variant: "outlined",
                    disabled: !isNewPeerEvaluation || isViewOnly,
                    placeholder: content.containers.peerEvaluationForm.form.code.placeholder,
                    helperText: content.containers.peerEvaluationForm.form.code.helperText,
                    onChange: (event) => {
                      const value = event.target.value || "";
                      setFieldValue("code", value.toUpperCase().replace(/ /g, "_"));
                    },
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
                    label: content.containers.peerEvaluationForm.form.peerEvaluationSchools.label,
                    helperText: content.containers.peerEvaluationForm.form.peerEvaluationSchools.helperText,
                    fullWidth: true,
                    disabled: isViewOnly,
                  }}
                  testId="peer-evaluation-form-peer-evaluation-school-field"
                />
              </FieldWrapper>

              <Divider>Peer Evaluation</Divider>

              <FieldWrapper marginBottom="3em">
                <SelectFieldForm
                  name="status"
                  options={PeerEvaluationStatus}
                  props={{
                    required: true,
                    label: content.containers.peerEvaluationForm.form.peerEvaluationStatus.label,
                    helperText: PeerEvaluationStatusDefinition[values.status],
                    fullWidth: true,
                    disabled: isViewOnly || isNewPeerEvaluation,
                  }}
                  testId="peer-evaluation-form-peer-evaluation-status-field"
                />
              </FieldWrapper>

              <FieldWrapper marginBottom="3em">
                <SelectFieldForm
                  name="maxMarkIncrease"
                  options={arrayToObject(rangeNumber(100, 0))}
                  props={{
                    required: true,
                    label: content.containers.peerEvaluationForm.form.maxMarkIncrease.label,
                    helperText: content.containers.peerEvaluationForm.form.maxMarkIncrease.helperText,
                    fullWidth: true,
                    disabled: isViewOnly,
                  }}
                  testId="peer-evaluation-form-peer-evaluation-max-mark-increase-field"
                />
              </FieldWrapper>

              <FieldWrapper marginBottom="3em">
                <SelectFieldForm
                  name="maxMarkDecrease"
                  options={arrayToObject(rangeNumber(100, 0))}
                  props={{
                    required: true,
                    label: content.containers.peerEvaluationForm.form.maxMarkDecrease.label,
                    helperText: content.containers.peerEvaluationForm.form.maxMarkDecrease.helperText,
                    fullWidth: true,
                    disabled: isViewOnly,
                  }}
                  testId="peer-evaluation-form-peer-evaluation-max-mark-increase-field"
                />
              </FieldWrapper>

              <FieldWrapper marginBottom="3em">
                <DateTimePickerForm
                  testId="peer-evaluation-form-peer-evaluation-submissions-lock-date-field"
                  name="submissionsLockDate"
                  disablePast
                  disabled={isViewOnly}
                  label={content.containers.peerEvaluationForm.form.submissionsLockDate.label}
                  props={{
                    helperText: content.containers.peerEvaluationForm.form.submissionsLockDate.helperText,
                    fullWidth: true,
                  }}
                />
              </FieldWrapper>

              <FieldWrapper marginBottom="3em">
                <PeerEvaluationColumnManagement
                  name="columns"
                  helperText={content.containers.peerEvaluationForm.form.columnManagement.helperText}
                  testId={"peer-evaluation-form-peer-evaluation-peer-evaluation-column-management-field"}
                  isDisabled={isViewOnly}
                />
              </FieldWrapper>

              <Divider>Instructions</Divider>

              <FieldWrapper marginBottom="3em">
                <WYSIWYGForm
                  testId={"peer-evaluation-form-instruction-field"}
                  helperText={content.containers.peerEvaluationForm.form.instructions.helperText}
                  fieldName={"instructions"}
                  resetButtonText={content.containers.peerEvaluationForm.form.instructions.resetButtonText}
                  isDisabled={isViewOnly}
                />
              </FieldWrapper>

              <Divider>Scale Explanation</Divider>

              <FieldWrapper marginBottom="3em">
                <WYSIWYGForm
                  testId={"peer-evaluation-form-scale-explanation-field"}
                  helperText={content.containers.peerEvaluationForm.form.scaleExplanation.helperText}
                  fieldName={"scaleExplanation"}
                  resetButtonText={content.containers.peerEvaluationForm.form.scaleExplanation.resetButtonText}
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
                    label: content.containers.peerEvaluationForm.form.criteriaScoreRangeMin.label,
                    helperText: content.containers.peerEvaluationForm.form.criteriaScoreRangeMin.helperText,
                    fullWidth: true,
                    disabled: isViewOnly,
                  }}
                  testId="peer-evaluation-form-peer-evaluation-criteria-score-range-min-field"
                />
              </FieldWrapper>

              <FieldWrapper marginBottom="3em">
                <SelectFieldForm
                  name="criteriaScoreRangeMax"
                  options={arrayToObject(rangeNumber(20, 0))}
                  props={{
                    required: true,
                    label: content.containers.peerEvaluationForm.form.criteriaScoreRangeMax.label,
                    helperText: content.containers.peerEvaluationForm.form.criteriaScoreRangeMax.helperText,
                    fullWidth: true,
                    disabled: isViewOnly,
                  }}
                  testId="peer-evaluation-form-peer-evaluation-criteria-score-range-max-field"
                />
              </FieldWrapper>

              <Divider>Peer Evaluation Teaching Members</Divider>

              <FieldWrapper marginBottom="3em">
                <PeerEvaluationTeachingMemberFormWrapper
                  helperText={content.containers.peerEvaluationForm.form.peerEvaluationTeachingMembers.helperText}
                  testId={"peer-evaluation-form-peer-evaluation-member-field"}
                  name={"peerEvaluationTeachingMembers"}
                  isDisabled={isViewOnly}
                  session={session}
                />
              </FieldWrapper>

              <Stack direction="column" spacing={3}>
                {isViewOnly ? (
                  <Button
                    onClick={onViewOnlyGoBack}
                    testId="peer-evaluation-form-view-only-go-back-button"
                    variant="outlined"
                  >
                    {content.containers.peerEvaluationForm.form.button.viewOnlyGoBack}
                  </Button>
                ) : (
                  <>
                    <Button
                      onClick={onCancelConfirmation}
                      testId="peer-evaluation-form-cancel-button"
                      variant="outlined"
                    >
                      {content.containers.peerEvaluationForm.form.button.cancel}
                    </Button>
                    <Button
                      disabled={isSubmitting}
                      testId="peer-evaluation-form-submit-button"
                      variant="contained"
                      type="submit"
                    >
                      {content.containers.peerEvaluationForm.form.button.submit}
                    </Button>
                  </>
                )}
              </Stack>
            </Container>
          </Form>
        )}
      </Formik>

      <ConfirmationDialog
        testId={"peer-evaluation-form-confirmation-on-cancel"}
        isOpen={isCancelDialogOpen}
        title={content.containers.peerEvaluationForm.confirmationOnCancel.title}
        textContent={content.containers.peerEvaluationForm.confirmationOnCancel.bodyText}
        onAccept={onCancelDialogAccept}
        onClose={onCancelDialogClose}
        closeText={content.containers.peerEvaluationForm.confirmationOnCancel.closeText}
        acceptText={content.containers.peerEvaluationForm.confirmationOnCancel.acceptText}
      />
    </>
  );
};

export default memo(PeerEvaluationForm);
