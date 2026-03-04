// Scenario 13: Importing from a non-existent module
// EXPECTED: ESLint returns null for importedModule and skips; OxLint may differ
import foo from '../test-modules/does-not-exist.js';

console.log(foo);
