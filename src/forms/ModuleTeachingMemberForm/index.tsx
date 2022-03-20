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
import { ModuleTeachingMember, ModuleTeachingMemberRoles, ModuleTeachingMemberRolesNoOwner } from "@/types/module";
import { JSONStringNumber } from "@/types/object";
import {
  moduleTeachingMemberIdValidator,
  moduleTeachingMemberNameValidator,
  moduleTeachingMemberRoleValidator,
  userEmailValidator,
} from "@/utils";

interface IModuleTeachingMemberForm {
  state: boolean;
  formTitle: string;
  isModuleTeachingMemberOwner: boolean;
  users: User[];
  data: ModuleTeachingMember;
  updateFormState: (state: boolean) => void;
  onSubmitForm: (data: ModuleTeachingMember) => void;
}

const ModuleTeachingMemberForm = ({
  formTitle,
  state,
  updateFormState,
  onSubmitForm,
  users,
  isModuleTeachingMemberOwner,
  ...moduleTeachingMemberFormData
}: IModuleTeachingMemberForm) => {
  const [userEmailAutocomplete, setUserEmailAutocomplete] = useState<TOptions[]>();

  const handleCloseDialog = (reason?: string) => {
    if (reason === "backdropClick") {
      return;
    }

    updateFormState(false);
  };

  const [isSubmitting, setSubmitting] = useState<boolean>(false);

  const [scopeModuleTeachingMemberRoles, setScopeModuleTeachingMemberRoles] = useState<JSONStringNumber | null>(null);

  const validationSchema = object({
    ...moduleTeachingMemberIdValidator,
    ...userEmailValidator,
    ...moduleTeachingMemberNameValidator,
    ...moduleTeachingMemberRoleValidator,
  });

  const submitForm = (formData: ModuleTeachingMember) => {
    setSubmitting(true);

    formData.id = moduleTeachingMemberFormData.data.id.length
      ? moduleTeachingMemberFormData.data.id
      : getSubmittedUserId(formData.email);

    onSubmitForm(formData);
  };

  const sanitizeUserAutocomplete = (users: User[]) => users.map(({ email }) => ({ label: email }));

  const getModuleTeachingMemberName = (email: string) => {
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
    const roles = isModuleTeachingMemberOwner ? ModuleTeachingMemberRoles : ModuleTeachingMemberRolesNoOwner;
    setScopeModuleTeachingMemberRoles(roles);
  }, [isModuleTeachingMemberOwner]);

  return (
    <Dialog fullWidth maxWidth={"sm"} open={state} onClose={(_, reason) => handleCloseDialog(reason)}>
      <DialogTitle>{formTitle}</DialogTitle>
      <Formik
        initialValues={{
          ...moduleTeachingMemberFormData.data,
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
                        getDependantFieldValue={getModuleTeachingMemberName}
                        textFieldProps={{
                          required: true,
                          fullWidth: true,
                          label: content.containers.moduleTeachingMemberForm.form.email.label,
                          type: "text",
                          variant: "outlined",
                          placeholder: content.containers.moduleTeachingMemberForm.form.email.placeholder,
                          helperText: content.containers.moduleTeachingMemberForm.form.email.helperText,
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
                          label: content.containers.moduleTeachingMemberForm.form.name.label,
                          type: "text",
                          variant: "outlined",
                          placeholder: content.containers.moduleTeachingMemberForm.form.name.placeholder,
                          helperText: content.containers.moduleTeachingMemberForm.form.name.helperText,
                        }}
                      />
                    </FieldWrapper>
                    <FieldWrapper>
                      {scopeModuleTeachingMemberRoles && (
                        <SelectFieldForm
                          name="role"
                          options={scopeModuleTeachingMemberRoles}
                          props={{
                            required: true,
                            label: content.containers.moduleTeachingMemberForm.form.role.label,
                            helperText: content.containers.moduleTeachingMemberForm.form.role.helperText,
                            fullWidth: true,
                          }}
                          testId="module-member-form-role-field"
                        />
                      )}
                    </FieldWrapper>
                  </Grid>
                </Grid>
              </Container>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => handleCloseDialog()} testId="module-member-form-cancel-button" variant="outlined">
                {content.containers.moduleTeachingMemberForm.form.button.cancel}
              </Button>
              <Button
                disabled={isSubmitting}
                testId="module-member-form-submit-button"
                variant="contained"
                type="submit"
              >
                {content.containers.moduleTeachingMemberForm.form.button.submit}
              </Button>
            </DialogActions>
          </Form>
        )}
      </Formik>
    </Dialog>
  );
};

export default memo(ModuleTeachingMemberForm);
