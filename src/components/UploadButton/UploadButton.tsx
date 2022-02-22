import React, { useEffect, useState } from "react";

import styled from "@emotion/styled";
import { ParseResult } from "papaparse";
import { useCSVReader } from "react-papaparse";

import IconButtonWrapper from "@/components/IconButtonWrapper/IconButtonWrapper";
import { UploadIcon } from "@/icons";

export interface File {
  name: string;
  lastModified: number;
  size: number;
  type: string;
}

export interface UploadFileProps {
  onFilesSelected?: (files: string[][]) => void;
  multiple: boolean;
}

export const Wrapper = styled.div``;

const UploadButton = ({ onFilesSelected }: UploadFileProps) => {
  const { CSVReader } = useCSVReader();

  const [fileData, setFileData] = useState<string[][]>([]);

  useEffect(() => {
    if (!onFilesSelected) {
      return;
    }

    onFilesSelected(fileData);
  }, [onFilesSelected, fileData]);

  return (
    <CSVReader
      onUploadAccepted={(results: ParseResult<object>) => {
        setFileData(results.data as string[][]);
      }}
      multiple={false}
    >
      {({ getRootProps }: any) => (
        <>
          <IconButtonWrapper
            data-testid="upload-button-wrapper"
            {...getRootProps()}
            tooltip={"Upload"}
            style={{ margin: 1 }}
          >
            <UploadIcon testId={"upload-button-icon"} />
          </IconButtonWrapper>
        </>
      )}
    </CSVReader>
  );
};

export default UploadButton;
