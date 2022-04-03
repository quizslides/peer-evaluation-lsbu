# node:16.13.2-alpine
FROM node:alpine@sha256:f21f35732964a96306a84a8c4b5a829f6d3a0c5163237ff4b6b8b34f8d70064b

LABEL maintainer="juancarlosjr97@gmail.com" \
    description="This is a build container image to deploy Next.js web app using SSR"

ENV NEXT_TELEMETRY_DISABLED 1
ENV PORT 3000

ARG ENVIRONMENT \
    LOGICAL_ENVIRONMENT \
    NEXTAUTH_SECRET \
    NEXTAUTH_URL \
    SENTRY_DSN \
    NEXT_PUBLIC_SENTRY_DSN \
    SENTRY_AUTH_TOKEN \
    SMTP_HOST \
    SMTP_PORT \
    SMTP_USER \
    SMTP_PASSWORD \
    SMTP_FROM \
    SMTP_SECURE \
    DATABASE_URL 

ENV ENVIRONMENT=${ENVIRONMENT} \
    LOGICAL_ENVIRONMENT=${LOGICAL_ENVIRONMENT} \
    NEXTAUTH_SECRET=${NEXTAUTH_SECRET} \
    NEXTAUTH_URL=${NEXTAUTH_URL} \
    SENTRY_DSN=${SENTRY_DSN} \
    NEXT_PUBLIC_SENTRY_DSN=${NEXT_PUBLIC_SENTRY_DSN} \
    SENTRY_AUTH_TOKEN=${SENTRY_AUTH_TOKEN} \
    SMTP_HOST=${SMTP_HOST} \
    SMTP_PORT=${SMTP_PORT} \
    SMTP_USER=${SMTP_USER} \
    SMTP_PASSWORD=${SMTP_PASSWORD} \
    SMTP_FROM=${SMTP_FROM} \
    SMTP_SECURE=${SMTP_SECURE} \
    DATABASE_URL=${DATABASE_URL}

WORKDIR /app

COPY . ./

RUN yarn config set network-timeout 300000

RUN yarn install --frozen-lockfile \
    && yarn build:next \
    && rm -rf node_modules \
    && yarn install --production --prefer-offline \
    && yarn cache clean --all

RUN chmod +x scripts/start.sh

EXPOSE 3000

CMD scripts/start.sh
