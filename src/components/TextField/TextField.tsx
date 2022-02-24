import React, { memo } from "react";

import { TextField as TextFieldMUI, TextFieldProps } from "@mui/material";

export interface ITextField {
  testId: string;
  props: TextFieldProps;
}

const TextField = ({ testId, props }: ITextField) => {
  return <TextFieldMUI data-testid={testId} {...props} />;
};

export default memo(TextField);
