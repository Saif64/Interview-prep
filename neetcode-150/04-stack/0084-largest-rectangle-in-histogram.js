// 84. Largest Rectangle in Histogram — Hard
// https://leetcode.com/problems/largest-rectangle-in-histogram/
// Pattern: Stack (monotonic)
// Time O(n) | Space O(n)
//
// Idea: keep a stack of increasing bars. When a shorter bar arrives, every taller bar on
// the stack has just found its right boundary, so pop and settle it. The popped bar's left
// boundary is whatever is underneath it on the stack — which is why the stack stores the
// start index, not just the height.

/**
 * @param {number[]} heights
 * @return {number}
 */
const largestRectangleArea = (heights) => {
  const stack = []; // [startIndex, height], heights increasing
  let best = 0;

  for (let i = 0; i < heights.length; i++) {
    let start = i;
    while (stack.length && stack.at(-1)[1] > heights[i]) {
      const [index, height] = stack.pop();
      best = Math.max(best, height * (i - index));
      start = index; // current bar can extend back over everything it was taller than
    }
    stack.push([start, heights[i]]);
  }

  for (const [index, height] of stack) {
    best = Math.max(best, height * (heights.length - index));
  }
  return best;
};

module.exports = { largestRectangleArea };

if (require.main === module) {
  const assert = require('node:assert');
  assert.strictEqual(largestRectangleArea([2, 1, 5, 6, 2, 3]), 10);
  assert.strictEqual(largestRectangleArea([2, 4]), 4);
  assert.strictEqual(largestRectangleArea([]), 0);
  assert.strictEqual(largestRectangleArea([1, 1, 1, 1]), 4); // flat: whole width wins
  assert.strictEqual(largestRectangleArea([5, 4, 3, 2, 1]), 9);
  console.log('84 ok');
}
