// 43. Multiply Strings — Medium
// https://leetcode.com/problems/multiply-strings/
// Pattern: Math & Geometry
// Time O(m * n) | Space O(m + n)
//
// Idea: long multiplication by hand, because the inputs are too big for a native number and
// BigInt is off the table. The key index fact: digit i of one number times digit j of the
// other lands in positions i + j and i + j + 1 of the result.
// Two guards: "0" times anything is "0", and leading zeros must be stripped at the end.

/**
 * @param {string} num1
 * @param {string} num2
 * @return {string}
 */
const multiply = (num1, num2) => {
  if (num1 === '0' || num2 === '0') return '0';

  const m = num1.length;
  const n = num2.length;
  const result = new Array(m + n).fill(0);

  for (let i = m - 1; i >= 0; i--) {
    for (let j = n - 1; j >= 0; j--) {
      const product = (num1.charCodeAt(i) - 48) * (num2.charCodeAt(j) - 48);
      const total = product + result[i + j + 1];
      result[i + j + 1] = total % 10;
      result[i + j] += Math.floor(total / 10);
    }
  }

  const digits = result.join('').replace(/^0+/, '');
  return digits.length ? digits : '0';
};

module.exports = { multiply };

if (require.main === module) {
  const assert = require('node:assert');
  assert.strictEqual(multiply('2', '3'), '6');
  assert.strictEqual(multiply('123', '456'), '56088');
  assert.strictEqual(multiply('0', '52'), '0');
  assert.strictEqual(multiply('9', '9'), '81');
  assert.strictEqual(multiply('999', '999'), '998001');
  // Beyond Number.MAX_SAFE_INTEGER, which is the reason this problem exists.
  assert.strictEqual(multiply('123456789', '987654321'), '121932631112635269');
  console.log('43 ok');
}
