# oxlint-sandbox

A sandbox for testing the `regexp/sort-flags` rule in ESLint and Oxlint.

The `test.js` file contains a regex with unsorted flags (`/\w/yvsimg`), which should be caught as a violation.

## Setup

```sh
pnpm install
```

## Running ESLint

Lint (detect the issue):

```sh
npx eslint test.js
```

The ESLint run correctly identifies the violation from `regexp/sort-flags`.

## Running Oxlint

Oxlint is set up to run `regexp/sort-flags`, and should also detect the violation, but it does not. Run the linter:

```sh
pnpm oxlint
```

See there are 0 violations, which is incorrect. There is some bug in the JS Plugins system that causes the `sort-flags` rule to not work correctly in this case.
