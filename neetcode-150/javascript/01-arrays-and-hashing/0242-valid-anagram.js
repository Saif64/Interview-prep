// 242. Valid Anagram — Easy
// https://leetcode.com/problems/valid-anagram/
// Pattern: Arrays & Hashing
// Time O(n) | Space O(1)  (at most 26 counters)
//
// Idea: count up for s, count down for t, then assert every counter landed on zero.
// Follow-up worth saying out loud: for full Unicode, swap the 26-slot array for a Map.

/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
const isAnagram = (s, t) => {
  if (s.length !== t.length) return false;
  const count = new Array(26).fill(0);
  for (let i = 0; i < s.length; i++) {
    count[s.charCodeAt(i) - 97]++;
    count[t.charCodeAt(i) - 97]--;
  }
  return count.every((c) => c === 0);
};

module.exports = { isAnagram };

if (require.main === module) {
  const assert = require('node:assert');
  assert.strictEqual(isAnagram('anagram', 'nagaram'), true);
  assert.strictEqual(isAnagram('rat', 'car'), false);
  assert.strictEqual(isAnagram('a', 'ab'), false);
  console.log('242 ok');
}
