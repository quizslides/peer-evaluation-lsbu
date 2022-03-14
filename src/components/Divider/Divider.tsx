import { memo } from "react";

import styled from "@emotion/styled";
import { Divider as DividerMUI } from "@mui/material";

const Divider = styled(DividerMUI)`
  margin-top: 1em;
  margin-bottom: 2em;
  text-transform: uppercase;
`;

export default memo(Divider);
