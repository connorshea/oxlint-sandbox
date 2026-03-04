// Scenario 5: Importing default from a module with no default export
// named-only.js only has: export const foo = 1; export const bar = 2;
// RESULT: *** DIFFERENCE FOUND ***
// ESLint: SKIPS. Checks `hasDefault` first; no default means broken code anyway → skip.
// OxLint: REPORTS VIOLATION. Does not check whether default export exists before flagging.
import foo from '../test-modules/named-only.js';

console.log(foo);
