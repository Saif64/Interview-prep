// 647. Palindromic Substrings — Medium
// https://leetcode.com/problems/palindromic-substrings/
// Pattern: 1-D DP / expand around centre
// Time O(n^2) | Space O(1)
//
// Idea: problem 5 with a counter instead of a maximum. Each successful expansion step is
// one more palindromic substring.

/**
 * @param {string} s
 * @return {number}
 */
const countSubstrings = (s) => {
  let count = 0;

  const expand = (left, right) => {
    while (left >= 0 && right < s.length && s[left] === s[right]) {
      count++;
      left--;
      right++;
    }
  };

  for (let i = 0; i < s.length; i++) {
    expand(i, i);
    expand(i, i + 1);
  }
  return count;
};

module.exports = { countSubstrings };

if (require.main === module) {
  const assert = require('node:assert');
  assert.strictEqual(countSubstrings('abc'), 3);
  assert.strictEqual(countSubstrings('aaa'), 6);
  assert.strictEqual(countSubstrings(''), 0);
  assert.strictEqual(countSubstrings('a'), 1);
  assert.strictEqual(countSubstrings('aba'), 4); // a, b, a, aba
  console.log('647 ok');
}
