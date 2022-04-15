import React, { memo } from "react";

import IconButtonWrapper from "../IconButtonWrapper/IconButtonWrapper";

import { DeleteIcon } from "@/icons";
import { IDataTableIconButton } from "@/types/datatables";

const DataTableDeleteActionButtonIcon = ({ onClick, testId, toolTipLabel }: IDataTableIconButton) => {
  return (
    <IconButtonWrapper testId={testId} tooltip={toolTipLabel} onClick={onClick}>
      <DeleteIcon testId={`${testId}-icon`} />
    </IconButtonWrapper>
  );
};

export default memo(DataTableDeleteActionButtonIcon);
