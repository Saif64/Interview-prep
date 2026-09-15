// 90. Subsets II — Medium
// https://leetcode.com/problems/subsets-ii/
// Pattern: Backtracking
// Time O(n * 2^n) | Space O(n)
//
// Idea: problem 78 plus the duplicate guard from problem 40 — sort, then at each level skip
// a value identical to the one just tried. Same one-line fix, and it is worth recognising
// that "sort + skip equal siblings" is the standard answer whenever the input may repeat.

/**
 * @param {number[]} nums
 * @return {number[][]}
 */
const subsetsWithDup = (nums) => {
  const sortedNums = [...nums].sort((a, b) => a - b);
  const out = [];
  const current = [];

  const build = (start) => {
    out.push([...current]);
    for (let i = start; i < sortedNums.length; i++) {
      if (i > start && sortedNums[i] === sortedNums[i - 1]) continue;
      current.push(sortedNums[i]);
      build(i + 1);
      current.pop();
    }
  };

  build(0);
  return out;
};

module.exports = { subsetsWithDup };

if (require.main === module) {
  const assert = require('node:assert');
  const { sorted } = require('../_lib');
  assert.deepStrictEqual(sorted(subsetsWithDup([1, 2, 2])), sorted([[], [1], [1, 2], [1, 2, 2], [2], [2, 2]]));
  assert.deepStrictEqual(sorted(subsetsWithDup([0])), sorted([[], [0]]));
  assert.strictEqual(subsetsWithDup([1, 1, 1]).length, 4); // [], [1], [1,1], [1,1,1]
  assert.strictEqual(subsetsWithDup([4, 4, 4, 1, 4]).length, 10);
  console.log('90 ok');
}
