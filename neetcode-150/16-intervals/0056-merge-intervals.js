// 56. Merge Intervals — Medium
// https://leetcode.com/problems/merge-intervals/
// Pattern: Intervals
// Time O(n log n) | Space O(n)
//
// Idea: sort by start, then walk. If the next interval starts at or before the current
// end, they overlap — extend the end to the larger of the two. Sorting first is what makes
// "overlap" a purely local check.

/**
 * @param {number[][]} intervals
 * @return {number[][]}
 */
const merge = (intervals) => {
  if (!intervals.length) return [];
  const sorted = [...intervals].sort((a, b) => a[0] - b[0]);
  const out = [sorted[0].slice()];

  for (const [start, end] of sorted.slice(1)) {
    const last = out.at(-1);
    if (start <= last[1]) last[1] = Math.max(last[1], end);
    else out.push([start, end]);
  }
  return out;
};

module.exports = { merge };

if (require.main === module) {
  const assert = require('node:assert');
  assert.deepStrictEqual(merge([[1, 3], [2, 6], [8, 10], [15, 18]]), [[1, 6], [8, 10], [15, 18]]);
  assert.deepStrictEqual(merge([[1, 4], [4, 5]]), [[1, 5]]); // touching counts as overlapping
  assert.deepStrictEqual(merge([[1, 4], [2, 3]]), [[1, 4]]); // fully contained
  assert.deepStrictEqual(merge([]), []);
  assert.deepStrictEqual(merge([[1, 4], [0, 2], [3, 5]]), [[0, 5]]);
  console.log('56 ok');
}
