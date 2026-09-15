// 55. Jump Game — Medium
// https://leetcode.com/problems/jump-game/
// Pattern: Greedy
// Time O(n) | Space O(1)
//
// Idea: track the furthest index reachable so far. If the loop ever stands on an index
// beyond that reach, there is a gap nothing can cross.
// The DP solution is O(n^2); the greedy one is the expected answer.

/**
 * @param {number[]} nums
 * @return {boolean}
 */
const canJump = (nums) => {
  let reach = 0;
  for (let i = 0; i < nums.length; i++) {
    if (i > reach) return false;
    reach = Math.max(reach, i + nums[i]);
  }
  return true;
};

module.exports = { canJump };

if (require.main === module) {
  const assert = require('node:assert');
  assert.strictEqual(canJump([2, 3, 1, 1, 4]), true);
  assert.strictEqual(canJump([3, 2, 1, 0, 4]), false);
  assert.strictEqual(canJump([0]), true); // already at the end
  assert.strictEqual(canJump([1, 0]), true);
  assert.strictEqual(canJump([0, 1]), false);
  console.log('55 ok');
}
