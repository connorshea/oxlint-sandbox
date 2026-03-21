// Test: regexp/no-dupe-characters-character-class
// Duplicate characters/classes in character classes should be removed.

// The user's specific test case: [\W\W\w \d\d\D]
// Expected fix: [\w\D] (since \w and \W together cover everything, \d is subset of \w, \D is subset of \W)
// But \w + \D also covers everything, and space is subset of \D.
const a = /[\W\W\w \d\d\D]/;

// Simpler duplicate: same char repeated
const b = /[aa]/;

// Duplicate shorthand classes
const c = /[\d\d]/;

// Overlapping shorthands
const d = /[\w\d]/;

// Duplicate ranges
const e = /[a-za-z]/;

// Duplicate with case variants that could use ignore-case
const f = /[aAbBcC]/;
