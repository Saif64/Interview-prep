// 198. House Robber — Medium
// https://leetcode.com/problems/house-robber/
// Pattern: 1-D DP
// Time O(n) | Space O(1)
//
// Idea: at each house, either rob it (and add the best from two houses back) or skip it
// (and keep the best from one house back). The "cannot take adjacent" constraint is the
// entire problem, and this recurrence is the canonical answer to it.

/**
 * @param {number[]} nums
 * @return {number}
 */
const rob = (nums) => {
  let twoBack = 0;
  let oneBack = 0;
  for (const amount of nums) {
    const current = Math.max(oneBack, twoBack + amount);
    twoBack = oneBack;
    oneBack = current;
  }
  return oneBack;
};

module.exports = { rob };

if (require.main === module) {
  const assert = require('node:assert');
  assert.strictEqual(rob([1, 2, 3, 1]), 4);
  assert.strictEqual(rob([2, 7, 9, 3, 1]), 12);
  assert.strictEqual(rob([]), 0);
  assert.strictEqual(rob([5]), 5);
  assert.strictEqual(rob([2, 1, 1, 2]), 4); // skipping two in a row can be right
  console.log('198 ok');
}
