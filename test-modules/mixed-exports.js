// mixed-exports.js - mix of direct exports and re-exports
export const localValue = 42;
export { foo } from './basic.js';
export default class MixedDefault {}
