// Scenario 7: Importing both default (with conflicting name) AND a named export
// EXPECTED: Both should flag the default import 'foo'
import foo, { bar } from '../test-modules/basic.js';

console.log(foo, bar);
