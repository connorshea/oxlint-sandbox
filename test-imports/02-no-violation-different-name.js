// Scenario 2: No violation - importing default with a name that isn't a named export
// EXPECTED: Neither linter should flag this
import main from '../test-modules/basic.js';

console.log(main);
