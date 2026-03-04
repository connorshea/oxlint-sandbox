// Scenario 16: ExportDefaultSpecifier - re-exporting named as default
// Tests the ExportDefaultSpecifier branch in ESLint (not ImportDefaultSpecifier)
// 'foo' is also a named export of basic.js
export { foo as default } from '../test-modules/basic.js';
