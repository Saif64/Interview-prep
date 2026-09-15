// 678. Valid Parenthesis String — Medium
// https://leetcode.com/problems/valid-parenthesis-string/
// Pattern: Greedy
// Time O(n) | Space O(1)
//
// Idea: '*' is three characters at once, so track a RANGE of possible open counts instead
// of a single number. `low` assumes every '*' is ')', `high` assumes every '*' is '('.
// If `high` ever drops below zero there are unmatched ')' no matter what; clamping `low` at
// zero reflects that an over-closing guess was simply the wrong guess.
// Valid exactly when low reaches 0 — some assignment balances out.

/**
 * @param {string} s
 * @return {boolean}
 */
const checkValidString = (s) => {
  let low = 0; // minimum possible open brackets
  let high = 0; // maximum possible open brackets

  for (const ch of s) {
    if (ch === '(') {
      low++;
      high++;
    } else if (ch === ')') {
      low--;
      high--;
    } else {
      low--; // '*' as ')'
      high++; // '*' as '('
    }
    if (high < 0) return false;
    low = Math.max(low, 0);
  }
  return low === 0;
};

module.exports = { checkValidString };

if (require.main === module) {
  const assert = require('node:assert');
  assert.strictEqual(checkValidString('()'), true);
  assert.strictEqual(checkValidString('(*)'), true);
  assert.strictEqual(checkValidString('(*))'), true);
  assert.strictEqual(checkValidString(')('), false);
  assert.strictEqual(checkValidString('('), false);
  assert.strictEqual(checkValidString('***'), true); // all can be empty
  assert.strictEqual(checkValidString('(((**'), false);
  console.log('678 ok');
}
