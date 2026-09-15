// 57. Insert Interval — Medium
// https://leetcode.com/problems/insert-interval/
// Pattern: Intervals
// Time O(n) | Space O(n)
//
// Idea: the list is already sorted and non-overlapping, so no sort is needed — three phases:
// copy everything strictly before, absorb everything that overlaps into one widened
// interval, then copy the rest.

/**
 * @param {number[][]} intervals
 * @param {number[]} newInterval
 * @return {number[][]}
 */
const insert = (intervals, newInterval) => {
  const out = [];
  let [start, end] = newInterval;
  let i = 0;

  while (i < intervals.length && intervals[i][1] < start) out.push(intervals[i++]);

  while (i < intervals.length && intervals[i][0] <= end) {
    start = Math.min(start, intervals[i][0]);
    end = Math.max(end, intervals[i][1]);
    i++;
  }
  out.push([start, end]);

  while (i < intervals.length) out.push(intervals[i++]);
  return out;
};

module.exports = { insert };

if (require.main === module) {
  const assert = require('node:assert');
  assert.deepStrictEqual(insert([[1, 3], [6, 9]], [2, 5]), [[1, 5], [6, 9]]);
  assert.deepStrictEqual(
    insert([[1, 2], [3, 5], [6, 7], [8, 10], [12, 16]], [4, 8]),
    [[1, 2], [3, 10], [12, 16]]
  );
  assert.deepStrictEqual(insert([], [5, 7]), [[5, 7]]);
  assert.deepStrictEqual(insert([[1, 5]], [6, 8]), [[1, 5], [6, 8]]); // no overlap, appended
  assert.deepStrictEqual(insert([[3, 5]], [1, 2]), [[1, 2], [3, 5]]); // inserted at the front
  console.log('57 ok');
}
