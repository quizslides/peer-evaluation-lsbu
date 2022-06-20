import React, { memo } from "react";

import styled from "@emotion/styled";

import { DataTableDeleteActionButtonIcon, DataTableEditActionButtonIcon } from "@/components";
import { IDataTableIconButton } from "@/types/datatables";

interface IDataTableEditActionButtonIcon {
  visibleEditButton?: boolean;
  visibleDeleteButton?: boolean;
  editButton?: IDataTableIconButton;
  deleteButton?: IDataTableIconButton;
}

const Container = styled.div`
  margin-right: 1em;
`;

const DataTableEditDeleteToolbar = ({
  editButton,
  deleteButton,
  visibleEditButton = true,
  visibleDeleteButton = true,
}: IDataTableEditActionButtonIcon) => {
  return (
    <Container>
      {visibleEditButton && editButton && (
        <DataTableEditActionButtonIcon
          testId={editButton.testId}
          toolTipLabel={editButton.toolTipLabel}
          onClick={editButton.onClick}
        />
      )}

      {visibleDeleteButton && deleteButton && (
        <DataTableDeleteActionButtonIcon
          testId={deleteButton.testId}
          toolTipLabel={deleteButton.toolTipLabel}
          onClick={deleteButton.onClick}
        />
      )}
    </Container>
  );
};

export default memo(DataTableEditDeleteToolbar);
