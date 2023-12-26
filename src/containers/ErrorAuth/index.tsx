import React, { memo, useEffect } from "react";

import styled from "@emotion/styled";
import { Stack } from "@mui/material";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

import Button from "@/components/Button/Button";
import Typography from "@/components/Typography/Typography";
import LoadingContainer from "@/containers/LoadingContainer";
import content from "@/content";
import { SadFaceEmoji } from "@/icons";
import routing from "@/routing";
import { CenteredContent } from "@/styles";

const ErrorMessage = styled(Typography)`
  text-align: center;
  font-weight: 700;
  font-size: 1rem;
  max-width: 200px;
`;

const ErrorAuth = () => {
  const router = useRouter();

  const { data: session, status } = useSession();

  const onErrorRouting = () => router.push(content.containers.errorAuth.href);

  const loading = status === "loading" || !!session;

  useEffect(() => {
    if (session) {
      router.push(routing.home);
    }
  }, [router, session]);

  if (loading) {
    return <LoadingContainer loading={loading} centeredAbsolute />;
  }

  return (
    <CenteredContent>
      <Stack direction="column" justifyContent="center" alignItems="center" spacing={2}>
        <SadFaceEmoji height="5rem" width="5rem" testId={"404-error-container-emoji"} />
        <ErrorMessage testId={"404-error-container-text"}>{content.containers.errorAuth.text}</ErrorMessage>
        <Button size="large" testId="404-error-container-button" variant="contained" onClick={onErrorRouting}>
          {content.containers.errorAuth.button}
        </Button>
      </Stack>
    </CenteredContent>
  );
};

export default memo(ErrorAuth);
