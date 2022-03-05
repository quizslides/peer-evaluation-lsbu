import React, { memo } from "react";

import MenuItem from "@mui/material/MenuItem";
import TextField, { TextFieldProps } from "@mui/material/TextField";
import { useField } from "formik";

type SelectOptions = {
  [key: string]: string;
};

interface ISelectFieldForm {
  testId: string;
  name: string;
  props: TextFieldProps;
  options: SelectOptions;
}

const SelectFieldForm = ({ testId, name, options, props }: ISelectFieldForm) => {
  const [field, meta] = useField(name);

  const config = {
    select: true,
    type: "select",
    ...props,
    ...field,
  };

  if (meta && meta.touched && meta.error) {
    props.error = true;
    props.helperText = meta.error;
  }

  return (
    <TextField data-testid={testId} {...config}>
      {Object.keys(options).map((item) => (
        <MenuItem key={item} value={item}>
          {options[item]}
        </MenuItem>
      ))}
    </TextField>
  );
};

export default memo(SelectFieldForm);
