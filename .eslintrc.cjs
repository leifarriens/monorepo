module.exports = {
  root: true,
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended-type-checked",
    "plugin:@typescript-eslint/stylistic-type-checked",
    "prettier",
  ],
  plugins: ["@typescript-eslint"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: ["./tsconfig.json"],
  },
  ignorePatterns: [".eslintrc.cjs"],
  overrides: [
    {
      files: ["*.js"],
      extends: ["plugin:@typescript-eslint/disable-type-checked"],
    },
  ],
};
