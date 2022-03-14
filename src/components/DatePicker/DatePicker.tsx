import React, { FC, memo } from "react";

import { DatePicker as DatePickerMUI, DatePickerProps } from "@mui/lab/";

import TextField from "@/components/TextField/TextField";

type DatePickerPropsPartial = Pick<DatePickerProps, "label" | "value" | "onChange" | "disablePast">;

interface IDatePicker extends DatePickerPropsPartial {
  testId: string;
}

const DateTimePicker: FC<IDatePicker> = ({ testId, ...props }) => {
  return (
    <DatePickerMUI
      {...props}
      inputFormat="DD/MM/yyyy"
      renderInput={(params) => <TextField props={{ ...params }} testId={testId} />}
    />
  );
};

export type { IDatePicker };

export default memo(DateTimePicker);
