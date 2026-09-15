// 70. Climbing Stairs — Easy
// https://leetcode.com/problems/climbing-stairs/
// Pattern: 1-D DP
// Time O(n) | Space O(1)
//
// Idea: to reach step n you came from n-1 or n-2, so ways(n) = ways(n-1) + ways(n-2).
// It is Fibonacci. Only the last two values are ever needed, so the whole table collapses
// to two variables — the standard "rolling" optimisation.

/**
 * @param {number} n
 * @return {number}
 */
const climbStairs = (n) => {
  let prev = 1;
  let current = 1;
  for (let i = 2; i <= n; i++) [prev, current] = [current, prev + current];
  return current;
};

module.exports = { climbStairs };

if (require.main === module) {
  const assert = require('node:assert');
  assert.strictEqual(climbStairs(2), 2);
  assert.strictEqual(climbStairs(3), 3);
  assert.strictEqual(climbStairs(1), 1);
  assert.strictEqual(climbStairs(45), 1836311903); // the problem's upper bound
  console.log('70 ok');
}
