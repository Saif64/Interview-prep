// 40. Combination Sum II — Medium
// https://leetcode.com/problems/combination-sum-ii/
// Pattern: Backtracking
// Time O(2^n) | Space O(n)
//
// Idea: each number may be used once, but the input contains duplicates, so the same
// multiset can be reached by different paths. Sort first, then skip a candidate that equals
// its predecessor *at the same recursion level* (`i > start`). Skipping whenever it equals
// the predecessor would wrongly forbid legitimately repeated values like [1,1,6].

/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
const combinationSum2 = (candidates, target) => {
  const sortedCandidates = [...candidates].sort((a, b) => a - b);
  const out = [];
  const current = [];

  const build = (start, remaining) => {
    if (remaining === 0) {
      out.push([...current]);
      return;
    }
    for (let i = start; i < sortedCandidates.length; i++) {
      if (sortedCandidates[i] > remaining) break; // sorted: everything after is worse
      if (i > start && sortedCandidates[i] === sortedCandidates[i - 1]) continue; // duplicate branch
      current.push(sortedCandidates[i]);
      build(i + 1, remaining - sortedCandidates[i]);
      current.pop();
    }
  };

  build(0, target);
  return out;
};

module.exports = { combinationSum2 };

if (require.main === module) {
  const assert = require('node:assert');
  const { sorted } = require('../_lib');
  assert.deepStrictEqual(
    sorted(combinationSum2([10, 1, 2, 7, 6, 1, 5], 8)),
    sorted([[1, 1, 6], [1, 2, 5], [1, 7], [2, 6]])
  );
  assert.deepStrictEqual(sorted(combinationSum2([2, 5, 2, 1, 2], 5)), sorted([[1, 2, 2], [5]]));
  assert.deepStrictEqual(combinationSum2([1], 2), []);
  console.log('40 ok');
}
