import React, { memo } from "react";

import styled from "@emotion/styled";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { FixedSizeList, ListChildComponentProps } from "react-window";

const RenderRow = (props: ListChildComponentProps) => {
  const { index, style, data } = props;

  return (
    <ListItem data-testid={`virtual-string-list-${index}`} style={style} key={index} component="div" disablePadding>
      <ListItemText primary={data[index]} />
    </ListItem>
  );
};

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
  max-width: ${(props) => `${props.maxWidth}`};
`;

const VirtualStringList = ({ testId, data, height, maxWidth, itemSize }: IVirtualStringList) => (
  <Wrapper data-testid={testId} maxWidth={maxWidth}>
    <FixedSizeList height={height} width={"100%"} itemSize={itemSize} itemCount={data.length} itemData={data}>
      {RenderRow}
    </FixedSizeList>
  </Wrapper>
);

export default memo(VirtualStringList);
