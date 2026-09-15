// 191. Number of 1 Bits — Easy
// https://leetcode.com/problems/number-of-1-bits/
// Pattern: Bit Manipulation
// Time O(number of set bits) | Space O(1)
//
// Idea: `n & (n - 1)` clears the lowest set bit. Looping until zero therefore runs once per
// set bit rather than 32 times — Brian Kernighan's trick, and a genuinely useful one to know.

/**
 * @param {number} n
 * @return {number}
 */
const hammingWeight = (n) => {
  let count = 0;
  while (n !== 0) {
    n &= n - 1;
    count++;
  }
  return count;
};

module.exports = { hammingWeight };

if (require.main === module) {
  const assert = require('node:assert');
  assert.strictEqual(hammingWeight(11), 3); // 1011
  assert.strictEqual(hammingWeight(128), 1);
  assert.strictEqual(hammingWeight(0), 0);
  assert.strictEqual(hammingWeight(2147483647), 31); // all 31 low bits set
  console.log('191 ok');
}
