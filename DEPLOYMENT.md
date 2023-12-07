# Deployment

The project follows CI/CD by releasing automatically and without human intervention to the live environments.

## Docker

The project is build using Docker in the live environments:

### Pipeline Variables

| VARIABLE                               | DESCRIPTION                                             | SCOPE                 |
| -------------------------------------- | ------------------------------------------------------- | --------------------- |
| `DIGITALOCEAN_ACCESS_TOKEN`            | Access token to access the Digital Ocean Project        | Read and write access |
| `DIGITALOCEAN_APP_PLATFORM_ID_MAIN`    | ID of the App Platform for the `production` environment | N/A                   |
| `DIGITALOCEAN_APP_PLATFORM_ID_STAGING` | ID of the App Platform for the `staging` environment    | N/A                   |

### Environmental Variables

TK

| VARIABLES                         | DESCRIPTION                                                                 | DEFAULT VALUE | ACCEPTED VALUES |
| --------------------------------- | --------------------------------------------------------------------------- | ------------- | --------------- |
| `DATABASE_URL_PRISMA`             |                                                                             |               |                 |
| `DATABASE_URL`                    |                                                                             |               |                 |
| `ENVIRONMENT`                     |                                                                             |               |                 |
| `NEXTAUTH_SECRET`                 | Used to encrypt the NextAuth.js JWT, and to hash email verification tokens. |               |                 |
| `NEXTAUTH_URL`                    |                                                                             |               |                 |
| `NEXT_PUBLIC_LOGICAL_ENVIRONMENT` |                                                                             |               |                 |
| `NEXT_PUBLIC_SENTRY_DSN`          |                                                                             |               |                 |
| `NEXT_PUBLIC_URL`                 |                                                                             |               |                 |
| `SENTRY_AUTH_TOKEN`               |                                                                             |               |                 |
| `SENTRY_DSN`                      |                                                                             |               |                 |
| `SENTRY_SECURITY_HEADER_ENDPOINT` |                                                                             |               |                 |
| `SMTP_FROM`                       |                                                                             |               |                 |
| `SMTP_HOST`                       |                                                                             |               |                 |
| `SMTP_PASSWORD`                   |                                                                             |               |                 |
| `SMTP_PORT`                       |                                                                             |               |                 |
| `SMTP_SECURE`                     |                                                                             |               |                 |
| `SMTP_USER`                       |                                                                             |               |                 |

### Build the production image

The build requires to pass all the environmental variables to the build

```bash
docker build -t pel-app . --env-file .env
```

### Run the production

```bash
docker run -p 3000:3000 pel-app
```
