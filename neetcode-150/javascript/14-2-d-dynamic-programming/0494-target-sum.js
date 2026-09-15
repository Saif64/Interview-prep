// 494. Target Sum — Medium
// https://leetcode.com/problems/target-sum/
// Pattern: 2-D DP
// Time O(n * sum) | Space O(sum)
//
// Idea: every number gets a + or a -, so there are 2^n assignments. Instead of enumerating
// them, carry a map from "running sum" -> "how many ways to reach it". Distinct assignments
// collapse onto the same sum, which is exactly the saving DP provides here.

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
const findTargetSumWays = (nums, target) => {
  let ways = new Map([[0, 1]]);

  for (const n of nums) {
    const next = new Map();
    for (const [sum, count] of ways) {
      next.set(sum + n, (next.get(sum + n) ?? 0) + count);
      next.set(sum - n, (next.get(sum - n) ?? 0) + count);
    }
    ways = next;
  }
  return ways.get(target) ?? 0;
};

module.exports = { findTargetSumWays };

if (require.main === module) {
  const assert = require('node:assert');
  assert.strictEqual(findTargetSumWays([1, 1, 1, 1, 1], 3), 5);
  assert.strictEqual(findTargetSumWays([1], 1), 1);
  assert.strictEqual(findTargetSumWays([1], 2), 0);
  assert.strictEqual(findTargetSumWays([0, 0], 0), 4); // +0/-0 count as distinct assignments
  assert.strictEqual(findTargetSumWays([1, 2, 1], 0), 2);
  console.log('494 ok');
}
