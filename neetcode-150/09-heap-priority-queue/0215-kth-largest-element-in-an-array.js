// 215. Kth Largest Element in an Array — Medium
// https://leetcode.com/problems/kth-largest-element-in-an-array/
// Pattern: Heap
// Time O(n log k) | Space O(k)
//
// Idea: keep a min-heap of size k. The smallest thing in it is the kth largest overall,
// and anything smaller than that can be discarded immediately.
// Sorting is O(n log n); Quickselect averages O(n) but degrades to O(n^2) — say all three
// out loud and pick based on whether k is small.

const { Heap } = require('../_lib');

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
const findKthLargest = (nums, k) => {
  const heap = new Heap(); // min-heap
  for (const n of nums) {
    heap.push(n);
    if (heap.size > k) heap.pop();
  }
  return heap.peek();
};

module.exports = { findKthLargest };

if (require.main === module) {
  const assert = require('node:assert');
  assert.strictEqual(findKthLargest([3, 2, 1, 5, 6, 4], 2), 5);
  assert.strictEqual(findKthLargest([3, 2, 3, 1, 2, 4, 5, 5, 6], 4), 4);
  assert.strictEqual(findKthLargest([1], 1), 1);
  assert.strictEqual(findKthLargest([2, 2, 2], 2), 2); // duplicates count separately
  assert.strictEqual(findKthLargest([7, 6, 5, 4, 3, 2, 1], 7), 1);
  console.log('215 ok');
}
