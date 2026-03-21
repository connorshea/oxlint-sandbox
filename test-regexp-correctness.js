// Test: Correctness and performance regexp rules

// no-super-linear-backtracking: patterns that could cause catastrophic backtracking
const a = /(\w+)+$/;
const b = /(?:a+)+/;

// no-dupe-disjunctions: duplicate alternatives
const c = /a|a/;
const d = /\w|[0-9]/;

// no-contradiction-with-assertion: assertions that contradict each other
const e = /\ba\B/;

// no-empty-alternative: empty alternatives (often a mistake)
const f = /a||b/;
const g = /|a/;

// no-empty-group: empty groups
const h = /a()/;

// no-empty-lookarounds-assertion: empty lookaheads/lookbehinds
const i = /a(?=)/;

// no-trivially-nested-assertion: unnecessary nesting
const j = /(?=(?=a))/;

// no-trivially-nested-quantifier: unnecessary nesting
const k = /(?:a{2}){3}/; // should be a{6}

// no-extra-lookaround-assertions: simplifiable lookarounds
const l = /(?=a(?=b))/;

// optimal-quantifier-concatenation: suboptimal adjacent quantifiers
const m = /\w+\d+/;

// control-character-escape: use \t not \x09
const n = /\x09/;
const o = /\x0a/;

// use-ignore-case: use i flag when possible
const p = /[aA][bB][cC]/;
