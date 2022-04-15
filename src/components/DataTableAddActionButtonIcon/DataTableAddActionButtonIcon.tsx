import React, { memo } from "react";

import IconButtonWrapper from "../IconButtonWrapper/IconButtonWrapper";

import { AddIcon } from "@/icons";
import { IDataTableIconButton } from "@/types/datatables";

const DataTableAddActionButtonIcon = ({ onClick, testId, toolTipLabel }: IDataTableIconButton) => {
  return (
    <IconButtonWrapper testId={testId} tooltip={toolTipLabel} onClick={onClick}>
      <AddIcon testId={`${testId}-icon`} />
    </IconButtonWrapper>
  );
};

export default memo(DataTableAddActionButtonIcon);
