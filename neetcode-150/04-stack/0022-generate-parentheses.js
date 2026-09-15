// 22. Generate Parentheses — Medium
// https://leetcode.com/problems/generate-parentheses/
// Pattern: Stack / Backtracking
// Time O(4^n / sqrt(n)) — the nth Catalan number | Space O(n) recursion depth
//
// Idea: build the string one character at a time under two rules — you may open while
// opens < n, and you may close while closes < opens. Those rules make every generated
// string valid, so nothing has to be filtered afterwards.

/**
 * @param {number} n
 * @return {string[]}
 */
const generateParenthesis = (n) => {
  const out = [];
  const build = (current, open, close) => {
    if (current.length === n * 2) {
      out.push(current);
      return;
    }
    if (open < n) build(current + '(', open + 1, close);
    if (close < open) build(current + ')', open, close + 1);
  };
  build('', 0, 0);
  return out;
};

module.exports = { generateParenthesis };

if (require.main === module) {
  const assert = require('node:assert');
  const { sorted } = require('../_lib');
  assert.deepStrictEqual(generateParenthesis(1), ['()']);
  assert.deepStrictEqual(sorted(generateParenthesis(3)), sorted(['((()))', '(()())', '(())()', '()(())', '()()()']));
  assert.strictEqual(generateParenthesis(4).length, 14); // Catalan(4)
  console.log('22 ok');
}
