# Comparing `no-named-as-default` Rule: ESLint (eslint-plugin-import) vs OxLint

## Setup

- **ESLint**: v9.39.3 with `eslint-plugin-import` v2.32.0 + `eslint-import-resolver-node` v0.3.9
- **OxLint**: v1.50.0 with `--import-plugin` flag

## Test Modules

| File | Named Exports | Default Export |
|------|--------------|----------------|
| `basic.js` | `foo`, `bar` | `function main()` |
| `default-only.js` | _(none)_ | `function main()` |
| `named-only.js` | `foo`, `bar` | _(none)_ |
| `same-as-default.js` | `foo` | `foo` (same value, but inline — not a re-export) |
| `reexport-both.js` | `main` (re-exported) | `main` (same re-export from same source) |
| `reexport-different.js` | `foo` (re-exported from basic) | `default` (re-exported from basic — different binding) |
| `multiple-named.js` | `alpha`, `beta`, `gamma` | `class MyClass` |
| `barrel.js` | `foo`, `bar`, `default` (all re-exported from basic) | yes (re-exported) |
| `mixed-exports.js` | `localValue` (direct), `foo` (re-exported) | `class MixedDefault` (direct) |
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
| **09** | `09-reexport-same-symbol.js` | `import main from reexport-both.js` | ✅ OK (wrong reason) | ✅ OK (correct reason) |
| **10** | `10-reexport-different-symbols.js` | `import foo from reexport-different.js` | ❌ **MISSED** | ✅ VIOLATION |
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
| **26** | `26-barrel-reexport.js` | `import foo from barrel.js` | ❌ **MISSED** | ✅ VIOLATION |
| **27** | `27-mixed-exports.js` | `import foo; import localValue from mixed-exports.js` | ⚠️ PARTIAL (both flagged) | ✅ VIOLATION (both) |
| **28** | `28-reexport-named-as-default.js` | `import bar from reexport-named-as-default.js` | ❌ **MISSED** | ✅ VIOLATION |
| 29 | `29-type-import-no-violation.ts` | `import type MyClass from ts-module.js` | ✅ OK | ✅ OK |
| **30** | `30-no-default-multiple-named.js` | `import foo; import bar from named-only.js` | ✅ OK | ❌ **VIOLATION** (2x) |

## Key Differences Found

### Difference 1: Re-exported Named Exports — The `getImport().local` Bug

**Scenarios 10, 26, 28** — when both the named export AND the default export are re-exports.

```js
// reexport-different.js
export { foo } from './basic.js';     // re-export named 'foo'
export { default } from './basic.js'; // re-export default (different binding!)

import foo from './reexport-different.js'; // foo is confusingly the same name as a named export
```

- **ESLint**: **MISSES it**. The rule has a "same symbol" escape hatch: if both the named and default exports are in the `reexports` Map, it calls `getImport()` on each and compares `.path` and `.local`. The bug is that `getImport().local` returns **`undefined`** for all re-exported symbols (it's not populated by the ExportMap builder). So `undefined === undefined` is always `true`, and the escape hatch fires for ALL pairs of re-exports — even when they're actually different symbols. This means ESLint never flags violations when both named and default exports come from re-export syntax.

- **OxLint**: **Correctly flags**. Uses `indirect_export_entries` from the module record and compares the actual `ExportImportName` strings (`'foo'` vs `'default'`), not the unset `local` property. Correctly identifies these as different symbols.

This is `eslint-plugin-import`'s most significant gap. The `FIXME` comment in the rule source even acknowledges problems with the ExportMap for this case.

### Difference 2: Mixed Direct + Re-exported Exports

**Scenario 27** — when a module mixes directly-defined exports with re-exports.

```js
// mixed-exports.js
export const localValue = 42;          // direct named export
export { foo } from './basic.js';      // re-exported named export
export default class MixedDefault {}  // direct default export
```

- **ESLint**: Flags **both** `localValue` and `foo`. For `foo`: it's in `reexports`, but `default` is NOT in `reexports` (it's direct), so the escape hatch block never runs — falls through to report. This is actually correct behavior, but only works because the default is direct.

- **OxLint**: Flags **both**. Same result for the right reason.

Both linters agree here, but ESLint's correct behavior is accidental — it only works because the default isn't a re-export. If the default were also a re-export (see Scenarios 10/26/28), ESLint would miss it.

### Difference 3: Module with No Default Export

**Scenarios 05, 30**: When importing a "default" from a module that has no default export at all.

```js
// named-only.js
export const foo = 1;
export const bar = 2;
// (no default export)
```

```js
import foo from './named-only.js'; // foo IS a named export, but no default exists
```

- **ESLint**: Skips. Checks `importedModule.hasDefault` first; if no default, the code is already broken for other reasons → skip.
- **OxLint**: **Reports a violation** — doesn't check whether a default export exists before flagging.

### Difference 4: TypeScript `import type` Statements

**Scenario 18**: Type-only default imports in TypeScript.

```ts
import type foo from './basic.js'; // foo is a named export of basic.js
```

- **ESLint**: Skips entirely. The `import type` statement is not parsed as an `ImportDefaultSpecifier` node by espree; the rule visitor never fires.
- **OxLint**: **Reports a violation** — treats `import type X from ...` identically to `import X from ...` for this rule.

### Difference 5: TypeScript Type/Interface Named Exports

**Scenario 19**: A module with TypeScript interface exports.

```ts
// ts-module.ts
export interface Foo { bar: string; }
export const baz = 42;
export default class MyClass {}
```

```ts
import Foo from './ts-module.js'; // Foo is a TypeScript interface export
```

- **ESLint**: Skips. Cannot resolve `ts-module.js` → `ts-module.ts` without TypeScript resolver config. Even with TS support, may not distinguish type vs. value exports.
- **OxLint**: **Flags both `Foo` (interface) and `baz` (value)** — uses TypeScript-aware module resolution, resolves `.js` to `.ts`, and finds all named exports including type-only ones.

### Scenario 09: Same Symbol — Both Happen to Skip (Different Reasons)

```js
// reexport-both.js
export { main as default, main } from './default-only.js';

import main from './reexport-both.js'; // main = same symbol exported as both named and default
```

- **ESLint**: Skips, but for the wrong reason: `hasDefault` is `false` in the ExportMap (the ExportMap doesn't count a re-exported `default` as `hasDefault`), so the rule returns early before even checking the escape hatch.
- **OxLint**: Skips for the correct reason: `default_and_named_are_same_reexport()` detects both exports come from the same source module with the same binding name.

Both produce the right result (no violation), but ESLint reaches it via a bug.

## Summary

OxLint is **stricter** than `eslint-plugin-import`. It catches more violations and uses correct logic for re-export analysis:

| Category | ESLint catches | OxLint catches |
|----------|---------------|----------------|
| Direct named + default exports | ✅ | ✅ |
| Mixed: direct default + re-exported named | ✅ | ✅ |
| Re-exported named + re-exported default (different symbols) | ❌ (bug: `local === undefined`) | ✅ |
| Modules without default exports | ❌ (intentional skip) | ✅ |
| TypeScript `import type` | ❌ | ✅ |
| TypeScript interface/type named exports | ❌ | ✅ |
| Same symbol exported as named + default | ✅ (correct skip) | ✅ (correct skip) |

The most impactful practical difference is the **re-export bug**: `eslint-plugin-import` never flags violations when both the named and the default are re-exported (via `export { x } from '...'`). Since `getImport().local` is always `undefined` for re-exports, the "same symbol" equality check always fires, suppressing all such violations. This is a significant gap for codebases using barrel/index files where everything is re-exported.
