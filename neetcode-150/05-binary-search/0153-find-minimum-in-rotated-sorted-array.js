// 153. Find Minimum in Rotated Sorted Array — Medium
// https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/
// Pattern: Binary Search
// Time O(log n) | Space O(1)
//
// Idea: compare mid against the *right* end, not the left. If nums[mid] > nums[hi] the
// rotation point is strictly right of mid; otherwise mid could itself be the minimum,
// so hi = mid (not mid - 1). Comparing against lo instead breaks on a non-rotated array.

/**
 * @param {number[]} nums
 * @return {number}
 */
const findMin = (nums) => {
  let lo = 0;
  let hi = nums.length - 1;
  while (lo < hi) {
    const mid = (lo + hi) >> 1;
    if (nums[mid] > nums[hi]) lo = mid + 1;
    else hi = mid;
  }
  return nums[lo];
};

module.exports = { findMin };

if (require.main === module) {
  const assert = require('node:assert');
  assert.strictEqual(findMin([3, 4, 5, 1, 2]), 1);
  assert.strictEqual(findMin([4, 5, 6, 7, 0, 1, 2]), 0);
  assert.strictEqual(findMin([11, 13, 15, 17]), 11); // not rotated at all
  assert.strictEqual(findMin([2, 1]), 1);
  assert.strictEqual(findMin([1]), 1);
  console.log('153 ok');
}
