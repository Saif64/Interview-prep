// 50. Pow(x, n) — Medium
// https://leetcode.com/problems/powx-n/
// Pattern: Math & Geometry
// Time O(log n) | Space O(1)
//
// Idea: binary exponentiation. Square the base and halve the exponent; multiply into the
// result whenever the current bit is set. Multiplying n times is O(n) and times out.
// A negative exponent inverts the base — and n can be -2^31, which is why `-n` is taken on
// the already-negated value rather than relying on Math.abs of a 32-bit edge case.

/**
 * @param {number} x
 * @param {number} n
 * @return {number}
 */
const myPow = (x, n) => {
  if (n < 0) {
    x = 1 / x;
    n = -n;
  }
  let result = 1;
  while (n > 0) {
    if (n % 2 === 1) result *= x;
    x *= x;
    n = Math.floor(n / 2);
  }
  return result;
};

module.exports = { myPow };

if (require.main === module) {
  const assert = require('node:assert');
  assert.ok(Math.abs(myPow(2, 10) - 1024) < 1e-9);
  assert.ok(Math.abs(myPow(2.1, 3) - 9.261) < 1e-9);
  assert.ok(Math.abs(myPow(2, -2) - 0.25) < 1e-9);
  assert.strictEqual(myPow(1, 0), 1);
  assert.strictEqual(myPow(5, 0), 1);
  assert.ok(Math.abs(myPow(2, -2147483648)) < 1e-9); // underflows to 0, must not hang
  console.log('50 ok');
}
