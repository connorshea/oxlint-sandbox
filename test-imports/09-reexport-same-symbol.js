// Scenario 9: Module that re-exports the same symbol as both default and named
// reexport-both.js: export { main as default, main } from './default-only.js'
// RESULT: Neither flags. Both linters correctly skip.
// ESLint: re-exports go into 'reexports' Map not 'exports' Map, so exports.has() is false.
//         Ironically, ESLint skips this for the wrong reason (data structure mismatch).
// OxLint: Correctly detects 'main' and 'default' point to the same symbol and skips.
import main from '../test-modules/reexport-both.js';

console.log(main);
