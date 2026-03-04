// self-import-module.js - a module that imports from itself
export const myFunc = () => {};
export default class SelfImport {}

// Re-importing from itself (circular) - should be fine syntactically
// This tests if the linter handles self-referencing modules
