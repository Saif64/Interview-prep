// 371. Sum of Two Integers — Medium
// https://leetcode.com/problems/sum-of-two-integers/
// Pattern: Bit Manipulation
// Time O(1) — bounded by the word size | Space O(1)
//
// Idea: addition without '+'. XOR is addition with every carry ignored; AND-then-shift is
// exactly those carries. Repeat until nothing carries.
// This terminates because each round pushes the carry one bit higher.

/**
 * @param {number} a
 * @param {number} b
 * @return {number}
 */
const getSum = (a, b) => {
  while (b !== 0) {
    const carry = (a & b) << 1;
    a = a ^ b;
    b = carry;
  }
  return a;
};

module.exports = { getSum };

if (require.main === module) {
  const assert = require('node:assert');
  assert.strictEqual(getSum(1, 2), 3);
  assert.strictEqual(getSum(2, 3), 5);
  assert.strictEqual(getSum(0, 0), 0);
  assert.strictEqual(getSum(-1, 1), 0); // two's complement handles negatives
  assert.strictEqual(getSum(-2, -3), -5);
  for (let t = 0; t < 500; t++) {
    const a = Math.floor(Math.random() * 20000) - 10000;
    const b = Math.floor(Math.random() * 20000) - 10000;
    assert.strictEqual(getSum(a, b), a + b);
  }
  console.log('371 ok');
}
