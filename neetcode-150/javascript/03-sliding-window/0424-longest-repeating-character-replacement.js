// 424. Longest Repeating Character Replacement — Medium
// https://leetcode.com/problems/longest-repeating-character-replacement/
// Pattern: Sliding Window
// Time O(n) | Space O(1)  (26 counters)
//
// Idea: a window is legal when (its length - count of its most common character) <= k,
// i.e. the characters you'd have to overwrite fit in the budget.
// `maxCount` is deliberately never decreased: the answer only grows, so a stale high
// value can never produce a longer-than-real result.

/**
 * @param {string} s
 * @param {number} k
 * @return {number}
 */
const characterReplacement = (s, k) => {
  const count = new Array(26).fill(0);
  let left = 0;
  let maxCount = 0;
  let best = 0;

  for (let right = 0; right < s.length; right++) {
    maxCount = Math.max(maxCount, ++count[s.charCodeAt(right) - 65]);
    while (right - left + 1 - maxCount > k) count[s.charCodeAt(left++) - 65]--;
    best = Math.max(best, right - left + 1);
  }
  return best;
};

module.exports = { characterReplacement };

if (require.main === module) {
  const assert = require('node:assert');
  assert.strictEqual(characterReplacement('ABAB', 2), 4);
  assert.strictEqual(characterReplacement('AABABBA', 1), 4);
  assert.strictEqual(characterReplacement('AAAA', 0), 4);
  assert.strictEqual(characterReplacement('', 2), 0);
  console.log('424 ok');
}
