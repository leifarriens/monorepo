# Monorepo

## Overview

This repository is a template for creating a TypeScript monorepo with a focus on development efficiency through linters, testing, and continuous integration setup. It is designed to work seamlessly with tools like pnpm, Turbo, and Vitest.

## Key Features

- **[pnpm](https://github.com/pnpm/pnpm)**: A fast, disk space efficient package manager. This template uses pnpm to manage dependencies, ensuring efficient and consistent package installations across the monorepo.

- **[Turbo](https://turborepo.com/docs)**: A tool for speeding up builds and task runs in monorepos. Turbo helps run scripts like linting, testing, and type checking across multiple packages in parallel, leveraging caching for faster repeats.

- **[Vitest](https://vitest.dev/guide/)**: A Vite-native unit testing framework that's fast and integrates well with modern builds. Vitest is used for running tests, providing a quick feedback loop during development.

- **[Typescript ESLint](https://typescript-eslint.io/getting-started) with [Prettier](https://prettier.io/docs/)**: Code quality tools that enforce consistent style and find problems in your code. The linting setup uses Prettier to automatically format your code and ESLint to catch common errors and enforce best practices.

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

### Continuous Integration

The monorepo is designed to easily integrate with CI/CD systems. By using the provided scripts and tools like Turbo, tasks like testing and linting are done efficiently and can be easily triggered in a CI environment.
