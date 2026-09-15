// 20. Valid Parentheses — Easy
// https://leetcode.com/problems/valid-parentheses/
// Pattern: Stack
// Time O(n) | Space O(n)
//
// Idea: push openers, and on a closer check it matches the most recent opener.
// Two failure modes people forget: a closer with an empty stack, and leftovers at the end.

const PAIRS = { ')': '(', ']': '[', '}': '{' };

/**
 * @param {string} s
 * @return {boolean}
 */
const isValid = (s) => {
  const stack = [];
  for (const ch of s) {
    if (ch in PAIRS) {
      if (stack.pop() !== PAIRS[ch]) return false;
    } else {
      stack.push(ch);
    }
  }
  return stack.length === 0;
};

module.exports = { isValid };

if (require.main === module) {
  const assert = require('node:assert');
  assert.strictEqual(isValid('()'), true);
  assert.strictEqual(isValid('()[]{}'), true);
  assert.strictEqual(isValid('(]'), false);
  assert.strictEqual(isValid('('), false); // unclosed opener
  assert.strictEqual(isValid(')'), false); // closer with nothing to match
  assert.strictEqual(isValid(''), true);
  console.log('20 ok');
}
