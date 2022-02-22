import React from "react";

import styled from "@emotion/styled";
import { Stack } from "@mui/material";
import { useRouter } from "next/router";

import { Base, Button, Typography } from "@/components";
import content from "@/content";
import { SadFaceEmoji } from "@/icons";
import routing from "@/routing";
import { CenteredContent } from "@/styles";

const UnauthorizedMessage = styled(Typography)`
  text-align: center;
  font-weight: 700;
  font-size: 1rem;
  max-width: 200px;
`;

const UnauthorizedContainer = () => {
  const router = useRouter();

  return (
    <>
      <Base topLeftComponent="menu">
        <CenteredContent>
          <Stack direction="column" justifyContent="center" alignItems="center" spacing={2}>
            <SadFaceEmoji height="5rem" width="5rem" testId={"unauthorized-page-emoji"} />
            <UnauthorizedMessage testId={"unauthorized-text"}>{content.pages.unauthorized.text}</UnauthorizedMessage>
            <Button
              size="large"
              testId="unauthorized-button"
              variant="contained"
              onClick={() => router.push(routing.dashboard)}
            >
              {content.pages.unauthorized.button}
            </Button>
          </Stack>
        </CenteredContent>
      </Base>
    </>
  );
};

export default UnauthorizedContainer;
