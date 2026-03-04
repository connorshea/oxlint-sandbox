// Scenario 14: Importing from a Node.js built-in module
// EXPECTED: ESLint skips (can't analyze); OxLint may differ
import fs from 'fs';

console.log(fs);
