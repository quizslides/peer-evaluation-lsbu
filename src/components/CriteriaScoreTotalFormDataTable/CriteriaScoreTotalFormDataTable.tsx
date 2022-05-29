import React, { memo, useEffect, useState } from "react";

import { useFormikContext } from "formik";

import { FieldWrapper } from "@/forms/style";

interface ICriteriaScoreTotal {
  name: string;
  testId: string;
  initialValue: string;
  updatedValue: string;
  updateDataTableFormValue: ((value: string) => void) | undefined;
}

const CriteriaScoreTotalFormDataTable = ({
  name,
  initialValue,
  updatedValue,
  testId,
  updateDataTableFormValue,
}: ICriteriaScoreTotal) => {
  const { setFieldValue } = useFormikContext();

  const [criteriaScoreTotal, setCriteriaScoreTotal] = useState<string>(initialValue);

  useEffect(() => {
    if (updateDataTableFormValue) {
      setCriteriaScoreTotal(updatedValue);
    }
  }, [updateDataTableFormValue, updatedValue]);

  useEffect(() => {
    setFieldValue(name, Number(criteriaScoreTotal), false);
  }, [criteriaScoreTotal, name, setFieldValue]);

  return (
    <FieldWrapper data-testid={testId} marginBottom="3em">
      {criteriaScoreTotal}
    </FieldWrapper>
  );
};

export default memo(CriteriaScoreTotalFormDataTable);
