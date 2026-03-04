// Scenario 20: Dynamic import - not a static ImportDeclaration
// EXPECTED: Neither linter checks dynamic imports for this rule (they're expressions, not declarations)
const module = await import('../test-modules/basic.js');
const { default: foo } = module;

console.log(foo);
