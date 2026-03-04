// Scenario 27: Module with mixed direct exports and re-exports
// mixed-exports.js: direct 'localValue', re-exported 'foo', direct default class
// RESULT: Both flag both violations.
// ESLint: Flags 'foo' (re-export) because the default is NOT in the reexports Map
//         (it's directly defined). The "same symbol" escape hatch only runs when BOTH
//         named AND default are re-exports - since default is direct, the hatch is skipped.
// OxLint: Flags both for the correct reason.
// Contrast with barrel.js (scenario 26) where ESLint misses 'foo' because there
// the default IS also a re-export, causing the escape hatch to fire incorrectly.
import foo from '../test-modules/mixed-exports.js';
import localValue from '../test-modules/mixed-exports.js';

console.log(foo, localValue);
