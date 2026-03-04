// Scenario 17: ExportDefaultSpecifier - re-exporting main (not a named export of basic.js)
// 'main' is the default export of basic.js, not a named export
// EXPECTED: Neither should flag this
export { default as main } from '../test-modules/basic.js';
