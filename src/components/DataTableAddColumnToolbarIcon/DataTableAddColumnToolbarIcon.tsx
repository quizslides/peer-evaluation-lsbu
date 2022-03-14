import React, { memo } from "react";

import IconButtonWrapper from "../IconButtonWrapper/IconButtonWrapper";

import { AddIcon } from "@/icons";

interface IDataTableAddColumnToolbarIcon {
  onClick: () => void;
  testId: string;
}

const DataTableAddColumnToolbarIcon = ({ onClick, testId }: IDataTableAddColumnToolbarIcon) => {
  return (
    <IconButtonWrapper testId={testId} tooltip={"Add Column"} onClick={onClick}>
      <AddIcon testId={`${testId}-icon`} />
    </IconButtonWrapper>
  );
};

export default memo(DataTableAddColumnToolbarIcon);
