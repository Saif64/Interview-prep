// 271. Encode and Decode Strings — Medium (LeetCode Premium; also on Lintcode 659)
// https://leetcode.com/problems/encode-and-decode-strings/
// Pattern: Arrays & Hashing
// Time O(n) both ways | Space O(n)
//
// Idea: length-prefix each string ("5#hello"). Any separator you pick could appear inside
// the payload, so the length — not the delimiter — is what makes decoding unambiguous.

/**
 * @param {string[]} strs
 * @return {string}
 */
const encode = (strs) => strs.map((s) => `${s.length}#${s}`).join('');

/**
 * @param {string} str
 * @return {string[]}
 */
const decode = (str) => {
  const out = [];
  let i = 0;
  while (i < str.length) {
    let j = i;
    while (str[j] !== '#') j++;
    const length = Number(str.slice(i, j));
    out.push(str.slice(j + 1, j + 1 + length));
    i = j + 1 + length;
  }
  return out;
};

module.exports = { encode, decode };

if (require.main === module) {
  const assert = require('node:assert');
  const roundTrip = (arr) => assert.deepStrictEqual(decode(encode(arr)), arr);
  roundTrip(['lint', 'code', 'love', 'you']);
  roundTrip(['', '']);
  roundTrip(['we', 'say', ':', 'yes']);
  roundTrip(['4#tricky', '#', '12#']); // payloads that look like the encoding itself
  roundTrip([]);
  console.log('271 ok');
}
