// 53. Maximum Subarray — Medium
// https://leetcode.com/problems/maximum-subarray/
// Pattern: Greedy (Kadane's algorithm)
// Time O(n) | Space O(1)
//
// Idea: a running sum that has gone negative is pure dead weight — any future subarray is
// better off starting fresh. That single insight is Kadane's algorithm.
// Seeding `best` with -Infinity (not 0) is what makes an all-negative array work.

/**
 * @param {number[]} nums
 * @return {number}
 */
const maxSubArray = (nums) => {
  let best = -Infinity;
  let running = 0;
  for (const n of nums) {
    running = Math.max(n, running + n); // start fresh, or extend
    best = Math.max(best, running);
  }
  return best;
};

module.exports = { maxSubArray };

if (require.main === module) {
  const assert = require('node:assert');
  assert.strictEqual(maxSubArray([-2, 1, -3, 4, -1, 2, 1, -5, 4]), 6);
  assert.strictEqual(maxSubArray([1]), 1);
  assert.strictEqual(maxSubArray([5, 4, -1, 7, 8]), 23);
  assert.strictEqual(maxSubArray([-3, -1, -2]), -1); // all negative: pick the least bad
  console.log('53 ok');
}
