// Scenario 25: Importing from a directory index file
// EXPECTED: Depends on resolver - OxLint may not resolve index files
import foo from './test-modules';

console.log(foo);
