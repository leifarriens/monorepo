# Monorepo

## Overview

This repository is a template for creating a TypeScript monorepo with a focus on development efficiency through linters, testing, and continuous integration setup. It is designed to work seamlessly with tools like pnpm, Turbo, and Vitest.

## Key Features

- **[pnpm](https://github.com/pnpm/pnpm)**: A fast, disk space efficient package manager. This template uses pnpm to manage dependencies, ensuring efficient and consistent package installations across the monorepo.

- **[Turbo](https://turborepo.com/docs)**: A tool for speeding up builds and task execution in monorepos. Turbo helps run scripts like linting, testing, and type checking across multiple packages in parallel, leveraging caching for faster repeats.

- **[Vitest](https://vitest.dev/guide/)**: A Vite-native unit testing framework that's fast and integrates well with modern builds. Vitest is used for running tests, providing a quick feedback loop during development.

- **[Typescript ESLint](https://typescript-eslint.io/getting-started) with [Prettier](https://prettier.io/docs/)**: Code quality tools that enforce consistent style and find problems in your code. The linting setup uses Prettier to automatically format your code and ESLint to catch common errors and enforce best practices.

## Setup and Usage

### Installation

After cloning the repository, use the command below to install dependencies:

```sh
pnpm install
```

### Scripts

`dev`: This command is used to start the development server for each package in the monorepo.

`format`: Formats the codebase using Prettier.

`lint`: Runs ESLint to check for code style and quality issues throughout the monorepo.

`lint:fix`: Automatically fixes linting issues where possible.

`test`: Executes the test suite using Vitest.

`typecheck`: Checks for TypeScript typing issues across the codebase.

### Continuous Integration

The monorepo is designed to easily integrate with CI/CD systems. By using the provided scripts and tools like Turbo, tasks like testing and linting are done efficiently and can be easily triggered in a CI environment.
