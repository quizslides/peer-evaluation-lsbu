import React, { memo, useEffect, useState } from "react";

import { User } from "@generated/type-graphql";
import { Container, Grid } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Form, Formik } from "formik";
import { object } from "yup";

import { AutocompleteFieldForm, Button, SelectFieldForm, TextField } from "@/components";
import { TOptions } from "@/components/AutocompleteFieldForm/AutocompleteFieldForm";
import content from "@/content";
import { FieldWrapper } from "@/forms/style";
import { ModuleMember, ModuleMemberPermissions, ModuleMemberPermissionsNoOwner } from "@/types/module";
import { JSONStringNumber } from "@/types/object";
import {
  moduleMemberIdValidator,
  moduleMemberNameValidator,
  moduleMemberPermissionValidator,
  userEmailValidator,
} from "@/utils";

interface IModuleMemberForm {
  state: boolean;
  formTitle: string;
  isModuleMemberOwner: boolean;
  users: User[];
  data: ModuleMember;
  updateFormState: (state: boolean) => void;
  onSubmitForm: (data: ModuleMember) => void;
}

const ModuleMemberForm = ({
  formTitle,
  state,
  updateFormState,
  onSubmitForm,
  users,
  isModuleMemberOwner,
  ...moduleMemberFormData
}: IModuleMemberForm) => {
  const [userEmailAutocomplete, setUserEmailAutocomplete] = useState<TOptions[]>();

  const handleCloseDialog = (reason?: string) => {
    if (reason === "backdropClick") {
      return;
    }

    updateFormState(false);
  };

  const [isSubmitting, setSubmitting] = useState<boolean>(false);

  const [scopeModuleMemberPermissions, setScopeModuleMemberPermissions] = useState<JSONStringNumber | null>(null);

  const validationSchema = object({
    ...moduleMemberIdValidator,
    ...userEmailValidator,
    ...moduleMemberNameValidator,
    ...moduleMemberPermissionValidator,
  });

  const submitForm = (formData: ModuleMember) => {
    setSubmitting(true);

    formData.id = moduleMemberFormData.data.id.length
      ? moduleMemberFormData.data.id
      : getSubmittedUserId(formData.email);

    onSubmitForm(formData);
  };

  const sanitizeUserAutocomplete = (users: User[]) => users.map(({ email }) => ({ label: email }));

  const getModuleMemberName = (email: string) => {
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
    const permissions = isModuleMemberOwner ? ModuleMemberPermissions : ModuleMemberPermissionsNoOwner;
    setScopeModuleMemberPermissions(permissions);
  }, [isModuleMemberOwner]);

  return (
    <Dialog fullWidth maxWidth={"sm"} open={state} onClose={(_, reason) => handleCloseDialog(reason)}>
      <DialogTitle>{formTitle}</DialogTitle>
      <Formik
        initialValues={{
          ...moduleMemberFormData.data,
        }}
        validationSchema={validationSchema}
        onSubmit={submitForm}
      >
        {(props) => (
          <Form>
            <DialogContent>
              <Container maxWidth="sm">
                <Grid container direction="column" justifyContent="center" alignItems="stretch" spacing={3}>
                  <Grid item xs={6}>
                    <FieldWrapper>
                      <AutocompleteFieldForm
                        testId="module-member-form-email-field"
                        name="email"
                        options={userEmailAutocomplete || []}
                        dependantField="name"
                        getDependantFieldValue={getModuleMemberName}
                        textFieldProps={{
                          required: true,
                          fullWidth: true,
                          label: content.containers.moduleMemberForm.form.email.label,
                          type: "text",
                          variant: "outlined",
                          placeholder: content.containers.moduleMemberForm.form.email.placeholder,
                          helperText: content.containers.moduleMemberForm.form.email.helperText,
                        }}
                      />
                    </FieldWrapper>

                    <FieldWrapper>
                      <TextField
                        testId={"module-member-form-name-field"}
                        props={{
                          name: "name",
                          value: props.values.name,
                          disabled: true,
                          fullWidth: true,
                          label: content.containers.moduleMemberForm.form.name.label,
                          type: "text",
                          variant: "outlined",
                          placeholder: content.containers.moduleMemberForm.form.name.placeholder,
                          helperText: content.containers.moduleMemberForm.form.name.helperText,
                        }}
                      />
                    </FieldWrapper>
                    <FieldWrapper>
                      {scopeModuleMemberPermissions && (
                        <SelectFieldForm
                          name="permission"
                          options={scopeModuleMemberPermissions}
                          props={{
                            required: true,
                            label: content.containers.moduleMemberForm.form.permission.label,
                            helperText: content.containers.moduleMemberForm.form.permission.helperText,
                            fullWidth: true,
                          }}
                          testId="module-member-form-permission-field"
                        />
                      )}
                    </FieldWrapper>
                  </Grid>
                </Grid>
              </Container>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => handleCloseDialog()} testId="module-member-form-cancel-button" variant="outlined">
                {content.containers.moduleMemberForm.form.button.cancel}
              </Button>
              <Button
                disabled={isSubmitting}
                testId="module-member-form-submit-button"
                variant="contained"
                type="submit"
              >
                {content.containers.moduleMemberForm.form.button.submit}
              </Button>
            </DialogActions>
          </Form>
        )}
      </Formik>
    </Dialog>
  );
};

export default memo(ModuleMemberForm);
