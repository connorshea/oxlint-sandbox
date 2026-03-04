// Scenario 21: A file importing from itself
// self-import-module.js exports 'myFunc' as named and has a default export
// 'myFunc' is a named export of self-import-module.js
import myFunc from '../test-modules/self-import-module.js';

console.log(myFunc);
