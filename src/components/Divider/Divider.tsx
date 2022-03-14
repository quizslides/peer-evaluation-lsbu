import React, { memo } from "react";

import styled from "@emotion/styled";
import { Chip, Divider as DividerMUI } from "@mui/material";

interface IDivider {
  children: string;
}

const DividerLine = styled(DividerMUI)`
  margin-top: 1em;
  margin-bottom: 2em;
  text-transform: uppercase;
`;

const Divider = ({ children }: IDivider) => {
  return (
    <DividerLine>
      <Chip label={children} />
    </DividerLine>
  );
};

export default memo(Divider);
