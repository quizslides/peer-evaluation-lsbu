import React, { memo } from "react";

import styled from "@emotion/styled";
import { FixedSizeList } from "react-window";

import RenderRow from "@/components/RenderRow/RenderRow";

interface IVirtualStringList {
  testId: string;
  data: string[];
  height: number | string;
  maxWidth: number | string;
  itemSize: number;
}

interface WrapperProps {
  maxWidth: string | number;
}

const Wrapper = styled.div<WrapperProps>`
  padding: 1rem;
  border: 2px solid grey;
  border-radius: 20px;
  max-width: ${(props) => props.maxWidth};
`;

const VirtualStringList = ({ testId, data, height, maxWidth, itemSize }: IVirtualStringList) => (
  <Wrapper data-testid={testId} maxWidth={maxWidth}>
    <FixedSizeList height={height} width="100%" itemSize={itemSize} itemCount={data.length} itemData={data}>
      {RenderRow}
    </FixedSizeList>
  </Wrapper>
);

export default memo(VirtualStringList);
