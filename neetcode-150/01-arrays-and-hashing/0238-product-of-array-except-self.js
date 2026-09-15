// 238. Product of Array Except Self — Medium
// https://leetcode.com/problems/product-of-array-except-self/
// Pattern: Arrays & Hashing
// Time O(n) | Space O(1) extra (the output array does not count)
//
// Idea: the answer at i is (everything left of i) * (everything right of i).
// Two sweeps carry those running products, so division is never needed — which matters
// because the problem forbids it and because a single zero would break the division trick.

/**
 * @param {number[]} nums
 * @return {number[]}
 */
const productExceptSelf = (nums) => {
  const n = nums.length;
  const out = new Array(n).fill(1);

  let prefix = 1;
  for (let i = 0; i < n; i++) {
    out[i] = prefix;
    prefix *= nums[i];
  }

  let suffix = 1;
  for (let i = n - 1; i >= 0; i--) {
    out[i] *= suffix;
    suffix *= nums[i];
  }
  return out;
};

module.exports = { productExceptSelf };

if (require.main === module) {
  const assert = require('node:assert');
  // `v + 0` normalises -0 to 0: multiplying past a zero can produce -0, which is a
  // correct answer but not deepStrictEqual to 0.
  const run = (nums) => productExceptSelf(nums).map((v) => v + 0);
  assert.deepStrictEqual(run([1, 2, 3, 4]), [24, 12, 8, 6]);
  assert.deepStrictEqual(run([-1, 1, 0, -3, 3]), [0, 0, 9, 0, 0]);
  assert.deepStrictEqual(run([0, 0]), [0, 0]);
  console.log('238 ok');
}
