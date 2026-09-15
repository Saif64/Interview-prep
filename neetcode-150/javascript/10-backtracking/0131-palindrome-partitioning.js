// 131. Palindrome Partitioning — Medium
// https://leetcode.com/problems/palindrome-partitioning/
// Pattern: Backtracking
// Time O(n * 2^n) | Space O(n)
//
// Idea: choose where the first cut goes. If the prefix is a palindrome, recurse on the
// rest. The palindrome check prunes the tree hard, which is why this stays tractable.

const isPalindrome = (s, left, right) => {
  while (left < right) {
    if (s[left++] !== s[right--]) return false;
  }
  return true;
};

/**
 * @param {string} s
 * @return {string[][]}
 */
const partition = (s) => {
  const out = [];
  const current = [];

  const build = (start) => {
    if (start === s.length) {
      out.push([...current]);
      return;
    }
    for (let end = start; end < s.length; end++) {
      if (!isPalindrome(s, start, end)) continue;
      current.push(s.slice(start, end + 1));
      build(end + 1);
      current.pop();
    }
  };

  build(0);
  return out;
};

module.exports = { partition };

if (require.main === module) {
  const assert = require('node:assert');
  const { sorted } = require('../_lib');
  assert.deepStrictEqual(sorted(partition('aab')), sorted([['a', 'a', 'b'], ['aa', 'b']]));
  assert.deepStrictEqual(partition('a'), [['a']]);
  assert.strictEqual(partition('aaa').length, 4);
  assert.deepStrictEqual(partition('ab'), [['a', 'b']]); // only the all-singles cut works
  console.log('131 ok');
}
