import React, { memo } from "react";

import PeerEvaluationColumnForm, { IColumnFormValue } from "@/forms/PeerEvaluationColumnForm";

interface IUpdateColumnForm extends IColumnFormValue {
  state: boolean;
  updateFormState: (state: boolean) => void;
  onSubmit: (data: IColumnFormValue) => void;
}

const UpdateColumnForm = ({ state, updateFormState, onSubmit, description }: IUpdateColumnForm) => {
  const submitForm = (dataForm: IColumnFormValue) => {
    onSubmit(dataForm);
    updateFormState(false);
  };

  if (!state) {
    return null;
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
