// Scenario 29: TypeScript type import where the name matches a named export
// but this is a type-only import - the whole point is to import just the type
// EXPECTED DIFFERENCE: ESLint skips type imports entirely
//                      OxLint flags even type-only imports
import type MyClass from '../test-modules/ts-module.js';
import type { Foo } from '../test-modules/ts-module.js';

type Instance = InstanceType<typeof MyClass>;
