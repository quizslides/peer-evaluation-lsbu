import { memo } from "react";

import styled from "@emotion/styled";

import Typography from "../Typography/Typography";

const Message = styled(Typography)`
  text-align: center;
  font-weight: 700;
  font-size: 1rem;
  max-width: 200px;
`;

export default memo(Message);
