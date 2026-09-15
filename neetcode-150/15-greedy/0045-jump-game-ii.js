// 45. Jump Game II — Medium
// https://leetcode.com/problems/jump-game-ii/
// Pattern: Greedy
// Time O(n) | Space O(1)
//
// Idea: an implicit BFS. Sweep the current "level" (everything reachable with the jumps
// spent so far) while computing the furthest index the next level can reach. Hitting the
// end of the level means one more jump was required.

/**
 * @param {number[]} nums
 * @return {number}
 */
const jump = (nums) => {
  let jumps = 0;
  let currentEnd = 0;
  let furthest = 0;

  for (let i = 0; i < nums.length - 1; i++) {
    furthest = Math.max(furthest, i + nums[i]);
    if (i === currentEnd) {
      jumps++;
      currentEnd = furthest;
    }
  }
  return jumps;
};

module.exports = { jump };

if (require.main === module) {
  const assert = require('node:assert');
  assert.strictEqual(jump([2, 3, 1, 1, 4]), 2);
  assert.strictEqual(jump([2, 3, 0, 1, 4]), 2);
  assert.strictEqual(jump([0]), 0); // already there
  assert.strictEqual(jump([1, 2]), 1);
  assert.strictEqual(jump([1, 1, 1, 1]), 3);
  console.log('45 ok');
}
