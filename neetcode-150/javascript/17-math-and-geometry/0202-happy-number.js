// 202. Happy Number — Easy
// https://leetcode.com/problems/happy-number/
// Pattern: Math & Geometry
// Time O(log n) per step | Space O(1)
//
// Idea: repeatedly summing squared digits either reaches 1 or falls into a cycle — so this
// is cycle detection in disguise. Floyd's tortoise and hare gives O(1) space; a Set of seen
// values is the O(n) alternative and is fine to reach for first.

const squareDigits = (n) => {
  let sum = 0;
  while (n > 0) {
    const digit = n % 10;
    sum += digit * digit;
    n = Math.floor(n / 10);
  }
  return sum;
};

/**
 * @param {number} n
 * @return {boolean}
 */
const isHappy = (n) => {
  let slow = n;
  let fast = squareDigits(n);
  while (fast !== 1 && slow !== fast) {
    slow = squareDigits(slow);
    fast = squareDigits(squareDigits(fast));
  }
  return fast === 1;
};

module.exports = { isHappy };

if (require.main === module) {
  const assert = require('node:assert');
  assert.strictEqual(isHappy(19), true);
  assert.strictEqual(isHappy(2), false);
  assert.strictEqual(isHappy(1), true);
  assert.strictEqual(isHappy(7), true);
  assert.strictEqual(isHappy(4), false); // the canonical unhappy cycle
  console.log('202 ok');
}
