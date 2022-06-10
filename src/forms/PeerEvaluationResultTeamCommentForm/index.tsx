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
import { peerEvaluationStudentTeamResultComment } from "@/utils";

interface IPeerEvaluationResultTeamCommentFormData {
  comment: string | null;
}

interface IPeerEvaluationResultTeamCommentForm {
  comment: string | null;
  testId: string;
  onSubmitForm: (data: IPeerEvaluationResultTeamCommentFormData) => Promise<void>;
}

const PeerEvaluationResultTeamCommentForm = ({
  comment,
  testId,
  onSubmitForm,
}: IPeerEvaluationResultTeamCommentForm) => {
  const [isCommentDialogOpen, setIsCommentDialogOpen] = useState<boolean>(false);

  const handleCloseDialog = (reason?: string) => {
    if (reason === "backdropClick") {
      return;
    }

    setDialogFormState(false);
  };

  const validationSchema = object({
    ...peerEvaluationStudentTeamResultComment,
  });

  const submitForm = async (formData: IPeerEvaluationResultTeamCommentFormData) => {
    await onSubmitForm(formData);
    setIsCommentDialogOpen(false);
  };

  const setDialogFormState = (state: boolean) => setIsCommentDialogOpen(state);

  return (
    <>
      <Button variant={"text"} testId={testId} size="small" disableRipple onClick={() => setDialogFormState(true)}>
        View Comment
      </Button>
      <Dialog fullWidth maxWidth={"sm"} open={isCommentDialogOpen} onClose={(_, reason) => handleCloseDialog(reason)}>
        <DialogTitle>Peer Evaluation Team Comment</DialogTitle>
        <Formik
          initialValues={{
            comment: comment,
          }}
          validationSchema={validationSchema}
          onSubmit={async (data, { resetForm }) => {
            await submitForm(data);
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
                          testId={testId}
                          name="comment"
                          props={{
                            fullWidth: true,
                            label: content.containers.PeerEvaluationResultTeamCommentForm.form.comment.label,
                            type: "text",
                            variant: "outlined",
                            maxRows: 5,
                            multiline: true,
                            placeholder:
                              content.containers.PeerEvaluationResultTeamCommentForm.form.comment.placeholder,
                          }}
                        />
                      </FieldWrapper>
                    </Grid>
                  </Grid>
                </Container>
              </DialogContent>
              <DialogActions>
                <Button onClick={() => handleCloseDialog()} testId={testId} variant="outlined">
                  {content.containers.PeerEvaluationResultTeamCommentForm.form.button.cancel}
                </Button>
                <Button testId={testId} variant="contained" type="submit">
                  {content.containers.PeerEvaluationResultTeamCommentForm.form.button.submit}
                </Button>
              </DialogActions>
            </Form>
          )}
        </Formik>
      </Dialog>
    </>
  );
};

export type { IPeerEvaluationResultTeamCommentFormData };

export default memo(PeerEvaluationResultTeamCommentForm);
