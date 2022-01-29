import "@/styles/globals.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import React from "react";

import { ThemeProvider } from "@mui/material/styles";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";

import theme from "@/styles/theme";

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  <Component {...pageProps} />;

  return (
    <ThemeProvider theme={theme}>
      <SessionProvider session={session}>
        <Component {...pageProps} />
      </SessionProvider>
    </ThemeProvider>
  );
}

export default MyApp;
