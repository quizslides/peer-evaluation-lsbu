import React, { memo } from "react";

import IconButtonWrapper from "../IconButtonWrapper/IconButtonWrapper";

import { RefreshIcon } from "@/icons";

interface IDataTableCustomToolbar {
  onClick: () => void;
  testId: string;
}

const DataTableRefreshToolbarIcon = ({ onClick, testId }: IDataTableCustomToolbar) => {
  return (
    <IconButtonWrapper testId={testId} tooltip={"Refresh"} onClick={onClick}>
      <RefreshIcon testId={`${testId}-icon`} />
    </IconButtonWrapper>
  );
};

export default memo(DataTableRefreshToolbarIcon);
