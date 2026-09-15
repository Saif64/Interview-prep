// 167. Two Sum II - Input Array Is Sorted — Medium
// https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/
// Pattern: Two Pointers
// Time O(n) | Space O(1)
//
// Idea: sortedness replaces the hash map. Sum too small -> only a bigger left can help;
// too large -> only a smaller right can. Answer is 1-indexed.

/**
 * @param {number[]} numbers
 * @param {number} target
 * @return {number[]}
 */
const twoSumSorted = (numbers, target) => {
  let left = 0;
  let right = numbers.length - 1;
  while (left < right) {
    const sum = numbers[left] + numbers[right];
    if (sum === target) return [left + 1, right + 1];
    if (sum < target) left++;
    else right--;
  }
  return [];
};

module.exports = { twoSumSorted };

if (require.main === module) {
  const assert = require('node:assert');
  assert.deepStrictEqual(twoSumSorted([2, 7, 11, 15], 9), [1, 2]);
  assert.deepStrictEqual(twoSumSorted([2, 3, 4], 6), [1, 3]);
  assert.deepStrictEqual(twoSumSorted([-1, 0], -1), [1, 2]);
  console.log('167 ok');
}
