// 139. Word Break — Medium
// https://leetcode.com/problems/word-break/
// Pattern: 1-D DP
// Time O(n^2 * maxWordLength) | Space O(n)
//
// Idea: dp[i] = "can s[0..i) be built from the dictionary?". dp[i] is true when some word
// ends at i and dp[start-of-that-word] is true. Plain recursion re-explores the same
// suffixes exponentially — the memo is the whole point.

/**
 * @param {string} s
 * @param {string[]} wordDict
 * @return {boolean}
 */
const wordBreak = (s, wordDict) => {
  const words = new Set(wordDict);
  const dp = new Array(s.length + 1).fill(false);
  dp[0] = true; // the empty prefix is always buildable

  for (let end = 1; end <= s.length; end++) {
    for (let start = 0; start < end; start++) {
      if (dp[start] && words.has(s.slice(start, end))) {
        dp[end] = true;
        break;
      }
    }
  }
  return dp[s.length];
};

module.exports = { wordBreak };

if (require.main === module) {
  const assert = require('node:assert');
  assert.strictEqual(wordBreak('leetcode', ['leet', 'code']), true);
  assert.strictEqual(wordBreak('applepenapple', ['apple', 'pen']), true); // reuse allowed
  assert.strictEqual(wordBreak('catsandog', ['cats', 'dog', 'sand', 'and', 'cat']), false);
  assert.strictEqual(wordBreak('', ['a']), true);
  assert.strictEqual(wordBreak('a', []), false);
  // The greedy longest-match-first would fail here; DP does not.
  assert.strictEqual(wordBreak('aaaaaaa', ['aaaa', 'aaa']), true);
  console.log('139 ok');
}
