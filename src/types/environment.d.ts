namespace NodeJS {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface ProcessEnv extends NodeJS.ProcessEnv {
    ENVIRONMENT: string;
    DATABASE_URL: string;
    NEXTAUTH_SECRET: string;
    NEXTAUTH_URL: string;
    SMTP_HOST: string;
    SMTP_PORT: string;
    SMTP_USER: string;
    SMTP_PASSWORD: string;
    SMTP_FROM: string;
    SMTP_SECURE: string;
    SENTRY_DSN: string;
    NEXT_PUBLIC_SENTRY_DSN: string;
  }
}
