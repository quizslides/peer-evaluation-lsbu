import React, { memo, useState } from "react";

import { Alert, Button, Dialog } from "@/components";
import PeerEvaluationColumnForm, { IColumnFormValue } from "@/forms/PeerEvaluationColumnForm";
import { IPeerEvaluationColumn, PeerEvaluationColumnAction } from "@/types/peer-evaluation";

export type TColumnFormValueUpdate = Pick<IPeerEvaluationColumn, "description" | "action">;

interface IUpdateColumnForm extends IColumnFormValue {
  state: boolean;
  updateFormState: (state: boolean) => void;
  onSubmit: (data: TColumnFormValueUpdate) => void;
}

const UpdateColumnForm = ({ state, updateFormState, onSubmit, description }: IUpdateColumnForm) => {
  const [isConfirmationEditOpen, setConformationEditOpen] = useState<boolean>(false);

  const [dataFormState, setDataFormState] = useState<IColumnFormValue | null>(null);

  const onAcceptEdit = (action: PeerEvaluationColumnAction) => {
    if (dataFormState) {
      onSubmit({
        ...dataFormState,
        action,
      });

      updateFormState(false);
      setConformationEditOpen(false);
    }
  };

  const submitForm = (dataForm: IColumnFormValue) => {
    setDataFormState(dataForm);

    setConformationEditOpen(true);
  };

  const onCancelEdit = () => {
    updateFormState(false);
    setConformationEditOpen(false);
  };

  if (!state) {
    return null;
  }

  if (isConfirmationEditOpen) {
    return (
      <Dialog
        testId={"bulk-add-edit-dialog"}
        title={"Are you sure?"}
        content={
          <Alert testId={"bulk-add-edit-dialog"} severity="warning">
            You are about to make a change to the column description for your published peer evaluation, which may
            affect existing student submissions. Please select your option carefully:
            <br />
            <br />
            <b>CANCEL</b>: Abort any changes.
            <br />
            <br />
            <b>UPDATE</b>: Save the new description if did not change the column description meaning.
            <br />
            <br />
            <b>UPDATE AND CLEAR</b>: If the meaning of the description has changed, select this option to clear all
            marks already submitted by students for this column and mark their peer evaluation as incomplete. Please
            note you must notify the affected students to update their peer evaluations.
          </Alert>
        }
        rightButton="Update and clear"
        leftButton="Update"
        rightButtonVariant="outlined"
        maxWidth="md"
        extraLeftButton={
          <Button variant={"text"} testId={""} onClick={onCancelEdit}>
            Cancel
          </Button>
        }
        onClickRightButton={() => onAcceptEdit(PeerEvaluationColumnAction.CLEAR_RESULTS)}
        onClickLeftButton={() => onAcceptEdit(PeerEvaluationColumnAction.NONE)}
        open={isConfirmationEditOpen}
      />
    );
  }

  return (
    <PeerEvaluationColumnForm
      description={description}
      formTitle="Update column"
      onSubmitForm={submitForm}
      state={state}
      updateFormState={updateFormState}
    />
  );
};

export default memo(UpdateColumnForm);
