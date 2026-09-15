// 11. Container With Most Water — Medium
// https://leetcode.com/problems/container-with-most-water/
// Pattern: Two Pointers
// Time O(n) | Space O(1)
//
// Idea: start at the widest pair and always move the shorter wall inward.
// Moving the taller wall can only shrink the width while the height stays capped by the
// shorter wall, so it can never improve the area — that's why the greedy step is safe.

/**
 * @param {number[]} height
 * @return {number}
 */
const maxArea = (height) => {
  let left = 0;
  let right = height.length - 1;
  let best = 0;
  while (left < right) {
    best = Math.max(best, (right - left) * Math.min(height[left], height[right]));
    if (height[left] < height[right]) left++;
    else right--;
  }
  return best;
};

module.exports = { maxArea };

if (require.main === module) {
  const assert = require('node:assert');
  assert.strictEqual(maxArea([1, 8, 6, 2, 5, 4, 8, 3, 7]), 49);
  assert.strictEqual(maxArea([1, 1]), 1);
  assert.strictEqual(maxArea([1, 2, 1]), 2);
  console.log('11 ok');
}
