import React, { memo } from "react";

import { TextField as TextFieldMUI, TextFieldProps } from "@mui/material";
import { useField } from "formik";

interface ITextField {
  testId: string;
  name: string;
  props: TextFieldProps;
}

const TextField = ({ testId, name, props }: ITextField) => {
  const [field, meta] = useField(name);

  if (meta && meta.touched && meta.error) {
    props.error = true;
    props.helperText = meta.error;
  }

  return <TextFieldMUI data-testid={testId} {...field} {...props} />;
};

export default memo(TextField);
