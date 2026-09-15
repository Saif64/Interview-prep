// 435. Non-overlapping Intervals — Medium
// https://leetcode.com/problems/non-overlapping-intervals/
// Pattern: Intervals (greedy)
// Time O(n log n) | Space O(1)
//
// Idea: the classic activity-selection problem. Sort by END time and keep every interval
// that starts after the last kept one ends — finishing early leaves the most room for what
// follows. Sorting by start time instead is the common wrong answer: one very long interval
// then blocks everything.

/**
 * @param {number[][]} intervals
 * @return {number} minimum removals
 */
const eraseOverlapIntervals = (intervals) => {
  if (!intervals.length) return 0;
  const sorted = [...intervals].sort((a, b) => a[1] - b[1]);

  let kept = 1;
  let lastEnd = sorted[0][1];
  for (const [start, end] of sorted.slice(1)) {
    if (start >= lastEnd) {
      kept++;
      lastEnd = end;
    }
  }
  return intervals.length - kept;
};

module.exports = { eraseOverlapIntervals };

if (require.main === module) {
  const assert = require('node:assert');
  assert.strictEqual(eraseOverlapIntervals([[1, 2], [2, 3], [3, 4], [1, 3]]), 1);
  assert.strictEqual(eraseOverlapIntervals([[1, 2], [1, 2], [1, 2]]), 2);
  assert.strictEqual(eraseOverlapIntervals([[1, 2], [2, 3]]), 0); // touching is not overlapping
  assert.strictEqual(eraseOverlapIntervals([]), 0);
  // Sorting by start would keep [1,100] and drop three; sorting by end keeps three.
  assert.strictEqual(eraseOverlapIntervals([[1, 100], [11, 22], [1, 11], [2, 12]]), 2);
  console.log('435 ok');
}
