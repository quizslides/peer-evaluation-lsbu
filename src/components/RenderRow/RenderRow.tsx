import React, { memo } from "react";

import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { ListChildComponentProps } from "react-window";

const RenderRow = (props: ListChildComponentProps) => {
  const { index, style, data } = props;

  return (
    // skipcq: JS-0394
    <ListItem data-testid={`virtual-string-list-${index}`} style={style} key={index} component="div" disablePadding>
      <ListItemText primary={data[index]} />
    </ListItem>
  );
};

export default memo(RenderRow);
