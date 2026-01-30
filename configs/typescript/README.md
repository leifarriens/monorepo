# @la/tsconfig

## Configurations

### base.json

For type checking all packages. Uses `bundler` module resolution with extensionless imports. Enables maximum strictness. Does not emit files.

### build-node.json

For building Node.js applications that run directly—CLIs, servers, scripts. Emits `.js` and `.js.map` files. No type declarations since consumers run the code, not import it as a library.

### build-lib.json

For building publishable libraries consumed by other packages or external users. Emits `.js`, `.js.map`, `.d.ts`, and `.d.ts.map` files. Includes declarations so consumers get full type information.

### build-types.json

For building internal monorepo packages where consumers import directly from source. Emits only `.d.ts` and `.d.ts.map` files. Speeds up IDE performance and type checking without duplicating JavaScript that's never executed.
