# Comparing `no-named-as-default` Rule: ESLint (import-x) vs OxLint

## Setup

- **ESLint**: v10.0.2 with `eslint-plugin-import-x` v4.16.1 (the ESLint 10-compatible fork of `eslint-plugin-import`)
- **OxLint**: v1.50.0 with `--import-plugin` flag

> Note: The original `eslint-plugin-import` v2.32.0 does not support ESLint 10 due to context API changes (`context.getFilename()` was removed). `eslint-plugin-import-x` is the maintained fork that supports ESLint 10's flat config.

## Test Modules

| File | Named Exports | Default Export |
|------|--------------|----------------|
| `basic.js` | `foo`, `bar` | `function main()` |
| `default-only.js` | _(none)_ | `function main()` |
| `named-only.js` | `foo`, `bar` | _(none)_ |
| `same-as-default.js` | `foo` | `foo` (same value) |
| `reexport-both.js` | `main` (re-exported) | `main` (same re-export) |
| `reexport-different.js` | `foo` (re-exported from basic) | `default` (re-exported from basic) |
| `multiple-named.js` | `alpha`, `beta`, `gamma` | `class MyClass` |
| `barrel.js` | `foo`, `bar`, `default` (all re-exported from basic) | yes (re-exported) |
| `mixed-exports.js` | `localValue` (direct), `foo` (re-exported) | `class MixedDefault` |
| `reexport-named-as-default.js` | `bar` (re-exported) | `foo` as default (re-exported) |
| `ts-module.ts` | `Foo` (interface), `Bar` (type), `baz` (value) | `class MyClass` |
| `self-import-module.js` | `myFunc` | `class SelfImport` |

## Results Comparison

| Scenario | File | Import | ESLint | OxLint |
|----------|------|--------|--------|--------|
| 01 | `01-basic-violation.js` | `import foo from basic.js` | ✅ VIOLATION | ✅ VIOLATION |
| 02 | `02-no-violation-different-name.js` | `import main from basic.js` | ✅ OK | ✅ OK |
| 03 | `03-aliased-default.js` | `import { foo as bar } from basic.js` | ✅ OK | ✅ OK |
| 04 | `04-default-only-module.js` | `import foo from default-only.js` | ✅ OK | ✅ OK |
| **05** | `05-named-only-module.js` | `import foo from named-only.js` | ✅ OK | ❌ **VIOLATION** |
| 06 | `06-default-keyword.js` | `export { default } from basic.js` | ✅ OK | ✅ OK |
| 07 | `07-both-default-and-named.js` | `import foo, { bar } from basic.js` | ✅ VIOLATION | ✅ VIOLATION |
| 08 | `08-same-thing-default-named.js` | `import foo from same-as-default.js` | ✅ VIOLATION | ✅ VIOLATION |
| 09 | `09-reexport-same-symbol.js` | `import main from reexport-both.js` | ✅ OK | ✅ OK |
| **10** | `10-reexport-different-symbols.js` | `import foo from reexport-different.js` | ✅ **MISSED** | ✅ VIOLATION |
| 11 | `11-multiple-named-exports.js` | `import alpha/beta/gamma from multiple-named.js` | ✅ VIOLATION (3x) | ✅ VIOLATION (3x) |
| 12 | `12-namespace-import.js` | `import * as foo from basic.js` | ✅ OK | ✅ OK |
| 13 | `13-nonexistent-module.js` | `import foo from does-not-exist.js` | ✅ OK | ✅ OK |
| 14 | `14-node-builtin.js` | `import fs from 'fs'` | ✅ OK | ✅ OK |
| 15 | `15-npm-package.js` | `import React from 'react'` | ✅ OK | ✅ OK |
| 16 | `16-export-default-specifier.js` | `export { foo as default } from basic.js` | ✅ OK | ✅ OK |
| 17 | `17-export-default-specifier-ok.js` | `export { default as main } from basic.js` | ✅ OK | ✅ OK |
| **18** | `18-type-import.ts` | `import type foo from basic.js` | ✅ OK | ❌ **VIOLATION** |
| **19** | `19-ts-type-named.ts` | `import Foo/baz from ts-module.js` | ✅ OK | ❌ **VIOLATION** (2x) |
| 20 | `20-dynamic-import.js` | `await import(basic.js)` | ✅ OK | ✅ OK |
| 21 | `21-self-import.js` | `import myFunc from self-import-module.js` | ✅ VIOLATION | ✅ VIOLATION |
| 22 | `22-default-renamed.js` | `import myDefault from basic.js` | ✅ OK | ✅ OK |
| 23 | `23-only-bar-named.js` | `import bar from basic.js` | ✅ VIOLATION | ✅ VIOLATION |
| 24 | `24-multiple-imports-same-module.js` | `import main; import foo from basic.js` | ✅ VIOLATION (foo) | ✅ VIOLATION (foo) |
| 25 | `25-index-module.js` | `import foo from ./test-modules/` | ✅ OK | ✅ OK |
| **26** | `26-barrel-reexport.js` | `import foo from barrel.js` | ✅ **MISSED** | ✅ VIOLATION |
| **27** | `27-mixed-exports.js` | `import foo; import localValue from mixed-exports.js` | ⚠️ PARTIAL (localValue only) | ✅ VIOLATION (both) |
| **28** | `28-reexport-named-as-default.js` | `import bar from reexport-named-as-default.js` | ✅ **MISSED** | ✅ VIOLATION |
| **30** | `30-no-default-multiple-named.js` | `import foo; import bar from named-only.js` | ✅ OK | ❌ **VIOLATION** (2x) |

