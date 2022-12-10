import React, { memo, useState } from "react";

import { useField, useFormikContext } from "formik";

import Dialog from "../Dialog/Dialog";
import SwitchForm from "../SwitchForm/SwitchForm";
import TextField from "../TextField/TextField";

import Button, { IButton } from "@/components/Button/Button";
import { FieldWrapper } from "@/forms/style";

interface FormValueData {
  studentId: string;
  peerEvaluationReviewId: string;
  criteriaScoreTotal: number;
  isValid: boolean;
  comment: string;
}

interface IButtonFieldFormDataTablePeerEvaluationValidity {
  name: string;
  props: IButton;
  criteriaScoreTotal: number;
  formValue: FormValueData;
  updateDataTableFormValue: (value: string) => void;
}

const ButtonFieldFormDataTablePeerEvaluationValidity = ({
  name,
  props,
  formValue,
  updateDataTableFormValue,
  criteriaScoreTotal,
}: IButtonFieldFormDataTablePeerEvaluationValidity) => {
  const { setFieldValue } = useFormikContext();

  const [checked, setChecked] = React.useState(true);

  const [isDialogOpen, setDialogOpen] = useState(false);

  const [field] = useField(name);

  const updateDialogState = () => setDialogOpen(!isDialogOpen);

  const onSaveDialogState = () => {
    const dataUpdated = {
      ...formValue,
      isValid: checked,
    };

    // HACK: Solution to handle a form value as an object with the DataTable
    updateDataTableFormValue(dataUpdated as unknown as string);

    setFieldValue(name, dataUpdated, false);

    updateDialogState();
  };

  const config = {
    ...field,
    ...props,
  };

  return (
    <>
      <Dialog
        testId={config.testId}
        title={""}
        maxWidth={"md"}
        fullWidth
        content={
          <>
            <FieldWrapper>
              <SwitchForm
                initialState={formValue.isValid}
                label={"Valid"}
                name={"valid"}
                labelPlacement={"end"}
                onStateChange={(state) => setChecked(state)}
              />
            </FieldWrapper>

            <FieldWrapper>
              <TextField
                testId={"peer-evaluation-member-form-name-field"}
                props={{
                  name: "name",
                  value: formValue.comment,
                  disabled: true,
                  fullWidth: true,
                  label: "Comment",
                  type: "text",
                  variant: "outlined",
                  multiline: true,
                }}
              />
            </FieldWrapper>
          </>
        }
        rightButton="Close"
        rightButtonVariant="outlined"
        onClickRightButton={onSaveDialogState}
        open={isDialogOpen}
      />

      <Button
        {...config}
        variant="outlined"
        testId={`${config.testId}-button-peer-evaluation-validity`}
        size="small"
        fullWidth
        onClick={updateDialogState}
        style={{
          textDecoration: formValue.isValid ? "none" : "line-through",
          border: 0,
        }}
      >
        {criteriaScoreTotal}
      </Button>
    </>
  );
};

export default memo(ButtonFieldFormDataTablePeerEvaluationValidity);
