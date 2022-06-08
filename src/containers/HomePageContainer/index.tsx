import React, { memo } from "react";

import styled from "@emotion/styled";
import { Box, Stack } from "@mui/material";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

import { Base, Button, HelpButton, LoaderSpinner, PageTitle, Typography } from "@/components";
import content from "@/content";
import routing from "@/routing";
import { CenteredContent } from "@/styles";
import { TopRight } from "@/styles/global-style";

const ButtonMargin = styled(Button)`
  margin: 4px;
`;

const WelcomeBackText = styled(Typography)`
  text-align: center;
  font-weight: 700;
  font-size: 1rem;
`;

const HomePageContainer = () => {
  const router = useRouter();

  const { data: session, status } = useSession();

  const loading = status === "loading";

  return (
    <Base topLeftComponent="none">
      <TopRight>
        <HelpButton />
      </TopRight>
      <CenteredContent>
        <LoaderSpinner isLoading={loading}>
          <PageTitle title={content.pages.homePage.title} testId="homepage-title" variant="h2" />
          <Box sx={{ display: "grid", p: 1 }}>
            <Stack spacing={1}>
              {session ? (
                <>
                  <WelcomeBackText testId="homepage-user-welcome-text" variant="body1">
                    {content.pages.homePage.dashboard.welcomeBack.text.replace("userName", session.user?.name || "")}
                  </WelcomeBackText>
                  <ButtonMargin
                    onClick={() => router.push(routing.dashboard)}
                    size="large"
                    testId="homepage-routing-dashboard-button"
                    variant="contained"
                  >
                    {content.pages.homePage.dashboard.button}
                  </ButtonMargin>
                </>
              ) : (
                <ButtonMargin
                  onClick={() => router.push(routing.auth.signIn)}
                  size="large"
                  testId="homepage-routing-sign-in-button"
                  variant="contained"
                >
                  {content.pages.homePage.signIn.button}
                </ButtonMargin>
              )}

              <ButtonMargin
                onClick={() => router.push(routing.playground)}
                size="large"
                testId="homepage-routing-playground-button"
                variant="outlined"
              >
                {content.pages.homePage.playground.button}
              </ButtonMargin>
            </Stack>
          </Box>
        </LoaderSpinner>
      </CenteredContent>
    </Base>
  );
};

export default memo(HomePageContainer);
