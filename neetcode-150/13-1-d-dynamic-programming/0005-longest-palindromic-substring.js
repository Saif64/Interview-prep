// 5. Longest Palindromic Substring — Medium
// https://leetcode.com/problems/longest-palindromic-substring/
// Pattern: 1-D DP / expand around centre
// Time O(n^2) | Space O(1)
//
// Idea: every palindrome has a centre, and there are 2n - 1 of them (n characters plus
// n - 1 gaps). Expand outward from each. Handling the even case via the gap centres is the
// part people miss.
// Manacher's algorithm does this in O(n) — worth naming, rarely worth writing.

/**
 * @param {string} s
 * @return {string}
 */
const longestPalindrome = (s) => {
  let start = 0;
  let length = 0;

  const expand = (left, right) => {
    while (left >= 0 && right < s.length && s[left] === s[right]) {
      left--;
      right++;
    }
    if (right - left - 1 > length) {
      length = right - left - 1;
      start = left + 1;
    }
  };

  for (let i = 0; i < s.length; i++) {
    expand(i, i); // odd length
    expand(i, i + 1); // even length
  }
  return s.slice(start, start + length);
};

module.exports = { longestPalindrome };

if (require.main === module) {
  const assert = require('node:assert');
  assert.ok(['bab', 'aba'].includes(longestPalindrome('babad')));
  assert.strictEqual(longestPalindrome('cbbd'), 'bb'); // even-length centre
  assert.strictEqual(longestPalindrome('a'), 'a');
  assert.strictEqual(longestPalindrome(''), '');
  assert.strictEqual(longestPalindrome('ac').length, 1);
  assert.strictEqual(longestPalindrome('aaaa'), 'aaaa');
  console.log('5 ok');
}
