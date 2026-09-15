// 312. Burst Balloons — Hard
// https://leetcode.com/problems/burst-balloons/
// Pattern: 2-D DP (interval DP)
// Time O(n^3) | Space O(n^2)
//
// Idea: the inversion that makes this solvable — ask which balloon is burst LAST in an
// interval, not first. If i is last, its neighbours are the interval's boundaries (which are
// still intact), so the subproblems on either side become independent.
// Padding with 1s at both ends removes all the edge handling.

/**
 * @param {number[]} nums
 * @return {number}
 */
const maxCoins = (nums) => {
  const balloons = [1, ...nums, 1];
  const n = balloons.length;
  const dp = Array.from({ length: n }, () => new Array(n).fill(0));

  // left and right are exclusive boundaries that are never burst within this subproblem.
  for (let length = 2; length < n; length++) {
    for (let left = 0; left + length < n; left++) {
      const right = left + length;
      for (let last = left + 1; last < right; last++) {
        dp[left][right] = Math.max(
          dp[left][right],
          dp[left][last] + balloons[left] * balloons[last] * balloons[right] + dp[last][right]
        );
      }
    }
  }
  return dp[0][n - 1];
};

module.exports = { maxCoins };

if (require.main === module) {
  const assert = require('node:assert');
  assert.strictEqual(maxCoins([3, 1, 5, 8]), 167);
  assert.strictEqual(maxCoins([1, 5]), 10);
  assert.strictEqual(maxCoins([5]), 5);
  assert.strictEqual(maxCoins([]), 0);
  assert.strictEqual(maxCoins([7, 9, 8, 0, 7, 1, 3, 5, 5, 2, 3]), 1654);
  console.log('312 ok');
}
