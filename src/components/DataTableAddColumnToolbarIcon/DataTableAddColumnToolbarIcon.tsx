import React, { memo } from "react";

import IconButtonWrapper from "../IconButtonWrapper/IconButtonWrapper";

import { AddIcon } from "@/icons";

interface IDataTableAddColumnToolbarIcon {
  onClick: () => void;
  testId: string;
  toolTipLabel: string;
}

const DataTableAddColumnToolbarIcon = ({ onClick, testId, toolTipLabel }: IDataTableAddColumnToolbarIcon) => {
  return (
    <IconButtonWrapper testId={testId} tooltip={toolTipLabel} onClick={onClick}>
      <AddIcon testId={`${testId}-icon`} />
    </IconButtonWrapper>
  );
};

export default memo(DataTableAddColumnToolbarIcon);