## Key Differences Found

### Difference 1: Module with No Default Export

**Scenario 05, 30**: When importing a "default" from a module that has no default export at all.

```js
// named-only.js
export const foo = 1;
export const bar = 2;
// (no default export)
```

```js
import foo from './named-only.js'; // foo IS a named export, but no default exists
```

- **ESLint**: Skips. The rule explicitly checks `if (!importedModule.hasDefault) { return; }` — it reasons that if a module has no default export, the code is already wrong for other reasons.
- **OxLint**: **Reports a violation** — it doesn't check whether a default export exists before flagging.

### Difference 2: Re-exported Named Exports (Barrel Files)

**Scenarios 10, 26, 27, 28**: When a module re-exports named exports using `export { ... } from '...'` syntax.

```js
// reexport-different.js
export { foo } from './basic.js';     // re-export named
export { default } from './basic.js'; // re-export default
```

```js
import foo from './reexport-different.js'; // foo IS a re-exported named export
```

- **ESLint (import-x)**: **Misses it**. The ExportMap stores re-exported symbols in the `reexports` Map, but the `no-named-as-default` rule checks `exportMap.exports.has(name)`. The `exports` Map only contains directly-defined exports (from `namespace`), not re-exports. This is a significant blind spot for barrel files.
- **OxLint**: **Correctly flags it** — OxLint resolves re-exports and checks all exported names regardless of whether they're direct or re-exported.

This is probably the most impactful difference since barrel files (`index.js` files that re-export everything) are extremely common in large codebases.

### Difference 3: TypeScript `import type` Statements

**Scenario 18**: Type-only default imports in TypeScript.

```ts
import type foo from './basic.js'; // foo is a named export of basic.js
```

- **ESLint**: **Skips entirely**. ESLint (without a TypeScript parser) doesn't parse `import type` as an `ImportDefaultSpecifier` node — the `import type` syntax causes the rule visitor not to fire.
- **OxLint**: **Reports a violation** — OxLint parses TypeScript natively and treats `import type X from ...` the same as `import X from ...` for this rule.

The question of whether type-only imports should be flagged is debatable: since `import type` only imports the type (erased at runtime), it might be considered harmless to name it the same as a named export. ESLint's behavior (not flagging) could be seen as more permissive and developer-friendly.

### Difference 4: TypeScript Type Exports (Interfaces) Treated as Named Exports

**Scenario 19**: When a module has TypeScript interface/type exports, and a default import uses the same name.

```ts
// ts-module.ts
export interface Foo { bar: string; }
export type Bar = string;
export const baz = 42;
export default class MyClass {}
```

```ts
import Foo from './ts-module.js'; // Foo is a TypeScript interface export
```

- **ESLint**: **Skips**. ESLint can't resolve `ts-module.js` to `ts-module.ts` (Node resolver with `.js` explicit extension doesn't try `.ts`). Even if it could, it may not parse TypeScript syntax without `@typescript-eslint/parser`.
- **OxLint**: **Flags both `Foo` (interface) and `baz` (value)** — OxLint uses TypeScript-aware module resolution, resolves `.js` imports to `.ts` files, and correctly identifies both type and value named exports.

## Same Behavior in Both

- **Direct named export + default**: Both flag correctly (Scenarios 01, 07, 11, 23)
- **Re-export of same symbol as both named and default**: Neither flags (Scenario 09 — `reexport-both.js` exports `main` as both named and default via same re-export path)
- **Namespace imports (`import * as foo`)**: Neither flags (Scenario 12)
- **Non-existent modules**: Neither flags (Scenario 13 — resolve fails, both skip)
- **Node.js built-ins and npm packages**: Neither flags (Scenarios 14, 15)
- **Dynamic imports**: Neither flags (Scenario 20)
- **`export { foo as default }` (re-exporting as default)**: Neither flags (Scenario 16 — exported name is `default`, which is explicitly excluded by both rules)
- **`export const foo = 1; export default foo;` (same value, different mechanism)**: Both flag (Scenario 08 — they can't determine values are equal without re-export analysis)
- **Self-imports**: Both flag (Scenario 21)
- **Multiple imports from same module**: Both flag only the violating one (Scenario 24)

## Summary

OxLint is **stricter** than ESLint's import-x plugin. It catches more violations:

| Category | ESLint catches | OxLint catches |
|----------|---------------|----------------|
| Direct named + default exports | ✅ | ✅ |
| Re-exported named exports (barrel files) | ❌ | ✅ |
| Modules without default exports | ❌ (skips) | ✅ (flags) |
| TypeScript `import type` | ❌ | ✅ |
| TypeScript interface/type named exports | ❌ | ✅ |

The most significant practical difference is **re-exported exports in barrel files** — ESLint misses violations when the target module uses `export { foo } from '...'` syntax, while OxLint catches them correctly. This could lead to different lint behavior when migrating from ESLint to OxLint in codebases that heavily use barrel files.
