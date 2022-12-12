# Peer Evaluation LSBU

[![DeepSource](https://deepsource.io/gh/quizslides/peer-evaluation-lsbu.svg/?label=active+issues&show_trend=true&token=JvSkE95Y9D_dTOxQj7ZPROAE)](https://deepsource.io/gh/quizslides/peer-evaluation-lsbu/?ref=repository-badge) [![DeepSource](https://deepsource.io/gh/quizslides/peer-evaluation-lsbu.svg/?label=resolved+issues&show_trend=true&token=JvSkE95Y9D_dTOxQj7ZPROAE)](https://deepsource.io/gh/quizslides/peer-evaluation-lsbu/?ref=repository-badge) [![Test](https://github.com/quizslides/peer-evaluation-lsbu/actions/workflows/test.yml/badge.svg?branch=main)](https://github.com/quizslides/peer-evaluation-lsbu/actions/workflows/test.yml)

These are the instructions to run a full-stack framework using Next.js.

The frontend, by default, will listen through the port `3000` to avoid conflicts with any other system the developer might have running in their local environments.

## Prerequisites

We need to have installed the following services:

- [GIT](https://git-scm.com/)
- [nvm](https://github.com/nvm-sh/nvm)

and a Unix based computer, such Mac or Ubuntu.

## Installation

We need to clone the repository in our local environment:

- `git clone git@github.com:quizslides/peer-evaluation-lsbu.git`

Install node

```bash
nvm use
```

Install the node dependencies by running:

```bash
yarn install
```

## Next Auth Credentials

NextAuth requires a secret key that is part of the `.env` and `.env.development.local` as `NEXTAUTH_SECRET`.

To create a new key run

```bash
openssl rand -base64 32
```

## Running Locally

1. Copy the env variables to run locally

   ```bash
   cp .env.sample .env.development.local &&  cp .env.sample .env
   ```

2. Run server

   ```bash
   yarn dev
   ```

This will run the web app in your local machine, listening through the port `3000`.

## Accessing

Now you can access your local environment through `http://localhost:3000/`

## Sentry

Request the key for sentry for local development to be added to the `.env` as `SENTRY_DSN` never commit to the repository

## Database

In development, the database requires a database connection.

### Start database container

Start the database:

```bash
docker-compose up
```

### Stop database container

Stop the database:

```bash
docker-compose stop
```

### Destroy database container

Destroying the database:

```bash
docker-compose down
```

### Start Database

In development environmen follow these steps:

1. Generate the database client:

   ```bash
   npx prisma generate
   ```

2. Run all the migrations and seed database run:

   ```bash
   npx prisma migrate dev
   ```

### Restore Database from SQL Dump

To restore a database dump to a running container run:

```bash
./scripts/restore-database.sh /path/to/sql_dump/${SQL_DUMP}.sql
```

### Backup Database to SQL

To create a database back from a running container run:

```bash
./scripts/backup-database.sh
```

### Seed Database Manually

The file `./prisma/seed.ts` contains with data that is required for the application to start:

```bash
npx prisma db seed
```

Database seeding happens in two ways with Prisma: manually with `prisma db seed` and automatically in `prisma migrate dev` and `prisma migrate reset`.

### Apply Migrations

In development environment, to apply migrations:

```bash
npx prisma migrate dev
```

### Create Migrations

In a development environment, use the migrate dev command to generate and apply migrations:

```bash
npx prisma migrate dev --name ${migration_name}
```

This generates a migration file in the migration folder and this folder is the source of truth for the history of the data model.

The `--create-only` command allows you to create a migration without applying it:

```bash
npx prisma migrate dev --create-only
```

### Schema Prototyping

In development for schema prototyping

```bash
npx prisma db push
```

`npx prisma db push` uses the same engine as Prisma Migrate to synchronize your Prisma schema with the database schema, and is best suited for schema prototyping. The db push command:

1. Introspects the database to infer and executes the changes required to make your database schema reflect the state of your Prisma schema.

2. By default, after changes have been applied to the database schema, generators are triggered (for example, Prisma Client). You do not need to manually invoke prisma generate.

3. If db push anticipates that the changes could result in data loss, it will throw an error and the require the flag `--accept-data-loss` option if you still want to make the changes

At the end of prototyping, run the `npx prisma migrate dev --name ${migration_name}`

### Reset Database

**Migrate reset is a development command and should never be used in a production environment.**

1. Drops the database if possible, or performs a soft reset if the environment does not allow deleting databases
2. Creates a new database with the same name if the database was dropped
3. Applies all migrations
4. Runs seed scripts

```bash
npx prisma migrate reset
```

#### Deploy changes to production/staging

In production/staging environments apply pending migrations to the database by running:

```bash
npx prisma migrate deploy
```

This command can be executed in any environment to replicate database production like state

#### Database Status check

In production/staging environments to check the status of the database by running:

```bash
npx prisma migrate status
```

## Troubleshooting

### Failed to run script / Error in Prisma Client request

Caching issues may cause Prisma Studio to use an older version of the query engine. You may see the following error:

Error in request: PrismaClientKnownRequestError: Failed to validate the query Error occurred during query validation & transformation
To resolve, delete the following folders: `~/.cache/prisma` on macOS and Linux and `%AppData%/Prisma/Studio` on Windows

## Deployment

Visit the [DEPLOYMENT](./DEPLOYMENT.md) to read the deployment instructions

## Changelog

Visit the [CHANGELOG](./CHANGELOG.md) to see all the changes.
