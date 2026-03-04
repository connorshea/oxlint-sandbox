// Scenario 24: Multiple import statements from the same module in same file
// EXPECTED: Both should flag the second one (foo is a named export)
import main from '../test-modules/basic.js';
import foo from '../test-modules/basic.js';

console.log(main, foo);
