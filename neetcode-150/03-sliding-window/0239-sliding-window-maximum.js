// 239. Sliding Window Maximum — Hard
// https://leetcode.com/problems/sliding-window-maximum/
// Pattern: Sliding Window (monotonic deque)
// Time O(n) | Space O(k)
//
// Idea: keep a deque of indices whose values decrease. A new value evicts every smaller
// value behind it — those can never be the max again while the new one is in the window.
// The front is therefore always the current maximum.

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
const maxSlidingWindow = (nums, k) => {
  const deque = []; // indices, values strictly decreasing
  const out = [];

  for (let i = 0; i < nums.length; i++) {
    while (deque.length && nums[deque.at(-1)] <= nums[i]) deque.pop();
    deque.push(i);
    if (deque[0] <= i - k) deque.shift(); // front slid out of the window
    if (i >= k - 1) out.push(nums[deque[0]]);
  }
  return out;
};

module.exports = { maxSlidingWindow };

if (require.main === module) {
  const assert = require('node:assert');
  assert.deepStrictEqual(maxSlidingWindow([1, 3, -1, -3, 5, 3, 6, 7], 3), [3, 3, 5, 5, 6, 7]);
  assert.deepStrictEqual(maxSlidingWindow([1], 1), [1]);
  assert.deepStrictEqual(maxSlidingWindow([7, 2, 4], 2), [7, 4]);
  assert.deepStrictEqual(maxSlidingWindow([1, -1], 1), [1, -1]);
  console.log('239 ok');
}
