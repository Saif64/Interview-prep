// 33. Search in Rotated Sorted Array — Medium
// https://leetcode.com/problems/search-in-rotated-sorted-array/
// Pattern: Binary Search
// Time O(log n) | Space O(1)
//
// Idea: after a rotation at least one half of any slice is still sorted. Work out which
// half that is, check whether the target falls inside its known range, and discard the
// other half.

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
const search = (nums, target) => {
  let lo = 0;
  let hi = nums.length - 1;
  while (lo <= hi) {
    const mid = (lo + hi) >> 1;
    if (nums[mid] === target) return mid;

    if (nums[lo] <= nums[mid]) {
      // left half is sorted
      if (target >= nums[lo] && target < nums[mid]) hi = mid - 1;
      else lo = mid + 1;
    } else {
      // right half is sorted
      if (target > nums[mid] && target <= nums[hi]) lo = mid + 1;
      else hi = mid - 1;
    }
  }
  return -1;
};

module.exports = { search };

if (require.main === module) {
  const assert = require('node:assert');
  assert.strictEqual(search([4, 5, 6, 7, 0, 1, 2], 0), 4);
  assert.strictEqual(search([4, 5, 6, 7, 0, 1, 2], 3), -1);
  assert.strictEqual(search([1], 0), -1);
  assert.strictEqual(search([1, 3], 3), 1);
  assert.strictEqual(search([3, 1], 1), 1); // rotation point right next to lo
  console.log('33 ok');
}
