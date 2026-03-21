// Test: Various "no-useless-*" regexp rules

// no-useless-character-class: single char in a class
const a = /[a]/;

// no-useless-escape: unnecessary escapes
const b = /\a/;
const c = /\:/;

// no-useless-flag: flags that don't affect the regex
const d = /foo/s;

// no-useless-lazy: lazy quantifier that matches the same as greedy
const e = /a{1}?/;
const f = /a{3,3}?/;

// no-useless-non-capturing-group: non-capturing group with nothing to group
const g = /(?:a)/;
const h = /(?:ab)+/; // this one is useful, should NOT flag

// no-useless-quantifier: quantifier that doesn't change the match
const i = /a{1}/;

// no-useless-range: range with same start and end
const j = /[a-a]/;

// no-useless-two-nums-quantifier: {n,n} should be {n}
const k = /a{2,2}/;

// no-useless-string-literal: unnecessary string literal in character class
// (only applies in v-flag regex)
