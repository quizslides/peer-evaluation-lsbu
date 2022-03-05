import React from "react";

import "react-tiny-fab/dist/styles.css";

import { IconButtonWrapper } from "@/components";
import { RefreshIcon } from "@/icons";

interface ITableCustomToolbar {
  onClick: () => void;
}

const TableCustomToolbar = ({ onClick }: ITableCustomToolbar) => {
  return (
    <IconButtonWrapper testId="refresh-9users-table" tooltip={"Refresh"} onClick={onClick}>
      <RefreshIcon testId={"refresh-users-table-icon"} />
    </IconButtonWrapper>
  );
};

const tableCustomToolbar = ({ onClick }: ITableCustomToolbar) => <TableCustomToolbar onClick={onClick} />;

export default tableCustomToolbar;
