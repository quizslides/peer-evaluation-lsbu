import React, { memo } from "react";

import ColumnForm, { IColumnFormValue } from "@/forms/ColumnForm";
import { initialColumnState } from "@/types/module";

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
    <ColumnForm
      state={state}
      formTitle="New column"
      updateFormState={updateFormState}
      onSubmitForm={submitForm}
      description={initialColumnState.description}
    />
  );
};

export default memo(CreateColumnForm);
