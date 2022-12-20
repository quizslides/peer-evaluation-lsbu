import React, { memo } from "react";

import MenuItem from "@mui/material/MenuItem";
import TextField, { TextFieldProps } from "@mui/material/TextField";
import { useField } from "formik";

import { JSONStringNumber } from "@/types/object";

interface ISelectFieldForm {
  appendHelperText: boolean;
  name: string;
  options: JSONStringNumber;
  props: TextFieldProps;
  testId: string;
}

const SelectFieldForm = ({ appendHelperText, name, options, props, testId }: ISelectFieldForm) => {
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
          {appendHelperText ? `${options[item]} (${props.helperText})` : options[item]}
        </MenuItem>
      ))}
    </TextField>
  );
};

SelectFieldForm.defaultProps = { appendHelperText: false };

export default memo(SelectFieldForm);
