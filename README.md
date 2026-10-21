# Monorepo

## Overview

This repository is a template for creating a TypeScript monorepo with a focus on development efficiency through linters, testing, and continuous integration setup. It is designed to work seamlessly with tools like mise, pnpm, Turbo, and Vitest.

## Key Features

- **[mise](https://mise.jdx.dev/)**: Manages the pinned Node.js version defined in `mise.toml`.
- **[pnpm](https://github.com/pnpm/pnpm)**: Significantly faster and more disk-space efficient than npm. Plus it has first-class monorepo support, making it ideal for managing multiple packages within a single repository.
- **[Turbo](https://turborepo.com/docs)**: A tool for speeding up builds and task runs in monorepos. Turbo helps run scripts like linting, testing, and type checking across multiple packages in parallel, leveraging caching for faster repeats.
- **[Vitest](https://vitest.dev/guide/)**: Obvious choice for (unit) testing in a TypeScript environment.
- **[Typescript ESLint](https://typescript-eslint.io/getting-started) with [Prettier](https://prettier.io/docs/)**: Ensures strict rules and consistent code style across the entire codebase.
- **[Next.js](https://nextjs.org/)**: The starter web app lives in `apps/web` and uses the App Router.
- **[shadcn/ui](https://ui.shadcn.com/)**: Reusable UI components live in the shared `packages/ui` workspace package.
- **[Better Auth](https://www.better-auth.com/)**: Email and password authentication, with a sign-in page at `/login`.
- **[Drizzle ORM](https://orm.drizzle.team/) and PostgreSQL**: Typed database access and migrations, with PostgreSQL available locally through Docker Compose.

## Setup and Usage

### Initialization

To initialize this monorepo template for your project, first [install mise](https://mise.jdx.dev/getting-started.html), then run the provided setup script:

```sh
./init.sh
```

The script will:

1. Prompt you to enter a new package scope name (e.g., if you enter "mycompany", the scope becomes "@mycompany")
2. Replace all occurrences of `@la` with your new scope throughout the repository (in JSON, TypeScript, JavaScript, Markdown, and YAML files)
3. Install dependencies using pnpm
4. Update package.json files using [sherif](https://github.com/QuiiBz/sherif)
5. Initialize a new git repository

**Note**: You can run this script from any directory; it will automatically work on the repository it's located in.

### Installation

After cloning the repository, install dependencies with:

```sh
pnpm install
```

Or use the `./init.sh` script to initialize and install in one command. Once mise is [activated in your shell](https://mise.jdx.dev/getting-started.html#activate-mise), `pnpm` uses the version defined in `mise.toml`.

### Local development

The web app uses PostgreSQL for Better Auth and Drizzle. Docker Compose starts a local database named `la` with the `la` user and password. These defaults are for local development only. Start the database and configure the app before running it:

1. Copy the example environment file:

   ```sh
   cp apps/web/.env.example apps/web/.env.local
   ```

2. Set the local database URL and generate a Better Auth secret in `apps/web/.env.local`:

   ```env
   DATABASE_URL=postgres://la:la@localhost:5432/la
   BETTER_AUTH_SECRET=<your-secret>
   BETTER_AUTH_URL=http://localhost:3000
   ```

   Generate a secret with `openssl rand -base64 32`.

3. Start PostgreSQL and apply the existing migrations:

   ```sh
   docker compose up -d postgres
   DATABASE_URL=postgres://la:la@localhost:5432/la pnpm --dir apps/web db:migrate
   ```

   Drizzle Kit reads `DATABASE_URL` from the environment. If you use a different host port, use that port in the URL as well.

4. Start the app from the repository root and open <http://localhost:3000>:

   ```sh
   pnpm dev
   ```

Docker Compose publishes PostgreSQL on port `5432` by default. To use a different host port, set `POSTGRES_PORT` in a root `.env` file, for example:

```env
POSTGRES_PORT=5433
```

The container still listens on port `5432`; only the host port changes. Update `DATABASE_URL` to use the configured host port.

### Database workflow

Drizzle schema definitions are in `apps/web/src/server/db/schema/`, and generated migrations are in `apps/web/migrations/`. When changing the schema, generate a migration and then apply it:

```sh
DATABASE_URL=postgres://la:la@localhost:5432/la pnpm --dir apps/web db:generate
DATABASE_URL=postgres://la:la@localhost:5432/la pnpm --dir apps/web db:migrate
```

The web package also provides `db:push` for pushing schema changes directly and `db:studio` for opening Drizzle Studio. Prefix these commands with `DATABASE_URL=...` or export `DATABASE_URL` in your shell before running them.

### Scripts

`dev`: Starts development servers for workspace packages that define a `dev` script.

`format`: Formats the codebase using Prettier.

`lint`: Runs ESLint to check for code style and quality issues throughout the monorepo.

`lint:fix`: Automatically fixes linting issues where possible.

`test`: Runs the test suite using Vitest.

`typecheck`: Checks for TypeScript typing issues across the codebase.

The Next.js app can also be started on its own with `pnpm --dir apps/web dev`. Database commands are documented in the [Database workflow](#database-workflow) section above.

### Generating packages

Use the custom Turbo generator to create a package under `packages/`:

```sh
pnpm turbo gen package
```

Choose one of the package patterns already used in this repository:

- **Internal library**: consumers import TypeScript source; builds declarations only.
- **Compiled library**: builds JavaScript and declarations.
- **Node.js application**: builds runnable JavaScript and includes a `start` script.
- **No-build package**: only typechecks against the base tsconfig; for scripts or code bundled elsewhere. It has no build/dev scripts or build tsconfig.

Each generated package includes a `package.json`, ESLint and Vitest configs, the base TypeScript config, and `src/index.ts`. The three buildable types also include `tsconfig.build.json`. Package names are scoped using the scope from the root package manifest.

Read more about the tsconfig setup in the [Tsconfig README](./configs/typescript/README.md).

Run `pnpm install` after generation so pnpm links the new workspace and updates the lockfile.

### Continuous Integration

The monorepo is designed to easily integrate with CI/CD systems. The provided GitHub Actions workflow (`.github/workflows/ci.yml`) runs linting, testing, and type checking on every push and pull request. It uses turbo remote caching to speed up the process.
