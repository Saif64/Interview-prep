// 49. Group Anagrams — Medium
// https://leetcode.com/problems/group-anagrams/
// Pattern: Arrays & Hashing
// Time O(n * k) | Space O(n * k)   (n strings of length up to k)
//
// Idea: anagrams share a letter-count signature. Counting is O(k); sorting each
// string would also work but costs O(k log k).

/**
 * @param {string[]} strs
 * @return {string[][]}
 */
const groupAnagrams = (strs) => {
  const groups = new Map();
  for (const s of strs) {
    const count = new Array(26).fill(0);
    for (const ch of s) count[ch.charCodeAt(0) - 97]++;
    const key = count.join(',');
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(s);
  }
  return [...groups.values()];
};

module.exports = { groupAnagrams };

if (require.main === module) {
  const assert = require('node:assert');
  const { sorted } = require('../_lib');
  assert.deepStrictEqual(
    sorted(groupAnagrams(['eat', 'tea', 'tan', 'ate', 'nat', 'bat'])),
    sorted([['bat'], ['nat', 'tan'], ['ate', 'eat', 'tea']])
  );
  assert.deepStrictEqual(groupAnagrams(['']), [['']]);
  assert.deepStrictEqual(groupAnagrams(['a']), [['a']]);
  console.log('49 ok');
}
