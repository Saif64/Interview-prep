// 518. Coin Change II — Medium
// https://leetcode.com/problems/coin-change-ii/
// Pattern: 2-D DP (unbounded knapsack, counting)
// Time O(amount * coins) | Space O(amount)
//
// Idea: count COMBINATIONS, not permutations. Loop order is the whole answer:
// coins outside, amounts inside. That way each coin is fully considered before the next,
// so {1,2} is counted once instead of as both 1+2 and 2+1. Swapping the loops counts
// permutations — which is a different (also common) problem.

/**
 * @param {number} amount
 * @param {number[]} coins
 * @return {number}
 */
const change = (amount, coins) => {
  const dp = new Array(amount + 1).fill(0);
  dp[0] = 1;

  for (const coin of coins) {
    for (let a = coin; a <= amount; a++) dp[a] += dp[a - coin];
  }
  return dp[amount];
};

module.exports = { change };

if (require.main === module) {
  const assert = require('node:assert');
  assert.strictEqual(change(5, [1, 2, 5]), 4);
  assert.strictEqual(change(3, [2]), 0);
  assert.strictEqual(change(10, [10]), 1);
  assert.strictEqual(change(0, [1, 2]), 1); // exactly one way: take nothing
  assert.strictEqual(change(4, [1, 2, 3]), 4); // 1111, 112, 22, 13 — order-insensitive
  console.log('518 ok');
}
