import React, { memo } from "react";

import IconButtonWrapper from "../IconButtonWrapper/IconButtonWrapper";

import { EditIcon } from "@/icons";
import { IDataTableIconButton } from "@/types/datatables";

const DataTableEditActionButtonIcon = ({ onClick, testId, toolTipLabel }: IDataTableIconButton) => {
  return (
    <IconButtonWrapper testId={testId} tooltip={toolTipLabel} onClick={onClick}>
      <EditIcon testId={`${testId}-icon`} />
    </IconButtonWrapper>
  );
};

export default memo(DataTableEditActionButtonIcon);
