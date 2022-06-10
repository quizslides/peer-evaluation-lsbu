import React, { memo, useEffect, useState } from "react";

import { User } from "@generated/type-graphql";
import { Container, Grid } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Form, Formik } from "formik";
import { object } from "yup";

import { AutocompleteFieldForm, Button, SelectFieldForm, TextField, WarningUnsavedForm } from "@/components";
import { TOptions } from "@/components/AutocompleteFieldForm/AutocompleteFieldForm";
import content from "@/content";
import { FieldWrapper } from "@/forms/style";
import { JSONStringNumber } from "@/types/object";
import {
  PeerEvaluationTeachingMember,
  PeerEvaluationTeachingMemberRoles,
  PeerEvaluationTeachingMemberRolesNoOwner,
} from "@/types/peer-evaluation";
import {
  peerEvaluationTeachingMemberIdValidator,
  peerEvaluationTeachingMemberNameValidator,
  peerEvaluationTeachingMemberRoleValidator,
  userEmailValidator,
} from "@/utils";

interface IPeerEvaluationTeachingMemberForm {
  state: boolean;
  formTitle: string;
  isPeerEvaluationTeachingMemberOwner: boolean;
  users: User[];
  data: PeerEvaluationTeachingMember;
  updateFormState: (state: boolean) => void;
  onSubmitForm: (data: PeerEvaluationTeachingMember) => void;
}

const PeerEvaluationTeachingMemberForm = ({
  formTitle,
  state,
  updateFormState,
  onSubmitForm,
  users,
  isPeerEvaluationTeachingMemberOwner,
  ...peerEvaluationTeachingMemberFormData
}: IPeerEvaluationTeachingMemberForm) => {
  const [userEmailAutocomplete, setUserEmailAutocomplete] = useState<TOptions[]>();

  const handleCloseDialog = (reason?: string) => {
    if (reason === "backdropClick") {
      return;
    }

    updateFormState(false);
  };

  const [isSubmitting, setSubmitting] = useState<boolean>(false);

  const [scopePeerEvaluationTeachingMemberRoles, setScopePeerEvaluationTeachingMemberRoles] =
    useState<JSONStringNumber | null>(null);

  const validationSchema = object({
    ...peerEvaluationTeachingMemberIdValidator,
    ...userEmailValidator,
    ...peerEvaluationTeachingMemberNameValidator,
    ...peerEvaluationTeachingMemberRoleValidator,
  });

  const submitForm = (formData: PeerEvaluationTeachingMember) => {
    setSubmitting(true);

    formData.id = peerEvaluationTeachingMemberFormData.data.id.length
      ? peerEvaluationTeachingMemberFormData.data.id
      : getSubmittedUserId(formData.email);

    onSubmitForm(formData);
  };

  const sanitizeUserAutocomplete = (users: User[]) => users.map(({ email }) => ({ label: email }));

  const getPeerEvaluationTeachingMemberName = (email: string) => {
    let user = users?.filter((data) => data.email === email);
    if (user.length) {
      return user[0].name;
    }

    return "";
  };

  const getSubmittedUserId = (email: string) => {
    let user = users?.filter((data) => data.email === email);
    if (user.length) {
      return user[0].id;
    }

    return "";
  };

  useEffect(() => {
    setUserEmailAutocomplete(sanitizeUserAutocomplete(users));
  }, [users]);

  useEffect(() => {
    const roles = isPeerEvaluationTeachingMemberOwner
      ? PeerEvaluationTeachingMemberRoles
      : PeerEvaluationTeachingMemberRolesNoOwner;
    setScopePeerEvaluationTeachingMemberRoles(roles);
  }, [isPeerEvaluationTeachingMemberOwner]);

  return (
    <Dialog fullWidth maxWidth={"sm"} open={state} onClose={(_, reason) => handleCloseDialog(reason)}>
      <DialogTitle>{formTitle}</DialogTitle>
      <Formik
        initialValues={{
          ...peerEvaluationTeachingMemberFormData.data,
        }}
        validationSchema={validationSchema}
        onSubmit={(data, { resetForm }) => {
          submitForm(data);
          resetForm({
            values: data,
          });
        }}
      >
        {({ values, dirty }) => (
          <Form>
            <WarningUnsavedForm areChangesUnsaved={dirty} />
            <DialogContent>
              <Container maxWidth="sm">
                <Grid container direction="column" justifyContent="center" alignItems="stretch" spacing={3}>
                  <Grid item xs={6}>
                    <FieldWrapper>
                      <AutocompleteFieldForm
                        testId="peer-evaluation-member-form-email-field"
                        name="email"
                        options={userEmailAutocomplete || []}
                        dependantField="name"
                        getDependantFieldValue={getPeerEvaluationTeachingMemberName}
                        textFieldProps={{
                          required: true,
                          fullWidth: true,
                          label: content.containers.peerEvaluationTeachingMemberForm.form.email.label,
                          type: "text",
                          variant: "outlined",
                          placeholder: content.containers.peerEvaluationTeachingMemberForm.form.email.placeholder,
                          helperText: content.containers.peerEvaluationTeachingMemberForm.form.email.helperText,
                        }}
                      />
                    </FieldWrapper>

                    <FieldWrapper>
                      <TextField
                        testId={"peer-evaluation-member-form-name-field"}
                        props={{
                          name: "name",
                          value: values.name,
                          disabled: true,
                          fullWidth: true,
                          label: content.containers.peerEvaluationTeachingMemberForm.form.name.label,
                          type: "text",
                          variant: "outlined",
                          placeholder: content.containers.peerEvaluationTeachingMemberForm.form.name.placeholder,
                          helperText: content.containers.peerEvaluationTeachingMemberForm.form.name.helperText,
                        }}
                      />
                    </FieldWrapper>
                    <FieldWrapper>
                      {scopePeerEvaluationTeachingMemberRoles && (
                        <SelectFieldForm
                          name="role"
                          options={scopePeerEvaluationTeachingMemberRoles}
                          props={{
                            required: true,
                            label: content.containers.peerEvaluationTeachingMemberForm.form.role.label,
                            helperText: content.containers.peerEvaluationTeachingMemberForm.form.role.helperText,
                            fullWidth: true,
                          }}
                          testId="peer-evaluation-member-form-role-field"
                        />
                      )}
                    </FieldWrapper>
                  </Grid>
                </Grid>
              </Container>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={() => handleCloseDialog()}
                testId="peer-evaluation-member-form-cancel-button"
                variant="outlined"
              >
                {content.containers.peerEvaluationTeachingMemberForm.form.button.cancel}
              </Button>
              <Button
                disabled={isSubmitting}
                testId="peer-evaluation-member-form-submit-button"
                variant="contained"
                type="submit"
              >
                {content.containers.peerEvaluationTeachingMemberForm.form.button.submit}
              </Button>
            </DialogActions>
          </Form>
        )}
      </Formik>
    </Dialog>
  );
};

export default memo(PeerEvaluationTeachingMemberForm);
