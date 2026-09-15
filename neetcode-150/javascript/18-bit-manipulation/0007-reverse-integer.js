// 7. Reverse Integer — Medium
// https://leetcode.com/problems/reverse-integer/
// Pattern: Bit Manipulation / Math
// Time O(log n) | Space O(1)
//
// Idea: pop digits with %10 and push them onto a reversed accumulator.
// The actual problem is the 32-bit overflow rule: the result must be returned as 0 if it
// falls outside [-2^31, 2^31 - 1]. JavaScript numbers do not overflow, so the check is an
// explicit range test — in C++ or Java you would have to test BEFORE multiplying.

const INT_MIN = -(2 ** 31);
const INT_MAX = 2 ** 31 - 1;

/**
 * @param {number} x
 * @return {number} 0 when the reversed value overflows 32 bits
 */
const reverse = (x) => {
  let result = 0;
  let n = Math.abs(x);
  while (n > 0) {
    result = result * 10 + (n % 10);
    n = Math.floor(n / 10);
  }
  result *= Math.sign(x);
  return result < INT_MIN || result > INT_MAX ? 0 : result;
};

module.exports = { reverse };

if (require.main === module) {
  const assert = require('node:assert');
  assert.strictEqual(reverse(123), 321);
  assert.strictEqual(reverse(-123), -321);
  assert.strictEqual(reverse(120), 21); // trailing zero disappears
  assert.strictEqual(reverse(0), 0);
  assert.strictEqual(reverse(1534236469), 0); // overflows
  assert.strictEqual(reverse(-2147483648), 0);
  console.log('7 ok');
}
