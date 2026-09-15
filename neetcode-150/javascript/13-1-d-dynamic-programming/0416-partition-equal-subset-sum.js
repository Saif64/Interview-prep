// 416. Partition Equal Subset Sum — Medium
// https://leetcode.com/problems/partition-equal-subset-sum/
// Pattern: 1-D DP (0/1 knapsack)
// Time O(n * sum) | Space O(sum)
//
// Idea: two equal halves means finding a subset summing to total / 2 — a 0/1 knapsack
// feasibility question. An odd total is impossible, which is the cheap early exit.
// The inner loop counts DOWNWARD: going upward would let one number be used twice, quietly
// turning this into the unbounded knapsack.

/**
 * @param {number[]} nums
 * @return {boolean}
 */
const canPartition = (nums) => {
  const total = nums.reduce((a, b) => a + b, 0);
  if (total % 2) return false;
  const target = total / 2;

  const reachable = new Array(target + 1).fill(false);
  reachable[0] = true;

  for (const n of nums) {
    for (let sum = target; sum >= n; sum--) {
      if (reachable[sum - n]) reachable[sum] = true;
    }
  }
  return reachable[target];
};

module.exports = { canPartition };

if (require.main === module) {
  const assert = require('node:assert');
  assert.strictEqual(canPartition([1, 5, 11, 5]), true); // [1,5,5] and [11]
  assert.strictEqual(canPartition([1, 2, 3, 5]), false);
  assert.strictEqual(canPartition([1, 1]), true);
  assert.strictEqual(canPartition([1]), false);
  assert.strictEqual(canPartition([2, 2, 3, 5]), false);
  assert.strictEqual(canPartition([3, 3]), true);
  console.log('416 ok');
}
