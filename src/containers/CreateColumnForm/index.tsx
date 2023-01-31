import React, { memo } from "react";

import PeerEvaluationColumnForm, { IColumnFormValue } from "@/forms/PeerEvaluationColumnForm";
import { initialColumnState } from "@/types/peer-evaluation";

interface ICreateColumnForm {
  state: boolean;
  updateFormState: (state: boolean) => void;
  onSubmit: (data: IColumnFormValue) => void;
}

const CreateColumnForm = ({ state, updateFormState, onSubmit }: ICreateColumnForm) => {
  const submitForm = (dataForm: IColumnFormValue) => {
    onSubmit(dataForm);
    updateFormState(false);
  };

  if (!state) {
    return null;
  }

  return (
    <PeerEvaluationColumnForm
      description={initialColumnState.description}
      formTitle="New column"
      isNewColumn
      onSubmitForm={submitForm}
      state={state}
      updateFormState={updateFormState}
    />
  );
};

export default memo(CreateColumnForm);
