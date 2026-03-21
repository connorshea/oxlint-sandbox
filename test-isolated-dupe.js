// Isolated test for no-dupe-characters-character-class fixer behavior
// Input:  /[\W\W\w \d\d\D]/
// Both ESLint and oxlint fix this to: /[\w\D]/
const x = /[\W\W\w \d\d\D]/;
