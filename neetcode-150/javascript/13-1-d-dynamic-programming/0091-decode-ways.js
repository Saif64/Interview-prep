// 91. Decode Ways — Medium
// https://leetcode.com/problems/decode-ways/
// Pattern: 1-D DP
// Time O(n) | Space O(1)
//
// Idea: Fibonacci with validity rules. ways(i) = ways(i-1) if s[i] is 1..9, plus ways(i-2)
// if s[i-1..i] is 10..26. The zeros are what make this fiddly: '0' cannot stand alone and
// only "10" and "20" are decodable pairs, so "30" and "01" have zero ways.

/**
 * @param {string} s
 * @return {number}
 */
const numDecodings = (s) => {
  if (!s.length || s[0] === '0') return 0;

  let twoBack = 1; // empty prefix
  let oneBack = 1; // first character, already known valid

  for (let i = 1; i < s.length; i++) {
    let current = 0;
    if (s[i] !== '0') current += oneBack;
    const pair = Number(s.slice(i - 1, i + 1));
    if (pair >= 10 && pair <= 26) current += twoBack;
    if (current === 0) return 0; // dead end, e.g. "30"
    twoBack = oneBack;
    oneBack = current;
  }
  return oneBack;
};

module.exports = { numDecodings };

if (require.main === module) {
  const assert = require('node:assert');
  assert.strictEqual(numDecodings('12'), 2); // "AB", "L"
  assert.strictEqual(numDecodings('226'), 3);
  assert.strictEqual(numDecodings('06'), 0); // leading zero
  assert.strictEqual(numDecodings('0'), 0);
  assert.strictEqual(numDecodings('10'), 1);
  assert.strictEqual(numDecodings('100'), 0); // "00" is undecodable
  assert.strictEqual(numDecodings('27'), 1); // out of range as a pair
  assert.strictEqual(numDecodings('11106'), 2);
  console.log('91 ok');
}
