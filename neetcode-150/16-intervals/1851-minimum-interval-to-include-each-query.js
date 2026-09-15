// 1851. Minimum Interval to Include Each Query — Hard
// https://leetcode.com/problems/minimum-interval-to-include-each-query/
// Pattern: Intervals + Heap
// Time O(n log n + q log q) | Space O(n + q)
//
// Idea: sort both the intervals and the queries, then sweep the queries in increasing order.
// Push every interval that has started into a min-heap keyed by size, and lazily discard
// heap entries that have already ended. The heap top is then the smallest interval covering
// the current query.
// Answers must be returned in the ORIGINAL query order, so carry the index along.

const { Heap } = require('../_lib');

/**
 * @param {number[][]} intervals
 * @param {number[]} queries
 * @return {number[]}
 */
const minInterval = (intervals, queries) => {
  const sortedIntervals = [...intervals].sort((a, b) => a[0] - b[0]);
  const sortedQueries = queries.map((q, i) => [q, i]).sort((a, b) => a[0] - b[0]);

  const heap = new Heap((a, b) => a[0] - b[0]); // [size, end]
  const out = new Array(queries.length).fill(-1);
  let i = 0;

  for (const [query, index] of sortedQueries) {
    while (i < sortedIntervals.length && sortedIntervals[i][0] <= query) {
      const [start, end] = sortedIntervals[i++];
      heap.push([end - start + 1, end]);
    }
    while (heap.size && heap.peek()[1] < query) heap.pop(); // already ended
    out[index] = heap.size ? heap.peek()[0] : -1;
  }
  return out;
};

module.exports = { minInterval };

if (require.main === module) {
  const assert = require('node:assert');
  assert.deepStrictEqual(
    minInterval([[1, 4], [2, 4], [3, 6], [4, 4]], [2, 3, 4, 5]),
    [3, 3, 1, 4]
  );
  assert.deepStrictEqual(
    minInterval([[2, 3], [2, 5], [1, 8], [20, 25]], [2, 19, 5, 22]),
    [2, -1, 4, 6]
  );
  assert.deepStrictEqual(minInterval([], [1, 2]), [-1, -1]);
  assert.deepStrictEqual(minInterval([[1, 1]], [1]), [1]);
  console.log('1851 ok');
}
