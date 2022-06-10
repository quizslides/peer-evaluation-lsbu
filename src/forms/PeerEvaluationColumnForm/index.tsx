import React, { memo, useState } from "react";

import { Container, Grid } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Form, Formik } from "formik";
import { object } from "yup";

import { Button, TextFieldForm, WarningUnsavedForm } from "@/components";
import content from "@/content";
import { FieldWrapper } from "@/forms/style";
import { IPeerEvaluationColumn } from "@/types/peer-evaluation";
import { peerEvaluationColumnIdValidator, peerEvaluationColumnValidator } from "@/utils";

type IColumnFormValue = Pick<IPeerEvaluationColumn, "description">;

interface IUserForm extends IColumnFormValue {
  state: boolean;
  formTitle: string;
  updateFormState: (state: boolean) => void;
  onSubmitForm: (data: IColumnFormValue) => void;
}

const PeerEvaluationColumnForm = ({
  formTitle,
  state,
  updateFormState,
  onSubmitForm,
  ...columnFormData
}: IUserForm) => {
  const handleCloseDialog = (reason?: string) => {
    if (reason === "backdropClick") {
      return;
    }

    updateFormState(false);
  };

  const [isSubmitting, setSubmitting] = useState<boolean>(false);

  const validationSchema = object({
    ...peerEvaluationColumnIdValidator,
    ...peerEvaluationColumnValidator,
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
        onSubmit={(data, { resetForm }) => {
          submitForm(data);
          resetForm({
            values: data,
          });
        }}
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
              <Button onClick={() => handleCloseDialog()} testId="column-form-cancel-button" variant="outlined">
                {content.containers.columnForm.form.button.cancel}
              </Button>
              <Button disabled={isSubmitting} testId="column-form-submit-button" variant="contained" type="submit">
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

export default memo(PeerEvaluationColumnForm);
