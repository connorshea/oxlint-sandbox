// Scenario 4: Importing default from a module with no named exports
// EXPECTED: Neither should flag this (foo is not a named export of default-only.js)
import foo from '../test-modules/default-only.js';

console.log(foo);
