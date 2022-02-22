import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import React from "react";

import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import { Toaster } from "react-hot-toast";

import { Layout } from "@/containers";
import AuthenticatedRoute from "@/containers/Auth";
import { theme } from "@/styles";

const App = ({ Component, pageProps: { session, ...pageProps } }: AppProps) => {
  <Component {...pageProps} />;

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <SessionProvider session={session}>
          <Layout>
            {pageProps.protected ? (
              <AuthenticatedRoute roles={pageProps.roles}>
                <Component {...pageProps} />
              </AuthenticatedRoute>
            ) : (
              <Component {...pageProps} />
            )}
          </Layout>
        </SessionProvider>
      </ThemeProvider>
      <Toaster />
    </>
  );
};

export default App;
