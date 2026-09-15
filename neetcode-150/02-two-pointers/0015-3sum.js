// 15. 3Sum — Medium
// https://leetcode.com/problems/3sum/
// Pattern: Two Pointers
// Time O(n^2) | Space O(1) extra (ignoring the output and the sort)
//
// Idea: sort, then fix the first number and run Two Sum II on the rest.
// Deduping is the part people get wrong: skip a repeated anchor, and after recording a
// triplet skip repeated values on both pointers.

/**
 * @param {number[]} nums
 * @return {number[][]}
 */
const threeSum = (nums) => {
  const sorted = [...nums].sort((a, b) => a - b);
  const out = [];

  for (let i = 0; i < sorted.length - 2; i++) {
    if (sorted[i] > 0) break; // everything after is positive, sum can't reach 0
    if (i > 0 && sorted[i] === sorted[i - 1]) continue; // duplicate anchor

    let left = i + 1;
    let right = sorted.length - 1;
    while (left < right) {
      const sum = sorted[i] + sorted[left] + sorted[right];
      if (sum < 0) left++;
      else if (sum > 0) right--;
      else {
        out.push([sorted[i], sorted[left], sorted[right]]);
        left++;
        right--;
        while (left < right && sorted[left] === sorted[left - 1]) left++;
        while (left < right && sorted[right] === sorted[right + 1]) right--;
      }
    }
  }
  return out;
};

module.exports = { threeSum };

if (require.main === module) {
  const assert = require('node:assert');
  const { sorted: bag } = require('../_lib');
  assert.deepStrictEqual(bag(threeSum([-1, 0, 1, 2, -1, -4])), bag([[-1, -1, 2], [-1, 0, 1]]));
  assert.deepStrictEqual(threeSum([0, 1, 1]), []);
  assert.deepStrictEqual(threeSum([0, 0, 0]), [[0, 0, 0]]);
  assert.deepStrictEqual(threeSum([0, 0, 0, 0]), [[0, 0, 0]]); // dedupe survives extra zeros
  console.log('15 ok');
}
