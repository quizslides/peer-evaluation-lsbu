import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import React from "react";

import { ApolloProvider } from "@apollo/client";
import { LocalizationProvider } from "@mui/lab";
import DateAdapter from "@mui/lab/AdapterDateFns";
import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "react-hot-toast";

import { Layout } from "@/containers";
import AuthenticatedRoute from "@/containers/Auth";
import client from "@/graphql/client";
import { theme } from "@/styles";

const App = ({ Component, pageProps: { session, ...pageProps } }: AppProps) => {
  const router = useRouter();

  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <LocalizationProvider dateAdapter={DateAdapter}>
          <SessionProvider session={session} refetchOnWindowFocus={false}>
            <Layout>
              {pageProps.protected ? (
                <AuthenticatedRoute roles={pageProps.roles}>
                  <Component {...pageProps} key={router.asPath} session={session} />
                </AuthenticatedRoute>
              ) : (
                <Component {...pageProps} key={router.asPath} />
              )}
            </Layout>
          </SessionProvider>
        </LocalizationProvider>
      </ThemeProvider>
      <Toaster />
    </ApolloProvider>
  );
};

export default App;
