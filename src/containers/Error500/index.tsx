import React, { memo } from "react";

import styled from "@emotion/styled";
import { Stack } from "@mui/material";
import { useRouter } from "next/router";

import Button from "@/components/Button/Button";
import Typography from "@/components/Typography/Typography";
import content from "@/content";
import { SadFaceEmoji } from "@/icons";
import { CenteredContent } from "@/styles";

const ErrorMessage = styled(Typography)`
  text-align: center;
  font-weight: 700;
  font-size: 1rem;
  max-width: 200px;
`;

const Error500 = () => {
  const router = useRouter();

  const onErrorRouting = () => router.push(content.containers[500].href);

  return (
    <CenteredContent>
      <Stack direction="column" justifyContent="center" alignItems="center" spacing={2}>
        <SadFaceEmoji height="5rem" width="5rem" testId={"500-error-container-emoji"} />
        <ErrorMessage testId={"500-error-container-text"}>{content.containers[500].text}</ErrorMessage>
        <Button size="large" testId="500-error-container-button" variant="contained" onClick={onErrorRouting}>
          {content.containers[500].button}
        </Button>
      </Stack>
    </CenteredContent>
  );
};

export default memo(Error500);
