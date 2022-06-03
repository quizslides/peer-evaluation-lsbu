import React, { memo, useState } from "react";

import { Container, Grid } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Form, Formik } from "formik";
import { object } from "yup";

import { Button, SelectFieldForm, TextFieldForm, WarningUnsavedForm } from "@/components";
import content from "@/content";
import { FieldWrapper } from "@/forms/style";
import { IUserData } from "@/types/user";
import { Role, userEmailValidator, userNameValidator, userRoleValidator } from "@/utils";

interface IUserForm extends IUserData {
  state: boolean;
  formTitle: string;
  updateUserFormState: (state: boolean) => void;
  onSubmitForm: (data: IUserData) => void;
}

const UserForm = ({ email, name, role, formTitle, state, updateUserFormState, onSubmitForm }: IUserForm) => {
  const handleCloseDialog = (reason?: string) => {
    if (reason === "backdropClick") {
      return;
    }

    updateUserFormState(false);
  };

  const [isSubmitting, setSubmitting] = useState<boolean>(false);

  const validationSchema = object({
    ...userEmailValidator,
    ...userNameValidator,
    ...userRoleValidator,
  });

  const submitForm = (userValuesForm: IUserData) => {
    setSubmitting(true);
    onSubmitForm(userValuesForm);
  };

  return (
    <Dialog fullWidth maxWidth={"sm"} open={state} onClose={(_, reason) => handleCloseDialog(reason)}>
      <DialogTitle>{formTitle}</DialogTitle>
      <Formik
        initialValues={{
          email,
          name,
          role,
        }}
        validationSchema={validationSchema}
        onSubmit={submitForm}
      >
        {({ dirty }) => (
          <Form>
            <WarningUnsavedForm areChangesUnsaved={dirty} />
            <DialogContent>
              <Container maxWidth="sm">
                <Grid container direction="column" justifyContent="center" alignItems="stretch" spacing={3}>
                  <Grid item xs={6}>
                    <FieldWrapper>
                      <TextFieldForm
                        testId="user-form-email-field"
                        name="email"
                        props={{
                          required: true,
                          fullWidth: true,
                          label: content.containers.userForm.form.email.label,
                          type: "email",
                          variant: "outlined",
                          placeholder: content.containers.userForm.form.email.placeholder,
                        }}
                      />
                    </FieldWrapper>
                    <FieldWrapper>
                      <TextFieldForm
                        testId="user-form-name-field"
                        name="name"
                        props={{
                          required: true,
                          fullWidth: true,
                          label: content.containers.userForm.form.name.label,
                          type: "text",
                          variant: "outlined",
                          placeholder: content.containers.userForm.form.name.placeholder,
                          helperText: content.containers.userForm.form.name.helperText,
                        }}
                      />
                    </FieldWrapper>
                    <FieldWrapper>
                      <SelectFieldForm
                        name="role"
                        options={Role}
                        props={{
                          required: true,
                          label: content.containers.userForm.form.role.label,
                          helperText: content.containers.userForm.form.role.helperText,
                          fullWidth: true,
                        }}
                        testId="user-form-role-field"
                      />
                    </FieldWrapper>
                  </Grid>
                </Grid>
              </Container>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => handleCloseDialog()} testId="user-form-cancel-button" variant="outlined">
                {content.containers.userForm.form.button.cancel}
              </Button>
              <Button disabled={isSubmitting} testId="user-form-submit-button" variant="contained" type="submit">
                {content.containers.userForm.form.button.submit}
              </Button>
            </DialogActions>
          </Form>
        )}
      </Formik>
    </Dialog>
  );
};

export default memo(UserForm);
