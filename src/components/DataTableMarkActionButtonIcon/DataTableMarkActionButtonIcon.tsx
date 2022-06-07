import React, { memo } from "react";

import IconButtonWrapper from "../IconButtonWrapper/IconButtonWrapper";

import { GradingIcon } from "@/icons";
import { IDataTableIconButton } from "@/types/datatables";

const DataTableMarkActionButtonIcon = ({ onClick, testId, toolTipLabel }: IDataTableIconButton) => {
  return (
    <IconButtonWrapper testId={testId} tooltip={toolTipLabel} onClick={onClick}>
      <GradingIcon testId={`${testId}-icon`} />
    </IconButtonWrapper>
  );
};

export default memo(DataTableMarkActionButtonIcon);
