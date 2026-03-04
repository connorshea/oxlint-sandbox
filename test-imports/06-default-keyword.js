// Scenario 6: Using 'default' as the import name (valid specifier per ESLint rule #566)
// EXPECTED: Neither should flag (ESLint explicitly allows 'default' as a name)
// Note: `import default from ...` is a syntax error, but via re-export it's valid
export { default } from '../test-modules/basic.js';
