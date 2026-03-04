// Scenario 1: Basic violation - importing default with same name as a named export
// EXPECTED: Both ESLint and OxLint should flag this
import foo from '../test-modules/basic.js';

console.log(foo);
