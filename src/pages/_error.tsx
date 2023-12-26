import React, { useEffect } from "react";

import { NextPage, NextPageContext } from "next";

import * as Sentry from "@sentry/nextjs";
import NextErrorComponent, { ErrorProps } from "next/error";

import { dismissNotification } from "@/utils";

interface AppErrorProps extends ErrorProps {
  err?: Error;
  hasGetInitialPropsRun?: boolean;
}

const AppError: NextPage<AppErrorProps> = ({ hasGetInitialPropsRun, err, statusCode }) => {
  useEffect(() => {
    dismissNotification();
  });

  if (!hasGetInitialPropsRun && err) {
    Sentry.captureException(err);
  }

  return <NextErrorComponent statusCode={statusCode} />;
};

AppError.getInitialProps = async (context: NextPageContext) => {
  const errorInitialProps = await NextErrorComponent.getInitialProps(context);

  const { res, err, asPath } = context;

  if (res?.statusCode === 404) {
    return errorInitialProps;
  }

  if (err) {
    Sentry.captureException(err);
    await Sentry.flush(2000);

    return errorInitialProps;
  }

  Sentry.captureException(new Error(`_error.tsx getInitialProps missing data at path: ${asPath}`));

  await Sentry.flush(2000);

  return errorInitialProps;
};

export default AppError;
