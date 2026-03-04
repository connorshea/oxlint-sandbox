// Scenario 8: Module where named export IS the default export (same value)
// same-as-default.js: export const foo = 1; export default foo;
// RESULT: Both flag. Neither can determine values are equal without re-export analysis.
// The "same symbol" escape hatch only works when BOTH are re-exports (reexport chain).
// Here foo is defined inline, so there's no re-export chain to compare against.
import foo from '../test-modules/same-as-default.js';

console.log(foo);
