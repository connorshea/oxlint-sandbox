// Scenario 12: Namespace import (star import) - not a default import
// EXPECTED: Neither should flag this (it's not ImportDefaultSpecifier)
import * as foo from '../test-modules/basic.js';

console.log(foo);
