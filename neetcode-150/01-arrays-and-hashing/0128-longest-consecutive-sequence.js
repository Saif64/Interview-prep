// 128. Longest Consecutive Sequence — Medium
// https://leetcode.com/problems/longest-consecutive-sequence/
// Pattern: Arrays & Hashing
// Time O(n) | Space O(n)
//
// Idea: put everything in a set, then only start counting from a number that has no
// left neighbour. That guard is what keeps this linear — without it you rewalk runs.

/**
 * @param {number[]} nums
 * @return {number}
 */
const longestConsecutive = (nums) => {
  const set = new Set(nums);
  let best = 0;
  for (const n of set) {
    if (set.has(n - 1)) continue; // not the start of a run
    let length = 1;
    while (set.has(n + length)) length++;
    best = Math.max(best, length);
  }
  return best;
};

module.exports = { longestConsecutive };

if (require.main === module) {
  const assert = require('node:assert');
  assert.strictEqual(longestConsecutive([100, 4, 200, 1, 3, 2]), 4);
  assert.strictEqual(longestConsecutive([0, 3, 7, 2, 5, 8, 4, 6, 0, 1]), 9);
  assert.strictEqual(longestConsecutive([]), 0);
  assert.strictEqual(longestConsecutive([5, 5, 5]), 1);
  console.log('128 ok');
}
