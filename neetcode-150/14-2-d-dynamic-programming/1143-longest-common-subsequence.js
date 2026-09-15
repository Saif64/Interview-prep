// 1143. Longest Common Subsequence — Medium
// https://leetcode.com/problems/longest-common-subsequence/
// Pattern: 2-D DP
// Time O(m * n) | Space O(min(m, n))
//
// Idea: the archetypal grid DP. Matching characters extend the diagonal by one; otherwise
// take the better of dropping one character from either string.
// Subsequence, not substring — the characters need not be adjacent.

/**
 * @param {string} text1
 * @param {string} text2
 * @return {number}
 */
const longestCommonSubsequence = (text1, text2) => {
  const [a, b] = text1.length >= text2.length ? [text1, text2] : [text2, text1];
  let previous = new Array(b.length + 1).fill(0);

  for (let i = 1; i <= a.length; i++) {
    const current = new Array(b.length + 1).fill(0);
    for (let j = 1; j <= b.length; j++) {
      current[j] =
        a[i - 1] === b[j - 1] ? previous[j - 1] + 1 : Math.max(previous[j], current[j - 1]);
    }
    previous = current;
  }
  return previous[b.length];
};

module.exports = { longestCommonSubsequence };

if (require.main === module) {
  const assert = require('node:assert');
  assert.strictEqual(longestCommonSubsequence('abcde', 'ace'), 3);
  assert.strictEqual(longestCommonSubsequence('abc', 'abc'), 3);
  assert.strictEqual(longestCommonSubsequence('abc', 'def'), 0);
  assert.strictEqual(longestCommonSubsequence('', 'abc'), 0);
  assert.strictEqual(longestCommonSubsequence('bsbininm', 'jmjkbkjkv'), 1);
  console.log('1143 ok');
}
