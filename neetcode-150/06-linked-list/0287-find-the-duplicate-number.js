// 287. Find the Duplicate Number — Medium
// https://leetcode.com/problems/find-the-duplicate-number/
// Pattern: Linked List (Floyd's cycle detection on an implicit list)
// Time O(n) | Space O(1), and the input is never modified
//
// Idea: treat i -> nums[i] as a linked list. Values are in [1, n] over n+1 slots, so some
// index is pointed at twice — that is a cycle entrance, and the duplicate. Phase one finds
// a meeting point inside the cycle; phase two walks from the start and from the meeting
// point at the same speed, and they meet exactly at the entrance.

/**
 * @param {number[]} nums
 * @return {number}
 */
const findDuplicate = (nums) => {
  let slow = 0;
  let fast = 0;
  do {
    slow = nums[slow];
    fast = nums[nums[fast]];
  } while (slow !== fast);

  let finder = 0;
  while (finder !== slow) {
    finder = nums[finder];
    slow = nums[slow];
  }
  return finder;
};

module.exports = { findDuplicate };

if (require.main === module) {
  const assert = require('node:assert');
  assert.strictEqual(findDuplicate([1, 3, 4, 2, 2]), 2);
  assert.strictEqual(findDuplicate([3, 1, 3, 4, 2]), 3);
  assert.strictEqual(findDuplicate([1, 1]), 1);
  assert.strictEqual(findDuplicate([2, 2, 2, 2, 2]), 2); // many copies
  assert.strictEqual(findDuplicate([1, 4, 4, 2, 4]), 4);
  console.log('287 ok');
}
