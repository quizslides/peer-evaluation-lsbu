import React, { useState } from "react";

import styled from "@emotion/styled";
import { Container, Grid } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Form, Formik } from "formik";
import { object } from "yup";

import { Button, SelectFieldForm, TextFieldForm } from "@/components";
import content from "@/content";
import { IUserData } from "@/requests/schema/user";
import { Role, emailValidator, nameValidator, roleValidator } from "@/utils";

interface IUserForm extends IUserData {
  state: boolean;
  title: string;
  updateUserFormState: (state: boolean) => void;
  onSubmitForm: (data: IUserData) => void;
}

const FieldWrapper = styled.div`
  margin-top: 1em;
  margin-bottom: 2em;
`;

const UserForm = ({ email, name, role, title, state, updateUserFormState, onSubmitForm }: IUserForm) => {
  const handleCloseDialog = (reason?: string) => {
    if (reason === "backdropClick") {
      return;
    }

    updateUserFormState(false);
  };

  const [isSubmitting, setSubmitting] = useState<boolean>(false);

  const validationSchema = object({
    ...emailValidator,
    ...nameValidator,
    ...roleValidator,
  });

  const submitForm = (userValuesForm: IUserData) => {
    setSubmitting(true);
    onSubmitForm(userValuesForm);
  };

  return (
    <Dialog fullWidth maxWidth={"sm"} open={state} onClose={(_, reason) => handleCloseDialog(reason)}>
      <DialogTitle>{title}</DialogTitle>
      <Formik
        initialValues={{
          email,
          name,
          role,
        }}
        validationSchema={validationSchema}
        onSubmit={submitForm}
      >
        {() => (
          <Form>
            <DialogContent>
              <Container maxWidth="sm">
                <Grid container direction="column" justifyContent="center" alignItems="stretch" spacing={3}>
                  <Grid item xs={6}>
                    <FieldWrapper>
                      <TextFieldForm
                        testId="userform-form-field-email"
                        name="email"
                        props={{
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
                        testId="userform-form-name-field"
                        name="name"
                        props={{
                          fullWidth: true,
                          label: content.containers.userForm.form.name.label,
                          type: "text",
                          variant: "outlined",
                          placeholder: content.containers.userForm.form.name.placeholder,
                        }}
                      />
                    </FieldWrapper>
                    <FieldWrapper>
                      <SelectFieldForm
                        name="role"
                        options={Role}
                        props={{
                          label: content.containers.userForm.form.role.label,
                          helperText: content.containers.userForm.form.role.helperText,
                          fullWidth: true,
                        }}
                        testId="userform-form-role-field"
                      />
                    </FieldWrapper>
                  </Grid>
                </Grid>
              </Container>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => handleCloseDialog()} testId="userform-form-cancel-button" variant="outlined">
                {content.containers.userForm.form.button.cancel}
              </Button>
              <Button disabled={isSubmitting} testId="userform-form-submit-button" variant="contained" type="submit">
                {content.containers.userForm.form.button.submit}
              </Button>
            </DialogActions>
          </Form>
        )}
      </Formik>
    </Dialog>
  );
};

export default UserForm;
