// Scenario 23: Using 'bar' as default import name (bar is a named export of basic.js)
// EXPECTED: Both should flag this
import bar from '../test-modules/basic.js';

console.log(bar);
