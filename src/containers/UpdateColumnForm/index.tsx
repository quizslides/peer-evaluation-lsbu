import React, { memo } from "react";

import ColumnForm, { IColumnFormValue } from "@/forms/ColumnForm";

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
    <ColumnForm
      state={state}
      formTitle="New column"
      updateFormState={updateFormState}
      onSubmitForm={submitForm}
      description={description}
    />
  );
};

export default memo(UpdateColumnForm);
