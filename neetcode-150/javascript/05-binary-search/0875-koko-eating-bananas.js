// 875. Koko Eating Bananas — Medium
// https://leetcode.com/problems/koko-eating-bananas/
// Pattern: Binary Search (on the answer)
// Time O(n log maxPile) | Space O(1)
//
// Idea: the array isn't what you search — the *speed* is. "Can Koko finish at speed k?"
// is monotonic (true for every larger k), so binary search the smallest true.
// This "binary search the answer" shape shows up constantly once you recognise it.

/**
 * @param {number[]} piles
 * @param {number} h
 * @return {number}
 */
const minEatingSpeed = (piles, h) => {
  const hoursAt = (speed) => piles.reduce((sum, pile) => sum + Math.ceil(pile / speed), 0);

  let lo = 1;
  let hi = Math.max(...piles);
  while (lo < hi) {
    const mid = Math.floor((lo + hi) / 2);
    if (hoursAt(mid) <= h) hi = mid;
    else lo = mid + 1;
  }
  return lo;
};

module.exports = { minEatingSpeed };

if (require.main === module) {
  const assert = require('node:assert');
  assert.strictEqual(minEatingSpeed([3, 6, 7, 11], 8), 4);
  assert.strictEqual(minEatingSpeed([30, 11, 23, 4, 20], 5), 30); // one pile per hour
  assert.strictEqual(minEatingSpeed([30, 11, 23, 4, 20], 6), 23);
  assert.strictEqual(minEatingSpeed([312884470], 968709470), 1); // huge h -> slowest speed
  console.log('875 ok');
}
