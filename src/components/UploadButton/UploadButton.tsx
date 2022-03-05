import React, { memo } from "react";

import styled from "@emotion/styled";
import Papa, { ParseResult } from "papaparse";

import IconButtonWrapper from "@/components/IconButtonWrapper/IconButtonWrapper";
import { UploadIcon } from "@/icons";

export interface File {
  name: string;
  lastModified: number;
  size: number;
  type: string;
}

export interface UploadFileProps {
  onFilesSelected: (files: ObjectCSV) => void;
}

export type ObjectCSV = {
  [key: string]: [value: string];
}[];

const UploadButton = ({ onFilesSelected }: UploadFileProps) => {
  const csvOptions = {
    header: true,
    dynamicTyping: true,
    skipEmptyLines: true,
    transformHeader: (header: string) => header.toLowerCase(),
  };

  const Input = styled("input")({
    display: "none",
  });

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      Papa.parse(e.target.files[0], {
        ...csvOptions,
        complete: (results: ParseResult<object>) => {
          onFilesSelected(results.data as ObjectCSV);
        },
      });
    }
  };

  return (
    <label htmlFor="contained-button-file">
      <Input type="file" accept=".csv" id="contained-button-file" multiple={false} onChange={handleUpload} />
      <IconButtonWrapper testId="upload-button-wrapper" tooltip={"Upload"} component="span">
        <UploadIcon testId={"upload-button-icon"} />
      </IconButtonWrapper>
    </label>
  );
};

export default memo(UploadButton);
