// 190. Reverse Bits — Easy
// https://leetcode.com/problems/reverse-bits/
// Pattern: Bit Manipulation
// Time O(1) — always 32 iterations | Space O(1)
//
// Idea: shift bits off the bottom of the input and onto the bottom of a result that is
// itself shifting left. Exactly 32 rounds, including leading zeros.
// JavaScript's bitwise operators produce SIGNED 32-bit integers, so the final `>>> 0`
// reinterprets the result as unsigned — without it, answers with the top bit set come back
// negative.

/**
 * @param {number} n
 * @return {number}
 */
const reverseBits = (n) => {
  let result = 0;
  for (let i = 0; i < 32; i++) {
    result = (result << 1) | (n & 1);
    n >>>= 1;
  }
  return result >>> 0;
};

module.exports = { reverseBits };

if (require.main === module) {
  const assert = require('node:assert');
  assert.strictEqual(reverseBits(43261596), 964176192);
  assert.strictEqual(reverseBits(4294967293), 3221225471);
  assert.strictEqual(reverseBits(0), 0);
  assert.strictEqual(reverseBits(1), 2147483648); // must stay unsigned
  // Reversing twice is the identity.
  for (const x of [0, 1, 12345, 4294967295]) assert.strictEqual(reverseBits(reverseBits(x)), x);
  console.log('190 ok');
}
