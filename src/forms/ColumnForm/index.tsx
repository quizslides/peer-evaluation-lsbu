import React, { useState } from "react";

import { Container, Grid } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Form, Formik } from "formik";
import { object } from "yup";

import { Button, TextFieldForm } from "@/components";
import content from "@/content";
import { FieldWrapper } from "@/forms/style";
import { IPeerEvaluationColumn } from "@/types/module";
import { moduleColumnValidator } from "@/utils";

type IColumnFormValue = Pick<IPeerEvaluationColumn, "description">;

interface IUserForm extends IColumnFormValue {
  state: boolean;
  formTitle: string;
  updateFormState: (state: boolean) => void;
  onSubmitForm: (data: IColumnFormValue) => void;
}

const ColumnForm = ({ formTitle, state, updateFormState, onSubmitForm, ...columnFormData }: IUserForm) => {
  const handleCloseDialog = (reason?: string) => {
    if (reason === "backdropClick") {
      return;
    }

    updateFormState(false);
  };

  const [isSubmitting, setSubmitting] = useState<boolean>(false);

  const validationSchema = object({
    ...moduleColumnValidator,
  });

  const submitForm = (formData: IColumnFormValue) => {
    setSubmitting(true);
    onSubmitForm(formData);
  };

  return (
    <Dialog fullWidth maxWidth={"sm"} open={state} onClose={(_, reason) => handleCloseDialog(reason)}>
      <DialogTitle>{formTitle}</DialogTitle>
      <Formik
        initialValues={{
          ...columnFormData,
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
                        testId="column-form-description-field"
                        name="description"
                        props={{
                          required: true,
                          fullWidth: true,
                          label: content.containers.columnForm.form.description.label,
                          type: "text",
                          variant: "outlined",
                          placeholder: content.containers.columnForm.form.description.placeholder,
                          helperText: content.containers.columnForm.form.description.helperText,
                        }}
                      />
                    </FieldWrapper>
                  </Grid>
                </Grid>
              </Container>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => handleCloseDialog()} testId="user-form-cancel-button" variant="outlined">
                {content.containers.columnForm.form.button.cancel}
              </Button>
              <Button disabled={isSubmitting} testId="user-form-submit-button" variant="contained" type="submit">
                {content.containers.columnForm.form.button.submit}
              </Button>
            </DialogActions>
          </Form>
        )}
      </Formik>
    </Dialog>
  );
};

export type { IColumnFormValue };

export default ColumnForm;
