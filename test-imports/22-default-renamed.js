// Scenario 22: Default import renamed - importing default as 'myDefault'
// even though 'foo' is a named export, we're importing as 'myDefault'
// EXPECTED: Neither should flag this
import myDefault from '../test-modules/basic.js';

console.log(myDefault);
