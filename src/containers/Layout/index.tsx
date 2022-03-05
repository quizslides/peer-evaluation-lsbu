import React, { memo } from "react";

import Head from "next/head";

import { Body, Footer, FooterText, Main } from "@/components/Base/Base.styles";
import Link from "@/components/Link/Link";
import content from "@/content";
import { ComponentChildren } from "@/types";

const Layout = ({ children }: ComponentChildren) => {
  return (
    <>
      <Head>
        <title>{content.components.base.head.siteTitle}</title>
        <meta name="description" content={content.components.base.head.description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Body data-testid="base-body">
        <Main data-testid="base-main">{children}</Main>
        <Footer data-testid="base-footer">
          <Link
            testId="base-footer-link"
            color="inherit"
            underline="none"
            href={content.components.base.footer.href}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FooterText testId="base-footer-link-text">
              Copyright &copy; {content.components.base.footer.text} - {new Date().getFullYear()}
            </FooterText>
          </Link>
        </Footer>
      </Body>
    </>
  );
};

export default memo(Layout);
