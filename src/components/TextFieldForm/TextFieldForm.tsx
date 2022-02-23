import React, { memo } from "react";

import { useField } from "formik";

import TextField, { ITextField } from "@/components/TextField/TextField";

interface ITextFieldForm extends ITextField {
  name: string;
}

const TextFieldForm = ({ testId, name, props }: ITextFieldForm) => {
  const [field, meta] = useField(name);

  if (meta && meta.touched && meta.error) {
    props.error = true;
    props.helperText = meta.error;
  }

  return <TextField testId={testId} props={{ ...props, ...field }} />;
};

export default memo(TextFieldForm);
