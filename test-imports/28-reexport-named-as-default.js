// Scenario 28: Module that re-exports a named export as its default
// reexport-named-as-default.js: export { foo as default }; export { bar }
// Importing as 'bar' - bar IS a named export, but is the default different?
// EXPECTED DIFFERENCE: ESLint may miss (re-exports in reexports map); OxLint may flag
import bar from '../test-modules/reexport-named-as-default.js';

console.log(bar);
