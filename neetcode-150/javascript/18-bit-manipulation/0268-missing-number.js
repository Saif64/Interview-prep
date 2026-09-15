// 268. Missing Number — Easy
// https://leetcode.com/problems/missing-number/
// Pattern: Bit Manipulation
// Time O(n) | Space O(1)
//
// Idea: XOR every index 0..n together with every value. Each present number cancels with its
// index, leaving only the missing one.
// The Gauss-sum solution (n(n+1)/2 minus the actual sum) is equally valid and often the
// first one mentioned — XOR has the edge that it cannot overflow.

/**
 * @param {number[]} nums
 * @return {number}
 */
const missingNumber = (nums) => {
  let result = nums.length;
  for (let i = 0; i < nums.length; i++) result ^= i ^ nums[i];
  return result;
};

module.exports = { missingNumber };

if (require.main === module) {
  const assert = require('node:assert');
  assert.strictEqual(missingNumber([3, 0, 1]), 2);
  assert.strictEqual(missingNumber([0, 1]), 2); // missing the largest
  assert.strictEqual(missingNumber([9, 6, 4, 2, 3, 5, 7, 0, 1]), 8);
  assert.strictEqual(missingNumber([1]), 0); // missing zero
  assert.strictEqual(missingNumber([0]), 1);
  console.log('268 ok');
}
