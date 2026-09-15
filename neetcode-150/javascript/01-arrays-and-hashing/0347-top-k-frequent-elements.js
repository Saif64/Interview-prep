// 347. Top K Frequent Elements — Medium
// https://leetcode.com/problems/top-k-frequent-elements/
// Pattern: Arrays & Hashing
// Time O(n) | Space O(n)
//
// Idea: bucket sort by frequency. A frequency can never exceed n, so an array of n+1
// buckets indexed by count beats the obvious heap solution's O(n log k).

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
const topKFrequent = (nums, k) => {
  const counts = new Map();
  for (const n of nums) counts.set(n, (counts.get(n) ?? 0) + 1);

  const buckets = Array.from({ length: nums.length + 1 }, () => []);
  for (const [num, count] of counts) buckets[count].push(num);

  const out = [];
  for (let count = buckets.length - 1; count > 0 && out.length < k; count--) {
    for (const num of buckets[count]) {
      out.push(num);
      if (out.length === k) break;
    }
  }
  return out;
};

module.exports = { topKFrequent };

if (require.main === module) {
  const assert = require('node:assert');
  const { sorted } = require('../_lib');
  assert.deepStrictEqual(sorted(topKFrequent([1, 1, 1, 2, 2, 3], 2)), sorted([1, 2]));
  assert.deepStrictEqual(topKFrequent([1], 1), [1]);
  assert.deepStrictEqual(sorted(topKFrequent([4, 4, 4, 5, 5, 6], 3)), sorted([4, 5, 6]));
  console.log('347 ok');
}
