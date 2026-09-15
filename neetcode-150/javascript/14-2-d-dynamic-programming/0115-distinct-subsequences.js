// 115. Distinct Subsequences — Hard
// https://leetcode.com/problems/distinct-subsequences/
// Pattern: 2-D DP
// Time O(m * n) | Space O(n)
//
// Idea: dp[j] = number of ways to form t's first j characters from the part of s seen so
// far. When characters match you may either use this s character (dp[j-1] before the
// update) or skip it (dp[j]); when they do not match, only skipping is available.
// Iterating j DOWNWARD keeps dp[j-1] at its previous-row value, which is what the
// recurrence needs.

/**
 * @param {string} s
 * @param {string} t
 * @return {number}
 */
const numDistinct = (s, t) => {
  const dp = new Array(t.length + 1).fill(0);
  dp[0] = 1; // one way to form the empty target: take nothing

  for (const ch of s) {
    for (let j = t.length; j >= 1; j--) {
      if (t[j - 1] === ch) dp[j] += dp[j - 1];
    }
  }
  return dp[t.length];
};

module.exports = { numDistinct };

if (require.main === module) {
  const assert = require('node:assert');
  assert.strictEqual(numDistinct('rabbbit', 'rabbit'), 3);
  assert.strictEqual(numDistinct('babgbag', 'bag'), 5);
  assert.strictEqual(numDistinct('abc', ''), 1);
  assert.strictEqual(numDistinct('', 'a'), 0);
  assert.strictEqual(numDistinct('aaa', 'aa'), 3); // choose 2 of 3
  console.log('115 ok');
}
