// 39. Combination Sum — Medium
// https://leetcode.com/problems/combination-sum/
// Pattern: Backtracking
// Time O(2^(target/min)) | Space O(target/min)
//
// Idea: at each step either use the current candidate again (numbers may repeat) or move
// past it forever. Passing `start` rather than restarting from 0 is what stops [2,3] and
// [3,2] both appearing.

/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
const combinationSum = (candidates, target) => {
  const out = [];
  const current = [];

  const build = (start, remaining) => {
    if (remaining === 0) {
      out.push([...current]);
      return;
    }
    if (remaining < 0) return;
    for (let i = start; i < candidates.length; i++) {
      current.push(candidates[i]);
      build(i, remaining - candidates[i]); // i, not i + 1: reuse is allowed
      current.pop();
    }
  };

  build(0, target);
  return out;
};

module.exports = { combinationSum };

if (require.main === module) {
  const assert = require('node:assert');
  const { sorted } = require('../_lib');
  assert.deepStrictEqual(sorted(combinationSum([2, 3, 6, 7], 7)), sorted([[2, 2, 3], [7]]));
  assert.deepStrictEqual(sorted(combinationSum([2, 3, 5], 8)), sorted([[2, 2, 2, 2], [2, 3, 3], [3, 5]]));
  assert.deepStrictEqual(combinationSum([2], 1), []);
  assert.deepStrictEqual(combinationSum([7], 7), [[7]]);
  console.log('39 ok');
}
