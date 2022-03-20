import React, { memo, useState } from "react";

import { DatePicker as DatePickerMUI, DatePickerProps } from "@mui/lab";
import { TextFieldProps } from "@mui/material";
import { useField, useFormikContext } from "formik";

import TextField from "@/components/TextField/TextField";
import { tomorrowDate } from "@/utils/form";

type DatePickerPropsPartial = Pick<DatePickerProps, "disablePast" | "minDate" | "label">;

interface IDatePickerForm extends DatePickerPropsPartial {
  testId: string;
  name: string;
  disabled?: boolean;
  props: TextFieldProps;
}

const DatePickerForm = ({ testId, name, label, disabled, props, ...datePickerProps }: IDatePickerForm) => {
  const { setFieldValue } = useFormikContext();

  const [field, meta] = useField(name);

  const [dateValue, setDateValue] = useState<Date | null>(meta.initialValue);

  const configDatePicker = {
    fullWidth: true,
    InputLabelProps: {
      shrink: true,
    },
    ...field,
    ...props,
  };

  if (meta && meta.touched && meta.error) {
    props.error = true;
    props.helperText = meta.error;
  }

  return (
    <DatePickerMUI
      {...datePickerProps}
      value={dateValue}
      label={label}
      disabled={disabled}
      inputFormat="dd/MM/yyyy"
      minDate={tomorrowDate()}
      onChange={(newValue) => {
        setDateValue(newValue as Date | null);
        setFieldValue(name, newValue);
      }}
      renderInput={(params) => <TextField props={{ ...configDatePicker, ...params }} testId={testId} />}
    />
  );
};

export default memo(DatePickerForm);
