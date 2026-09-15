// 136. Single Number — Easy
// https://leetcode.com/problems/single-number/
// Pattern: Bit Manipulation
// Time O(n) | Space O(1)
//
// Idea: XOR cancels equal values (x ^ x === 0) and ignores zero (x ^ 0 === x), so XOR-ing
// everything leaves exactly the unpaired number. Order does not matter — XOR is commutative
// and associative, which is what makes this work on an unsorted array in one pass.

/**
 * @param {number[]} nums
 * @return {number}
 */
const singleNumber = (nums) => nums.reduce((acc, n) => acc ^ n, 0);

module.exports = { singleNumber };

if (require.main === module) {
  const assert = require('node:assert');
  assert.strictEqual(singleNumber([2, 2, 1]), 1);
  assert.strictEqual(singleNumber([4, 1, 2, 1, 2]), 4);
  assert.strictEqual(singleNumber([1]), 1);
  assert.strictEqual(singleNumber([-1, -1, -3]), -3); // negatives XOR fine
  console.log('136 ok');
}
