// 46. Permutations — Medium
// https://leetcode.com/problems/permutations/
// Pattern: Backtracking
// Time O(n * n!) | Space O(n)
//
// Idea: pick an unused element at each depth, recurse, then un-pick.
// The `used` array is the cheapest way to track availability; swapping elements in place is
// the alternative and uses no extra array.

/**
 * @param {number[]} nums
 * @return {number[][]}
 */
const permute = (nums) => {
  const out = [];
  const current = [];
  const used = new Array(nums.length).fill(false);

  const build = () => {
    if (current.length === nums.length) {
      out.push([...current]);
      return;
    }
    for (let i = 0; i < nums.length; i++) {
      if (used[i]) continue;
      used[i] = true;
      current.push(nums[i]);
      build();
      current.pop();
      used[i] = false;
    }
  };

  build();
  return out;
};

module.exports = { permute };

if (require.main === module) {
  const assert = require('node:assert');
  assert.strictEqual(permute([1, 2, 3]).length, 6);
  assert.deepStrictEqual(permute([1]), [[1]]);
  assert.strictEqual(permute([1, 2, 3, 4]).length, 24);
  // Every permutation is distinct and uses every element.
  const all = permute([1, 2, 3]).map((p) => p.join(''));
  assert.strictEqual(new Set(all).size, 6);
  assert.ok(all.includes('321'));
  console.log('46 ok');
}
