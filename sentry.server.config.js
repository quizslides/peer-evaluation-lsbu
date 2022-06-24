import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NEXT_PUBLIC_LOGICAL_ENVIRONMENT,
  tracesSampleRate: 1.0,
});
