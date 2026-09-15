// 125. Valid Palindrome — Easy
// https://leetcode.com/problems/valid-palindrome/
// Pattern: Two Pointers
// Time O(n) | Space O(1)
//
// Idea: walk inward, skipping anything non-alphanumeric. Building a cleaned copy first is
// simpler to write but costs O(n) space — mention the trade-off, then do it in place.

const isAlnum = (ch) =>
  (ch >= 'a' && ch <= 'z') || (ch >= 'A' && ch <= 'Z') || (ch >= '0' && ch <= '9');

/**
 * @param {string} s
 * @return {boolean}
 */
const isPalindrome = (s) => {
  let left = 0;
  let right = s.length - 1;
  while (left < right) {
    while (left < right && !isAlnum(s[left])) left++;
    while (left < right && !isAlnum(s[right])) right--;
    if (s[left].toLowerCase() !== s[right].toLowerCase()) return false;
    left++;
    right--;
  }
  return true;
};

module.exports = { isPalindrome };

if (require.main === module) {
  const assert = require('node:assert');
  assert.strictEqual(isPalindrome('A man, a plan, a canal: Panama'), true);
  assert.strictEqual(isPalindrome('race a car'), false);
  assert.strictEqual(isPalindrome(' '), true);
  assert.strictEqual(isPalindrome('0P'), false); // '0' and 'P' are adjacent in ASCII — a classic trap
  console.log('125 ok');
}
