// 253. Meeting Rooms II — Medium (LeetCode Premium)
// https://leetcode.com/problems/meeting-rooms-ii/
// Pattern: Intervals (sweep line)
// Time O(n log n) | Space O(n)
//
// Idea: rooms needed = the largest number of meetings running at once. Separate the starts
// and the ends, sort each, and sweep with two pointers: a start before the earliest end
// needs a new room, otherwise a room frees up.
// A min-heap of end times is the equivalent, more commonly cited solution.

/**
 * @param {number[][]} intervals
 * @return {number}
 */
const minMeetingRooms = (intervals) => {
  const starts = intervals.map(([s]) => s).sort((a, b) => a - b);
  const ends = intervals.map(([, e]) => e).sort((a, b) => a - b);

  let rooms = 0;
  let most = 0;
  let endPointer = 0;

  for (const start of starts) {
    while (endPointer < ends.length && ends[endPointer] <= start) {
      rooms--;
      endPointer++;
    }
    rooms++;
    most = Math.max(most, rooms);
  }
  return most;
};

module.exports = { minMeetingRooms };

if (require.main === module) {
  const assert = require('node:assert');
  assert.strictEqual(minMeetingRooms([[0, 30], [5, 10], [15, 20]]), 2);
  assert.strictEqual(minMeetingRooms([[7, 10], [2, 4]]), 1);
  assert.strictEqual(minMeetingRooms([]), 0);
  assert.strictEqual(minMeetingRooms([[0, 5], [5, 10], [10, 15]]), 1); // back to back
  assert.strictEqual(minMeetingRooms([[1, 5], [2, 6], [3, 7]]), 3); // all overlap
  console.log('253 ok');
}
