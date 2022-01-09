# Peer Evaluation LSBU

These are the instructions to run a full-stack framework using Next.js.

The frontend, by default, will listen through the port `3000` to avoid conflicts with any other system the developer might have running in their local environments.

## Prerequisites

We need to have installed the following services:

- [GIT](https://git-scm.com/)
- [nvm](https://github.com/nvm-sh/nvm)

and a Unix based computer, such Mac or Ubuntu.

## Installation

We need to clone the frontend repository in our local environment:

- `git clone git@github.com:quizslides/peer-evaluation-lsbu.git`

Install node

```bash
nvm use
```

Install the node dependencies by running:

```bash
yarn install
```

## Running Locally

1. Copy the env variables to run locally

```bash
cp .env.local .env
```

2. Run server

```bash
yarn dev
```

This will run the web app in your local machine, listening through the port `3000`.

## Accessing

Now you can access your local environment through `http://localhost:3000/`
