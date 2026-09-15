// 763. Partition Labels — Medium
// https://leetcode.com/problems/partition-labels/
// Pattern: Greedy
// Time O(n) | Space O(1)  (26 entries)
//
// Idea: a partition cannot end before the last occurrence of every character inside it.
// Precompute each character's last index, then sweep, extending the current partition's end
// as needed. Reaching that end means the partition is closed.

/**
 * @param {string} s
 * @return {number[]}
 */
const partitionLabels = (s) => {
  const lastIndex = new Map();
  for (let i = 0; i < s.length; i++) lastIndex.set(s[i], i);

  const out = [];
  let start = 0;
  let end = 0;
  for (let i = 0; i < s.length; i++) {
    end = Math.max(end, lastIndex.get(s[i]));
    if (i === end) {
      out.push(end - start + 1);
      start = i + 1;
    }
  }
  return out;
};

module.exports = { partitionLabels };

if (require.main === module) {
  const assert = require('node:assert');
  assert.deepStrictEqual(partitionLabels('ababcbacadefegdehijhklij'), [9, 7, 8]);
  assert.deepStrictEqual(partitionLabels('eccbbbbdec'), [10]); // one indivisible block
  assert.deepStrictEqual(partitionLabels('a'), [1]);
  assert.deepStrictEqual(partitionLabels('abc'), [1, 1, 1]);
  assert.deepStrictEqual(partitionLabels(''), []);
  console.log('763 ok');
}
