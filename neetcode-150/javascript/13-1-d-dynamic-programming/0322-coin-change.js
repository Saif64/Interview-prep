// 322. Coin Change — Medium
// https://leetcode.com/problems/coin-change/
// Pattern: 1-D DP (unbounded knapsack)
// Time O(amount * coins) | Space O(amount)
//
// Idea: dp[a] = fewest coins summing to a. Build upward: dp[a] = 1 + min(dp[a - coin]).
// Greedy (largest coin first) is wrong — coins [1,3,4] and amount 6 gives 4+1+1 = 3 coins
// greedily but 3+3 = 2 is optimal. That counterexample is worth having ready.

/**
 * @param {number[]} coins
 * @param {number} amount
 * @return {number} fewest coins, or -1 if unreachable
 */
const coinChange = (coins, amount) => {
  const dp = new Array(amount + 1).fill(Infinity);
  dp[0] = 0;

  for (let a = 1; a <= amount; a++) {
    for (const coin of coins) {
      if (coin <= a) dp[a] = Math.min(dp[a], dp[a - coin] + 1);
    }
  }
  return dp[amount] === Infinity ? -1 : dp[amount];
};

module.exports = { coinChange };

if (require.main === module) {
  const assert = require('node:assert');
  assert.strictEqual(coinChange([1, 2, 5], 11), 3);
  assert.strictEqual(coinChange([2], 3), -1);
  assert.strictEqual(coinChange([1], 0), 0);
  assert.strictEqual(coinChange([1, 3, 4], 6), 2); // the greedy counterexample
  assert.strictEqual(coinChange([], 5), -1);
  console.log('322 ok');
}
