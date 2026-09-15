// 3. Longest Substring Without Repeating Characters — Medium
// https://leetcode.com/problems/longest-substring-without-repeating-characters/
// Pattern: Sliding Window
// Time O(n) | Space O(min(n, alphabet))
//
// Idea: grow the window on the right; when a character repeats, jump the left edge past
// its previous occurrence. Storing the last index (not just "seen") is what makes the
// shrink O(1) instead of a slow one-step-at-a-time walk.

/**
 * @param {string} s
 * @return {number}
 */
const lengthOfLongestSubstring = (s) => {
  const lastSeen = new Map();
  let left = 0;
  let best = 0;
  for (let right = 0; right < s.length; right++) {
    const ch = s[right];
    if (lastSeen.has(ch) && lastSeen.get(ch) >= left) left = lastSeen.get(ch) + 1;
    lastSeen.set(ch, right);
    best = Math.max(best, right - left + 1);
  }
  return best;
};

module.exports = { lengthOfLongestSubstring };

if (require.main === module) {
  const assert = require('node:assert');
  assert.strictEqual(lengthOfLongestSubstring('abcabcbb'), 3);
  assert.strictEqual(lengthOfLongestSubstring('bbbbb'), 1);
  assert.strictEqual(lengthOfLongestSubstring('pwwkew'), 3);
  assert.strictEqual(lengthOfLongestSubstring(''), 0);
  assert.strictEqual(lengthOfLongestSubstring('abba'), 2); // left must never move backwards
  console.log('3 ok');
}
