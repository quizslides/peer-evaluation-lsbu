import React, { memo } from "react";

import { FormikErrors, useField, useFormikContext } from "formik";
import { reach } from "yup";
import { OptionalObjectSchema } from "yup/lib/object";
import { AnyObject } from "yup/lib/types";

import TextField, { ITextField } from "@/components/TextField/TextField";

interface ITextFieldFormDataTable extends ITextField {
  name: string;
  updateDataTableFormValue: (value: string) => void;
  validationSchema: OptionalObjectSchema<AnyObject>;
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

  if (props.type === "number") {
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
      .validate(meta.value)
      .catch((e: FormikErrors<Error>) => {
        setErrors(e);
      });
  }

  return <TextField testId={testId} props={{ ...field, ...props }} />;
};

export default memo(TextFieldFormDataTable);
