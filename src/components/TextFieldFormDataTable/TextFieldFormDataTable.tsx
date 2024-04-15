import React, { memo } from "react";

import { FormikErrors, useField, useFormikContext } from "formik";
import { AnyObjectSchema, reach } from "yup";

import TextField, { ITextField } from "@/components/TextField/TextField";

interface ITextFieldFormDataTable extends ITextField {
  name: string;
  updateDataTableFormValue: (value: string) => void;
  validationSchema: AnyObjectSchema;
  validationFieldPath: string;
}

const TextFieldFormDataTable = ({
  testId,
  name,
  updateDataTableFormValue,
  validationSchema,
  validationFieldPath,
  props,
}: ITextFieldFormDataTable) => {
  const { setFieldValue, setErrors } = useFormikContext();

  const [field, meta] = useField(name);

  if (props.type === "number" || props.type === "text") {
    field.value = !field.value && field.value !== 0 ? "" : field.value;
  }

  props.onChange = (e) => {
    setFieldValue(name, e.target.value, true);
    updateDataTableFormValue(e.target.value);
  };

  if (meta && meta.touched && meta.error) {
    props.error = true;
    props.helperText = meta.error;

    reach(validationSchema, validationFieldPath)
      // @ts-ignore
      // Due to type error and when the bug is fixed
      // @source https://github.com/jquense/yup/issues/2152
      .validate(meta.value)
      .catch((e: FormikErrors<Error>) => {
        setErrors(e);
      });
  }

  return <TextField testId={testId} props={{ ...field, ...props }} />;
};

export default memo(TextFieldFormDataTable);
