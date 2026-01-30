# Monorepo

## Overview

This repository is a template for creating a TypeScript monorepo with a focus on development efficiency through linters, testing, and continuous integration setup. It is designed to work seamlessly with tools like pnpm, Turbo, and Vitest.

## Key Features

- **[pnpm](https://github.com/pnpm/pnpm)**: Significantly faster and more disk-space efficient than npm. Plus it has first-class monorepo support, making it ideal for managing multiple packages within a single repository.

- **[Turbo](https://turborepo.com/docs)**: A tool for speeding up builds and task runs in monorepos. Turbo helps run scripts like linting, testing, and type checking across multiple packages in parallel, leveraging caching for faster repeats.

- **[Vitest](https://vitest.dev/guide/)**: Obvious choice for (unit) testing in a TypeScript environment.

- **[Typescript ESLint](https://typescript-eslint.io/getting-started) with [Prettier](https://prettier.io/docs/)**: Ensures strict rules and consistent code style across the entire codebase.

## Setup and Usage

### Initialization

To initialize this monorepo template for your project, run the provided setup script:

```sh
./init.sh
```

The script will:

1. Prompt you to enter a new package scope name (e.g., if you enter "mycompany", the scope becomes "@mycompany")
2. Replace all occurrences of `@la` with your new scope throughout the repository (in JSON, TypeScript, JavaScript, Markdown, and YAML files)
3. Install dependencies using pnpm
4. Update package.json files using manypkg
5. Initialize a new git repository

**Note**: You can run this script from any directory; it will automatically work on the repository it's located in.

### Installation

After cloning the repository, you can manually install dependencies with:

```sh
pnpm install
```

Or use the `./init.sh` script to initialize and install in one command.

### Scripts

`dev`: This command is used to start the development server for each package in the monorepo.

`format`: Formats the codebase using Prettier.

`lint`: Runs ESLint to check for code style and quality issues throughout the monorepo.

`lint:fix`: Automatically fixes linting issues where possible.

`test`: Runs the test suite using Vitest.

`typecheck`: Checks for TypeScript typing issues across the codebase.

### Example Packages with Different tsconfig Setups

- **[core](packages/core)**: Internal monorepo library that only emits type declarations. Consumers import directly from source while benefiting from pre-built `.d.ts` files for faster IDE performance.

- **[lib](packages/lib)**: Publishable library example that builds JavaScript and type declarations. Use this pattern for packages intended for npm or external consumers.

- **[api](packages/api)**: Node.js application example that builds executable JavaScript. Use this pattern for CLIs, servers, or scripts that run in a Node.js environment.

Read more about the tsconfig setup in the [Tsconfig README](./configs/typescript/README.md).

### Continuous Integration

The monorepo is designed to easily integrate with CI/CD systems. The provided GitHub Actions workflow (`.github/workflows/ci.yml`) runs linting, testing, and type checking on every push and pull request. It uses turbo remote caching to speed up the process.
