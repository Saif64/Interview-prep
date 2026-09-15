// 746. Min Cost Climbing Stairs — Easy
// https://leetcode.com/problems/min-cost-climbing-stairs/
// Pattern: 1-D DP
// Time O(n) | Space O(1)
//
// Idea: climbing stairs with weights. cost to stand on step i = cost[i] + min(reaching i-1,
// i-2). You may start at index 0 or 1, and the "top" is one past the last step.

/**
 * @param {number[]} cost
 * @return {number}
 */
const minCostClimbingStairs = (cost) => {
  let twoBack = 0;
  let oneBack = 0;
  for (let i = 2; i <= cost.length; i++) {
    const current = Math.min(oneBack + cost[i - 1], twoBack + cost[i - 2]);
    twoBack = oneBack;
    oneBack = current;
  }
  return oneBack;
};

module.exports = { minCostClimbingStairs };

if (require.main === module) {
  const assert = require('node:assert');
  assert.strictEqual(minCostClimbingStairs([10, 15, 20]), 15);
  assert.strictEqual(minCostClimbingStairs([1, 100, 1, 1, 1, 100, 1, 1, 100, 1]), 6);
  assert.strictEqual(minCostClimbingStairs([0, 0]), 0);
  assert.strictEqual(minCostClimbingStairs([5, 5]), 5); // start at the cheaper of the two
  console.log('746 ok');
}
