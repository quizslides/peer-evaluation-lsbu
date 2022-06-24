import React, { memo } from "react";

import styled from "@emotion/styled";
import { useSession } from "next-auth/react";

import { Base, LoaderSpinner, PageTitle } from "@/components";
import content from "@/content";
import { CenteredContent } from "@/styles";

const TitleContainer = styled.div`
  margin: 10px;
`;

const HomePageContainer = () => {
  const { status } = useSession();

  const loading = status === "loading";

  return (
    <Base topLeftComponent="menu">
      <CenteredContent>
        <LoaderSpinner isLoading={loading}>
          <TitleContainer>
            <PageTitle
              title={content.pages.homePage.title}
              testId="homepage-title"
              variant="h2"
              fontColor="white"
              textAlignment="left"
            />
            <PageTitle
              title={content.pages.homePage.subTitleTop}
              testId="homepage-subtitle-top"
              variant="h3"
              fontColor="white"
              textAlignment="left"
              fontWeight={200}
            />
            <PageTitle
              title={content.pages.homePage.subTitleBottom}
              testId="homepage-subtitle-bottom"
              variant="h3"
              fontColor="white"
              textAlignment="left"
              fontWeight={200}
            />
          </TitleContainer>
        </LoaderSpinner>
      </CenteredContent>
    </Base>
  );
};

export default memo(HomePageContainer);
