// 217. Contains Duplicate — Easy
// https://leetcode.com/problems/contains-duplicate/
// Pattern: Arrays & Hashing
// Time O(n) | Space O(n)
//
// Idea: a Set drops duplicates, so a size mismatch means there was at least one.
// If the interviewer asks for O(1) space, sort first and compare neighbours — O(n log n).

/**
 * @param {number[]} nums
 * @return {boolean}
 */
const containsDuplicate = (nums) => new Set(nums).size !== nums.length;

module.exports = { containsDuplicate };

if (require.main === module) {
  const assert = require('node:assert');
  assert.strictEqual(containsDuplicate([1, 2, 3, 1]), true);
  assert.strictEqual(containsDuplicate([1, 2, 3, 4]), false);
  assert.strictEqual(containsDuplicate([]), false);
  console.log('217 ok');
}
