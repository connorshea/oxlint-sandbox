// Test: Various "prefer-*" regexp rules

// prefer-d: use \d instead of [0-9]
const a = /[0-9]/;
const b = /[0-9]+/;

// prefer-w: use \w instead of [a-zA-Z0-9_]
const c = /[a-zA-Z0-9_]/;

// prefer-plus-quantifier: use + instead of {1,}
const d = /a{1,}/;

// prefer-question-quantifier: use ? instead of {0,1}
const e = /a{0,1}/;

// prefer-star-quantifier: use * instead of {0,}
const f = /a{0,}/;

// prefer-character-class: use character class instead of alternation
const g = /a|b|c/;

// prefer-predefined-assertion: use \b instead of (?=\w)(?<=\W)|(?=\W)(?<=\w)
const h = /(?!\w)(?=\W)/;

// sort-flags: flags should be in canonical order
const i = /foo/gmi;
const j = /bar/ysg;

// match-any: prefer . or [\s\S] over [^] etc.
const k = /[\s\S]/s; // with s flag, just use .

// prefer-range: use range for consecutive chars
const l = /[abcdef]/;
