// 338. Counting Bits — Easy
// https://leetcode.com/problems/counting-bits/
// Pattern: Bit Manipulation + DP
// Time O(n) | Space O(1) extra
//
// Idea: bits(i) = bits(i >> 1) + (i & 1). Dropping the lowest bit gives a number already
// computed, so each answer is O(1) — that is what beats the naive O(n log n) of counting
// every number's bits from scratch.

/**
 * @param {number} n
 * @return {number[]}
 */
const countBits = (n) => {
  const dp = new Array(n + 1).fill(0);
  for (let i = 1; i <= n; i++) dp[i] = dp[i >> 1] + (i & 1);
  return dp;
};

module.exports = { countBits };

if (require.main === module) {
  const assert = require('node:assert');
  assert.deepStrictEqual(countBits(2), [0, 1, 1]);
  assert.deepStrictEqual(countBits(5), [0, 1, 1, 2, 1, 2]);
  assert.deepStrictEqual(countBits(0), [0]);
  // Cross-check against the straightforward count.
  const naive = (x) => x.toString(2).split('').filter((c) => c === '1').length;
  const out = countBits(200);
  for (let i = 0; i <= 200; i++) assert.strictEqual(out[i], naive(i));
  console.log('338 ok');
}
