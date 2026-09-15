// 78. Subsets — Medium
// https://leetcode.com/problems/subsets/
// Pattern: Backtracking
// Time O(n * 2^n) | Space O(n)
//
// Idea: every element is either in or out — a binary choice per element, 2^n leaves.
// Unlike permutations there is no "complete" condition: every node of the tree is a valid
// answer, which is why the push happens on entry rather than at a base case.

/**
 * @param {number[]} nums
 * @return {number[][]}
 */
const subsets = (nums) => {
  const out = [];
  const current = [];

  const build = (start) => {
    out.push([...current]);
    for (let i = start; i < nums.length; i++) {
      current.push(nums[i]);
      build(i + 1);
      current.pop();
    }
  };

  build(0);
  return out;
};

module.exports = { subsets };

if (require.main === module) {
  const assert = require('node:assert');
  const { sorted } = require('../_lib');
  assert.deepStrictEqual(
    sorted(subsets([1, 2, 3])),
    sorted([[], [1], [2], [1, 2], [3], [1, 3], [2, 3], [1, 2, 3]])
  );
  assert.deepStrictEqual(sorted(subsets([0])), sorted([[], [0]]));
  assert.strictEqual(subsets([1, 2, 3, 4, 5]).length, 32);
  assert.deepStrictEqual(subsets([]), [[]]);
  console.log('78 ok');
}
