// 846. Hand of Straights — Medium
// https://leetcode.com/problems/hand-of-straights/
// Pattern: Greedy
// Time O(n log n) | Space O(n)
//
// Idea: the smallest remaining card has no smaller partner, so it MUST start a group.
// That forces the whole group, and repeating the argument settles the hand with no search.

/**
 * @param {number[]} hand
 * @param {number} groupSize
 * @return {boolean}
 */
const isNStraightHand = (hand, groupSize) => {
  if (hand.length % groupSize !== 0) return false;

  const counts = new Map();
  for (const card of hand) counts.set(card, (counts.get(card) ?? 0) + 1);

  const ascending = [...counts.keys()].sort((a, b) => a - b);
  for (const card of ascending) {
    const needed = counts.get(card);
    if (needed === 0) continue;
    for (let next = card; next < card + groupSize; next++) {
      if ((counts.get(next) ?? 0) < needed) return false;
      counts.set(next, counts.get(next) - needed);
    }
  }
  return true;
};

module.exports = { isNStraightHand };

if (require.main === module) {
  const assert = require('node:assert');
  assert.strictEqual(isNStraightHand([1, 2, 3, 6, 2, 3, 4, 7, 8], 3), true);
  assert.strictEqual(isNStraightHand([1, 2, 3, 4, 5], 4), false); // not divisible
  assert.strictEqual(isNStraightHand([1, 1, 2, 2, 3, 3], 3), true);
  assert.strictEqual(isNStraightHand([1, 2, 4, 5], 2), true);
  assert.strictEqual(isNStraightHand([1, 2, 3, 4], 1), true); // groups of one always work
  console.log('846 ok');
}
