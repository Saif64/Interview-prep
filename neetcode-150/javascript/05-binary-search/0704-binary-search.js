// 704. Binary Search — Easy
// https://leetcode.com/problems/binary-search/
// Pattern: Binary Search
// Time O(log n) | Space O(1)
//
// The template every other problem in this folder is a variation of. Two details worth
// being deliberate about: `lo <= hi` with `hi = length - 1` (an inclusive range), and
// `(lo + hi) >> 1` rather than `(lo + hi) / 2` to avoid overflow in languages where that
// is a real concern.

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
    if (nums[mid] < target) lo = mid + 1;
    else hi = mid - 1;
  }
  return -1;
};

module.exports = { search };

if (require.main === module) {
  const assert = require('node:assert');
  assert.strictEqual(search([-1, 0, 3, 5, 9, 12], 9), 4);
  assert.strictEqual(search([-1, 0, 3, 5, 9, 12], 2), -1);
  assert.strictEqual(search([], 1), -1);
  assert.strictEqual(search([5], 5), 0);
  console.log('704 ok');
}
