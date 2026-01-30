# @la/typescript

## Configurations

### base.json

#### No `composite`?

`composite: true` enables TypeScript project references for multi-project builds, but it's only needed when using `tsc --build` to manage dependencies. This monorepo uses turbo for build orchestration, so composite is unnecessary.

#### No `isolatedModules`?

`verbatimModuleSyntax` is the modern replacement that includes all of isolatedModules's behavior plus stricter import/export syntax enforcement. Having both is redundant.

#### No `esmoduleInterop`?

Already implied by `verbatimModuleSyntax`.

### build-node.json

For code applications that run directly in Node. CLIs, servers, scripts. Emits `.js` and `.js.map` files. No type declarations since consumers run the code, not import it as a library.

### build-lib.json

For publishable libraries consumed by other packages or external users. Emits `.js`, `.js.map`, `.d.ts`, and `.d.ts.map` files. Includes declarations so consumers get full type information.

### build-types.json

For internal monorepo packages where consumers import directly from source. Emits only `.d.ts` and `.d.ts.map` files. Speeds up IDE performance and type checking without duplicating JavaScript that never runs.
