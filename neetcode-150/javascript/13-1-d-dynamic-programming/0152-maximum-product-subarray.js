// 152. Maximum Product Subarray — Medium
// https://leetcode.com/problems/maximum-product-subarray/
// Pattern: 1-D DP
// Time O(n) | Space O(1)
//
// Idea: Kadane's, except a negative number flips the ranking — so the *smallest* product so
// far can become the largest. Track both, and swap them when the current value is negative.
// A zero resets both, which falls out of the Math.max/min against `n` itself.

/**
 * @param {number[]} nums
 * @return {number}
 */
const maxProduct = (nums) => {
  if (!nums.length) return 0;
  let maxHere = nums[0];
  let minHere = nums[0];
  let best = nums[0];

  for (let i = 1; i < nums.length; i++) {
    const n = nums[i];
    if (n < 0) [maxHere, minHere] = [minHere, maxHere];
    maxHere = Math.max(n, maxHere * n);
    minHere = Math.min(n, minHere * n);
    best = Math.max(best, maxHere);
  }
  return best;
};

module.exports = { maxProduct };

if (require.main === module) {
  const assert = require('node:assert');
  assert.strictEqual(maxProduct([2, 3, -2, 4]), 6);
  assert.strictEqual(maxProduct([-2, 0, -1]), 0);
  assert.strictEqual(maxProduct([-2, 3, -4]), 24); // two negatives make a positive
  assert.strictEqual(maxProduct([-2]), -2);
  assert.strictEqual(maxProduct([0, 2]), 2);
  console.log('152 ok');
}
