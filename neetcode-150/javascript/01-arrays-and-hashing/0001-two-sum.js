// 1. Two Sum — Easy
// https://leetcode.com/problems/two-sum/
// Pattern: Arrays & Hashing
// Time O(n) | Space O(n)
//
// Idea: one pass. For each number, ask the map whether its complement was already seen.
// The brute-force O(n^2) double loop is the thing an interviewer expects you to improve on.

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
const twoSum = (nums, target) => {
  const seen = new Map(); // value -> index
  for (let i = 0; i < nums.length; i++) {
    const need = target - nums[i];
    if (seen.has(need)) return [seen.get(need), i];
    seen.set(nums[i], i);
  }
  return [];
};

module.exports = { twoSum };

if (require.main === module) {
  const assert = require('node:assert');
  assert.deepStrictEqual(twoSum([2, 7, 11, 15], 9), [0, 1]);
  assert.deepStrictEqual(twoSum([3, 2, 4], 6), [1, 2]);
  assert.deepStrictEqual(twoSum([3, 3], 6), [0, 1]);
  assert.deepStrictEqual(twoSum([1, 2], 99), []);
  console.log('1 ok');
}
