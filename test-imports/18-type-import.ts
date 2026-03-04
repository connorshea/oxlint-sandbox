// Scenario 18: TypeScript type-only default import
// basic.js has named export 'foo'. We import type-only default named 'foo'.
// RESULT: *** DIFFERENCE FOUND ***
// ESLint: SKIPS. `import type` is not parsed as ImportDefaultSpecifier by espree.
//         The rule visitor never fires for type imports.
// OxLint: REPORTS VIOLATION. OxLint parses TypeScript natively and treats
//         `import type X from ...` the same as `import X from ...` for this rule.
import type foo from '../test-modules/basic.js';

type MyType = typeof foo;
