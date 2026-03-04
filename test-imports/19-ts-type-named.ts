// Scenario 19: TypeScript - import default using same name as a type-only named export
// ts-module.ts exports: interface Foo, type Bar, const baz, default class
// EXPECTED: May differ - ESLint may flag 'Foo' and 'baz', OxLint may handle types differently
import Foo from '../test-modules/ts-module.js';
import baz from '../test-modules/ts-module.js';

console.log(Foo, baz);
