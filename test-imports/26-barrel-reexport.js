// Scenario 26: Importing default from a barrel file that re-exports everything
// barrel.js: export { foo, bar, default } from './basic.js'
// 'foo' IS a named re-export, the module HAS a default re-export
// RESULT: *** DIFFERENCE FOUND *** (confirms Scenario 10 pattern)
// ESLint: MISSES this. Barrel file data is in 'reexports' Map, not 'exports' Map.
//         This is the most impactful real-world case - barrel/index files are everywhere.
// OxLint: CORRECTLY FLAGS this.
import foo from '../test-modules/barrel.js';

console.log(foo);
