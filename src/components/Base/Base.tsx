import React from "react";

import Head from "next/head";

import BackArrowButton from "@/components/BackArrowButton/BackArrowButton";
import { Body, Footer, FooterText, Main } from "@/components/Base/Base.styles";
import Link from "@/components/Link/Link";
import Typography from "@/components/Typography/Typography";
import ErrorContainer from "@/containers/ErrorContainer";
import LoadingContainer from "@/containers/LoadingContainer";
import Navigation from "@/containers/Navigation";
import content from "@/content";
import { TopLeft } from "@/styles/global-style";
import { ComponentChildren } from "@/types";

type TTopLeftComponent = "menu" | "backArrow" | "none";

interface IBase extends ComponentChildren {
  topLeftComponent: TTopLeftComponent;
  loading?: boolean;
  error?: boolean;
}

const TopLeftComponent: React.FC<{ topLeftComponent: TTopLeftComponent }> = ({ topLeftComponent }) => {
  switch (topLeftComponent) {
    case "menu":
      return <Navigation />;
    case "backArrow":
      return (
        <TopLeft>
          <BackArrowButton />
        </TopLeft>
      );
    default:
      return <></>;
  }
};

const Base = ({ children, topLeftComponent, loading, error }: IBase) => {
  return (
    <>
      <Head>
        <title>{content.components.base.head.siteTitle}</title>
        <meta name="description" content={content.components.base.head.description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Body data-testid="base-body">
        <Main data-testid="base-main">
          {error ? (
            <>
              <TopLeftComponent topLeftComponent={topLeftComponent} />
              <ErrorContainer />
            </>
          ) : loading ? (
            <LoadingContainer loading={loading} />
          ) : (
            <>
              <TopLeftComponent topLeftComponent={topLeftComponent} />
              {children}
            </>
          )}
        </Main>
        <Footer data-testid="base-footer">
          <Link
            testId="base-footer-link"
            color="inherit"
            underline="none"
            href={content.components.base.footer.href}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FooterText>
              <Typography testId="base-footer-link-text">
                Copyright &copy; {content.components.base.footer.text} - {new Date().getFullYear()}
              </Typography>
            </FooterText>
          </Link>
        </Footer>
      </Body>
    </>
  );
};

export default Base;
