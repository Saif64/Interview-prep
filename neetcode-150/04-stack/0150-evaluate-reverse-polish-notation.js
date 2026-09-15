// 150. Evaluate Reverse Polish Notation — Medium
// https://leetcode.com/problems/evaluate-reverse-polish-notation/
// Pattern: Stack
// Time O(n) | Space O(n)
//
// Idea: push numbers; on an operator pop two and push the result. Order matters for the
// non-commutative ones — the second pop is the left operand. Division truncates toward
// zero, so Math.trunc, not Math.floor (they differ on negatives).

const OPS = {
  '+': (a, b) => a + b,
  '-': (a, b) => a - b,
  '*': (a, b) => a * b,
  '/': (a, b) => Math.trunc(a / b),
};

/**
 * @param {string[]} tokens
 * @return {number}
 */
const evalRPN = (tokens) => {
  const stack = [];
  for (const token of tokens) {
    if (token in OPS) {
      const right = stack.pop();
      const left = stack.pop();
      stack.push(OPS[token](left, right));
    } else {
      stack.push(Number(token));
    }
  }
  return stack.pop();
};

module.exports = { evalRPN };

if (require.main === module) {
  const assert = require('node:assert');
  assert.strictEqual(evalRPN(['2', '1', '+', '3', '*']), 9);
  assert.strictEqual(evalRPN(['4', '13', '5', '/', '+']), 6);
  assert.strictEqual(
    evalRPN(['10', '6', '9', '3', '+', '-11', '*', '/', '*', '17', '+', '5', '+']),
    22
  );
  assert.strictEqual(evalRPN(['7', '-3', '/']), -2); // truncate toward zero, not -3
  console.log('150 ok');
}
