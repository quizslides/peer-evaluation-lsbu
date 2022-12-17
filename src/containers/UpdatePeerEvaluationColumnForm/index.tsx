import React, { memo, useState } from "react";

import MuiAlert from "@mui/material/Alert";

import { Button, Dialog } from "@/components";
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
          <MuiAlert severity="warning">
            You are about to make a change to the column description for your published peer evaluation, which may
            affect existing student submissions.
            <br />
            <br />
            Click on accept and clear to clear all marks already submitted by students for this column and mark their
            peer evaluation as incomplete. Please notify the affected students to update their peer evaluations.
          </MuiAlert>
        }
        tooltipRightButton="Update description, clear all marks and set as incomplete the peer evaluations"
        tooltipLeftButton="The description of the column was not changed"
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
      state={state}
      formTitle="New column"
      updateFormState={updateFormState}
      onSubmitForm={submitForm}
      description={description}
    />
  );
};

export default memo(UpdateColumnForm);
