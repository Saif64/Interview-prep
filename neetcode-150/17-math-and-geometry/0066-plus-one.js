// 66. Plus One — Easy
// https://leetcode.com/problems/plus-one/
// Pattern: Math & Geometry
// Time O(n) | Space O(1) — except for the all-nines case
//
// Idea: walk from the least significant digit. Anything below 9 just increments and the
// work is done; a 9 becomes 0 and carries. Falling out of the loop means every digit was a
// 9, and the result is 1 followed by zeros — one digit longer than the input.

/**
 * @param {number[]} digits
 * @return {number[]}
 */
const plusOne = (digits) => {
  for (let i = digits.length - 1; i >= 0; i--) {
    if (digits[i] < 9) {
      digits[i]++;
      return digits;
    }
    digits[i] = 0;
  }
  return [1, ...digits];
};

module.exports = { plusOne };

if (require.main === module) {
  const assert = require('node:assert');
  assert.deepStrictEqual(plusOne([1, 2, 3]), [1, 2, 4]);
  assert.deepStrictEqual(plusOne([4, 3, 2, 1]), [4, 3, 2, 2]);
  assert.deepStrictEqual(plusOne([9]), [1, 0]);
  assert.deepStrictEqual(plusOne([9, 9, 9]), [1, 0, 0, 0]);
  assert.deepStrictEqual(plusOne([1, 9]), [2, 0]);
  console.log('66 ok');
}
