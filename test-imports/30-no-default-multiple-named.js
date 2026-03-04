// Scenario 30: Module with multiple named exports but NO default
// importing default with a name matching each named export
// EXPECTED DIFFERENCE: ESLint skips (hasDefault=false); OxLint flags
import foo from '../test-modules/named-only.js';
import bar from '../test-modules/named-only.js';

console.log(foo, bar);
