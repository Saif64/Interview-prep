// 17. Letter Combinations of a Phone Number — Medium
// https://leetcode.com/problems/letter-combinations-of-a-phone-number/
// Pattern: Backtracking
// Time O(4^n * n) | Space O(n) recursion depth
//
// Idea: a cartesian product written as a DFS. One digit per level, one branch per letter.
// The empty input returning [] rather than [''] is the edge case graders check.

const KEYS = {
  2: 'abc', 3: 'def', 4: 'ghi', 5: 'jkl',
  6: 'mno', 7: 'pqrs', 8: 'tuv', 9: 'wxyz',
};

/**
 * @param {string} digits
 * @return {string[]}
 */
const letterCombinations = (digits) => {
  if (!digits.length) return [];
  const out = [];
  const build = (index, current) => {
    if (index === digits.length) {
      out.push(current);
      return;
    }
    for (const ch of KEYS[digits[index]]) build(index + 1, current + ch);
  };
  build(0, '');
  return out;
};

module.exports = { letterCombinations };

if (require.main === module) {
  const assert = require('node:assert');
  const { sorted } = require('../_lib');
  assert.deepStrictEqual(sorted(letterCombinations('23')), sorted(['ad', 'ae', 'af', 'bd', 'be', 'bf', 'cd', 'ce', 'cf']));
  assert.deepStrictEqual(letterCombinations(''), []);
  assert.deepStrictEqual(sorted(letterCombinations('2')), sorted(['a', 'b', 'c']));
  assert.strictEqual(letterCombinations('79').length, 16); // two 4-letter keys
  console.log('17 ok');
}
