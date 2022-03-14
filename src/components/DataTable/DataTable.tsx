import React, { memo } from "react";

import styled from "@emotion/styled";
import MUIDataTable, { MUIDataTableColumnDef, MUIDataTableOptions } from "mui-datatables";

interface IDataTable {
  isVisible: boolean;
  title: string;
  data: Array<object | number[] | string[]>;
  columns: MUIDataTableColumnDef[];
  options: MUIDataTableOptions | undefined;
  testId: string;
}

export const Wrapper = styled.div``;

const DataTable = ({ data, title, columns, options, isVisible, testId }: IDataTable) => {
  return (
    <Wrapper data-testid={testId}>
      {isVisible ? <MUIDataTable title={title} data={data} columns={columns} options={options} /> : null}
    </Wrapper>
  );
};

export default memo(DataTable);
