import React, { memo } from "react";

import MenuItem from "@mui/material/MenuItem";
import TextField, { TextFieldProps } from "@mui/material/TextField";
import { FormikErrors, useField, useFormikContext } from "formik";
import { reach } from "yup";
import { OptionalObjectSchema } from "yup/lib/object";
import { AnyObject } from "yup/lib/types";

import { JSONStringNumber } from "@/types/object";

interface ISelectFieldFormDataTable {
  testId: string;
  name: string;
  props: TextFieldProps;
  options: JSONStringNumber;
  validationSchema: OptionalObjectSchema<AnyObject>;
  validationFieldPath: string;
  updateDataTableFormValue: (value: string) => void;
}

const SelectFieldFormDataTable = ({
  testId,
  name,
  options,
  props,
  validationSchema,
  validationFieldPath,
  updateDataTableFormValue,
}: ISelectFieldFormDataTable) => {
  const { setFieldValue, setErrors } = useFormikContext();

  const [field, meta] = useField(name);

  if (props.type === "number" || props.type === "text") {
    field.value = !field.value && field.value !== 0 ? "" : field.value;
  }

  props.onChange = (e) => {
    setFieldValue(name, e.target.value, true);
    updateDataTableFormValue(e.target.value);
  };

  const config = {
    select: true,
    type: "select",
    ...field,
    ...props,
  };

  if (meta && meta.touched && meta.error) {
    props.error = true;
    props.helperText = meta.error;

    reach(validationSchema, validationFieldPath)
      .validate(meta.value)
      .catch((e: FormikErrors<Error>) => {
        setErrors(e);
      });
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

export default memo(SelectFieldFormDataTable);
