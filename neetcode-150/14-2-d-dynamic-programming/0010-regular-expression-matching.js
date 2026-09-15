// 10. Regular Expression Matching — Hard
// https://leetcode.com/problems/regular-expression-matching/
// Pattern: 2-D DP
// Time O(m * n) | Space O(m * n)
//
// Idea: dp[i][j] = "does s[0..i) match p[0..j)?". '.' matches any single character;
// 'x*' is the hard case and has exactly two readings:
//   - zero occurrences: drop the whole "x*" pair  -> dp[i][j-2]
//   - one more occurrence: if x matches s[i-1]    -> dp[i-1][j]
// The empty-string row also matters: "a*b*" matches "" and must be seeded correctly.

/**
 * @param {string} s
 * @param {string} p
 * @return {boolean}
 */
const isMatch = (s, p) => {
  const m = s.length;
  const n = p.length;
  const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(false));
  dp[0][0] = true;

  for (let j = 1; j <= n; j++) {
    if (p[j - 1] === '*') dp[0][j] = dp[0][j - 2];
  }

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (p[j - 1] === '*') {
        const zero = dp[i][j - 2];
        const charMatches = p[j - 2] === '.' || p[j - 2] === s[i - 1];
        dp[i][j] = zero || (charMatches && dp[i - 1][j]);
      } else if (p[j - 1] === '.' || p[j - 1] === s[i - 1]) {
        dp[i][j] = dp[i - 1][j - 1];
      }
    }
  }
  return dp[m][n];
};

module.exports = { isMatch };

if (require.main === module) {
  const assert = require('node:assert');
  assert.strictEqual(isMatch('aa', 'a'), false);
  assert.strictEqual(isMatch('aa', 'a*'), true);
  assert.strictEqual(isMatch('ab', '.*'), true);
  assert.strictEqual(isMatch('aab', 'c*a*b'), true);
  assert.strictEqual(isMatch('mississippi', 'mis*is*p*.'), false);
  assert.strictEqual(isMatch('', 'a*b*'), true); // star can match nothing
  assert.strictEqual(isMatch('', ''), true);
  assert.strictEqual(isMatch('a', ''), false);
  console.log('10 ok');
}
