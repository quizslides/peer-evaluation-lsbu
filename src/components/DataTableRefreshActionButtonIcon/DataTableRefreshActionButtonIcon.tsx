import React, { memo } from "react";

import IconButtonWrapper from "../IconButtonWrapper/IconButtonWrapper";

import { RefreshIcon } from "@/icons";
import { IDataTableIconButton } from "@/types/datatables";

const DataTableRefreshActionButtonIcon = ({ onClick, testId, toolTipLabel }: IDataTableIconButton) => {
  return (
    <IconButtonWrapper testId={testId} tooltip={toolTipLabel} onClick={onClick}>
      <RefreshIcon testId={`${testId}-data-table-refresh-action-button-icon`} />
    </IconButtonWrapper>
  );
};

export default memo(DataTableRefreshActionButtonIcon);
