// Scenario 3: Aliasing a named import as default name - NOT a default import
// EXPECTED: Neither should flag this (this is a named import, not a default import)
import { foo as bar } from '../test-modules/basic.js';

console.log(bar);
