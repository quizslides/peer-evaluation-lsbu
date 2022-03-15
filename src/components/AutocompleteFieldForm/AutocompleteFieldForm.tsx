import React, { FC, memo } from "react";

import { Autocomplete as AutocompleteMUI } from "@mui/material";
import { TextFieldProps } from "@mui/material/TextField";
import { useField, useFormikContext } from "formik";

import TextField from "@/components/TextField/TextField";

export type TOptions = { label: string };

interface IAutocompleteFieldForm {
  testId: string;
  name: string;
  textFieldProps: TextFieldProps;
  options: TOptions[];
  dependantField?: string;
  getDependantFieldValue?: (value: string) => string;
}

const AutocompleteFieldForm: FC<IAutocompleteFieldForm> = ({
  testId,
  name,
  options,
  dependantField,
  getDependantFieldValue,
  textFieldProps,
}) => {
  const { setFieldValue } = useFormikContext();

  const [field, meta] = useField(name);

  if (meta && meta.touched && meta.error) {
    textFieldProps.error = true;
    textFieldProps.helperText = meta.error;
  }

  return (
    <AutocompleteMUI
      value={meta.value}
      data-testid={testId}
      options={options}
      onChange={(_, value) => {
        setFieldValue(name, value?.label);

        if (dependantField && getDependantFieldValue) {
          setFieldValue(dependantField, getDependantFieldValue(value?.label));
        }
      }}
      renderInput={(params) => (
        <TextField testId={`${testId}-text-field`} props={{ ...params, ...textFieldProps, ...field }} />
      )}
    />
  );
};

export default memo(AutocompleteFieldForm);
