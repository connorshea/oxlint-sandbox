// Scenario 10: Module that re-exports different things as named 'foo' and default
// reexport-different.js: export { foo } from './basic.js'; export { default } from './basic.js'
// RESULT: *** DIFFERENCE FOUND ***
// ESLint: MISSES this. ExportMap puts re-exported symbols in 'reexports' Map, but
//         import-x's rule checks 'exports' Map (only direct/namespace exports).
//         Any pure re-export barrel file blinds ESLint to violations here.
// OxLint: CORRECTLY FLAGS this. Resolves re-exports and checks all exported names.
import foo from '../test-modules/reexport-different.js';

console.log(foo);
