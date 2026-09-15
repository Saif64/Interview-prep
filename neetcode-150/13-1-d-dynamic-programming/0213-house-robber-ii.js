// 213. House Robber II — Medium
// https://leetcode.com/problems/house-robber-ii/
// Pattern: 1-D DP
// Time O(n) | Space O(1)
//
// Idea: the houses form a circle, so the first and last are now adjacent. You cannot rob
// both — so run House Robber twice, once excluding the last house and once excluding the
// first, and take the better. Reducing a new constraint to two runs of a solved problem is
// the move worth internalising.

const { rob: robLine } = require('./0198-house-robber');

/**
 * @param {number[]} nums
 * @return {number}
 */
const rob = (nums) => {
  if (nums.length === 1) return nums[0];
  return Math.max(robLine(nums.slice(0, -1)), robLine(nums.slice(1)));
};

module.exports = { rob };

if (require.main === module) {
  const assert = require('node:assert');
  assert.strictEqual(rob([2, 3, 2]), 3); // can't take both 2s
  assert.strictEqual(rob([1, 2, 3, 1]), 4);
  assert.strictEqual(rob([1, 2, 3]), 3);
  assert.strictEqual(rob([5]), 5);
  assert.strictEqual(rob([1, 2]), 2);
  console.log('213 ok');
}
