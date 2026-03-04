// Scenario 11: Module with multiple named exports - testing each name as default import
// EXPECTED: All should be flagged by both linters
import alpha from '../test-modules/multiple-named.js';
import beta from '../test-modules/multiple-named.js';
import gamma from '../test-modules/multiple-named.js';

console.log(alpha, beta, gamma);
