import React, { useState } from "react";

import styled from "@emotion/styled";
import { FormControl, FormHelperText } from "@mui/material";
import { useField, useFormikContext } from "formik";

import Button from "@/components/Button/Button";
import WYSIWYG from "@/components/WYSIWYG/WYSIWYG";

interface IWYSIWYGForm {
  testId: string;
  helperText: string;
  fieldName: string;
  resetButtonText: string;
}

const Wrapper = styled.div`
  margin-top: 2em;
  position: relative;
  margin-bottom: 1em;
`;

const BottomRight = styled.div`
  position: absolute;
  bottom: 100;
  right: 0;
`;

const WYSIWYGForm = ({ testId, helperText, fieldName, resetButtonText }: IWYSIWYGForm) => {
  const { setFieldValue } = useFormikContext();

  const [field, meta] = useField(fieldName);

  const [convertedText, setConvertedText] = useState(field.value);

  const onEditorChange = (editorValue: string) => {
    setConvertedText(editorValue);
    setFieldValue(fieldName, editorValue);
  };

  const resetWYSIWYGToDefault = () => {
    setConvertedText(meta.initialValue);
  };

  const modules = {
    toolbar: [
      [{ size: [] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ list: "ordered" }, { list: "bullet" }, { indent: "-1" }, { indent: "+1" }],
      ["link", "image", "video"],
      ["clean"],
    ],
    clipboard: {
      matchVisual: false,
    },
  };

  const formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "video",
  ];

  const isError = meta.error != undefined;

  return (
    <FormControl error={isError} variant="standard" fullWidth data-testid={testId}>
      <WYSIWYG theme="snow" value={convertedText} onChange={onEditorChange} modules={modules} formats={formats} />
      <FormHelperText>{isError ? meta.error : helperText}</FormHelperText>
      <Wrapper>
        <BottomRight>
          <Button size="small" onClick={resetWYSIWYGToDefault} testId={`${testId}-reset-button`} variant={"outlined"}>
            {resetButtonText}
          </Button>
        </BottomRight>
      </Wrapper>
    </FormControl>
  );
};

export default WYSIWYGForm;
