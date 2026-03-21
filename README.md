# oxlint-sandbox

A sandbox for testing the `regexp/sort-flags` rule in ESLint and Oxlint.

The `test.js` file contains a regex with unsorted flags (`/\w/yvsimg`), which should be sorted to `/\w/gimsvy`.

## Setup

```sh
pnpm install
```

## Running ESLint

Lint (detect the issue):

```sh
npx eslint test.js
```

Fix (auto-sort the flags):

```sh
npx eslint --fix test.js
```

The ESLint fixer correctly sorts the regex flags.

## Running Oxlint

Oxlint does not have a native `regexp/sort-flags` rule, so the config uses `jsPlugins` to load `eslint-plugin-regexp`.

Lint:

```sh
npx oxlint -c .oxlintrc.json test.js
```

Fix:

```sh
npx oxlint -c .oxlintrc.json --fix test.js
```

**Note:** As of oxlint v1.56.0, the `jsPlugins` feature is in alpha. The `regexp/sort-flags` rule loads but does not detect the unsorted flags or apply a fix. The ESLint fixer works correctly.
