// 42. Trapping Rain Water — Hard
// https://leetcode.com/problems/trapping-rain-water/
// Pattern: Two Pointers
// Time O(n) | Space O(1)
//
// Idea: water above a bar = min(tallest on the left, tallest on the right) - its height.
// Walking inward from both ends, whichever side is currently shorter is the side whose
// answer is already decided, so it can be resolved and stepped past.

/**
 * @param {number[]} height
 * @return {number}
 */
const trap = (height) => {
  if (height.length < 3) return 0;
  let left = 0;
  let right = height.length - 1;
  let maxLeft = height[left];
  let maxRight = height[right];
  let water = 0;

  while (left < right) {
    if (maxLeft <= maxRight) {
      left++;
      maxLeft = Math.max(maxLeft, height[left]);
      water += maxLeft - height[left];
    } else {
      right--;
      maxRight = Math.max(maxRight, height[right]);
      water += maxRight - height[right];
    }
  }
  return water;
};

module.exports = { trap };

if (require.main === module) {
  const assert = require('node:assert');
  assert.strictEqual(trap([0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]), 6);
  assert.strictEqual(trap([4, 2, 0, 3, 2, 5]), 9);
  assert.strictEqual(trap([]), 0);
  assert.strictEqual(trap([3, 2, 1]), 0); // monotonic, nothing is trapped
  console.log('42 ok');
}
