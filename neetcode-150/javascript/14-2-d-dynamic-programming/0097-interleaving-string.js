// 97. Interleaving String — Medium
// https://leetcode.com/problems/interleaving-string/
// Pattern: 2-D DP
// Time O(m * n) | Space O(n)
//
// Idea: dp[i][j] = "can s1's first i characters and s2's first j characters interleave into
// s3's first i + j?". Each step consumes one character from s1 or from s2.
// Greedy fails: when both candidates match, only one branch may lead to a solution, and DP
// explores both without the exponential blowup.

/**
 * @param {string} s1
 * @param {string} s2
 * @param {string} s3
 * @return {boolean}
 */
const isInterleave = (s1, s2, s3) => {
  if (s1.length + s2.length !== s3.length) return false;

  let previous = new Array(s2.length + 1).fill(false);
  previous[0] = true;
  for (let j = 1; j <= s2.length; j++) {
    previous[j] = previous[j - 1] && s2[j - 1] === s3[j - 1];
  }

  for (let i = 1; i <= s1.length; i++) {
    const current = new Array(s2.length + 1).fill(false);
    current[0] = previous[0] && s1[i - 1] === s3[i - 1];
    for (let j = 1; j <= s2.length; j++) {
      current[j] =
        (previous[j] && s1[i - 1] === s3[i + j - 1]) ||
        (current[j - 1] && s2[j - 1] === s3[i + j - 1]);
    }
    previous = current;
  }
  return previous[s2.length];
};

module.exports = { isInterleave };

if (require.main === module) {
  const assert = require('node:assert');
  assert.strictEqual(isInterleave('aabcc', 'dbbca', 'aadbbcbcac'), true);
  assert.strictEqual(isInterleave('aabcc', 'dbbca', 'aadbbbaccc'), false);
  assert.strictEqual(isInterleave('', '', ''), true);
  assert.strictEqual(isInterleave('a', '', 'a'), true);
  assert.strictEqual(isInterleave('a', 'b', 'ab'), true);
  assert.strictEqual(isInterleave('abc', 'def', 'abcdefg'), false); // length mismatch
  console.log('97 ok');
}
