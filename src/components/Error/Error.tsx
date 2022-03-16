import React, { memo } from "react";

import styled from "@emotion/styled";
import { Stack } from "@mui/material";

import Button from "@/components/Button/Button";
import Typography from "@/components/Typography/Typography";
import content from "@/content";
import { SadFaceEmoji } from "@/icons";

const ErrorMessage = styled(Typography)`
  text-align: center;
  font-weight: 700;
  font-size: 1rem;
  max-width: 200px;
`;

const Error = () => {
  return (
    <Stack direction="column" justifyContent="center" alignItems="center" spacing={2}>
      <SadFaceEmoji height="5rem" width="5rem" testId={"error-container-emoji"} />
      <ErrorMessage testId={"error-container-text"}>{content.containers.errorContainer.text}</ErrorMessage>
      <Button size="large" testId="error-container-button" variant="contained" onClick={() => location.reload()}>
        {content.containers.errorContainer.button}
      </Button>
    </Stack>
  );
};

export default memo(Error);
