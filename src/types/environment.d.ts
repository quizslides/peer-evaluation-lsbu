namespace NodeJS {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface ProcessEnv extends NodeJS.ProcessEnv {
    DATABASE_URL_PRISMA: string;
    DATABASE_URL: string;
    ENVIRONMENT: string;
    NEXT_PUBLIC_LOGICAL_ENVIRONMENT: string;
    NEXT_PUBLIC_SENTRY_DSN: string;
    NEXT_PUBLIC_URL: string;
    NEXTAUTH_SECRET: string;
    NEXTAUTH_URL: string;
    SENTRY_DSN: string;
    SMTP_FROM: string;
    SMTP_HOST: string;
    SMTP_PASSWORD: string;
    SMTP_PORT: string;
    SMTP_SECURE: string;
    SMTP_USER: string;
  }
}
