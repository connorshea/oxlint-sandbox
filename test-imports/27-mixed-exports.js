// Scenario 27: Module with mixed direct exports and re-exports
// mixed-exports.js: direct 'localValue', re-exported 'foo', direct default class
// EXPECTED: 'foo' is a named re-export; ESLint may miss it, OxLint may catch it
// 'localValue' is a direct named export; both should catch it
import foo from '../test-modules/mixed-exports.js';
import localValue from '../test-modules/mixed-exports.js';

console.log(foo, localValue);
