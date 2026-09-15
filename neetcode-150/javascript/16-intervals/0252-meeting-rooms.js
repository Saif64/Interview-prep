// 252. Meeting Rooms — Easy (LeetCode Premium)
// https://leetcode.com/problems/meeting-rooms/
// Pattern: Intervals
// Time O(n log n) | Space O(1)
//
// Idea: sort by start; a conflict exists only if some meeting starts strictly before the
// previous one ends. Back-to-back meetings ([0,5] then [5,10]) do not conflict, so the
// comparison must be strict.

/**
 * @param {number[][]} intervals
 * @return {boolean} can one person attend all of them?
 */
const canAttendMeetings = (intervals) => {
  const sorted = [...intervals].sort((a, b) => a[0] - b[0]);
  for (let i = 1; i < sorted.length; i++) {
    if (sorted[i][0] < sorted[i - 1][1]) return false;
  }
  return true;
};

module.exports = { canAttendMeetings };

if (require.main === module) {
  const assert = require('node:assert');
  assert.strictEqual(canAttendMeetings([[0, 30], [5, 10], [15, 20]]), false);
  assert.strictEqual(canAttendMeetings([[7, 10], [2, 4]]), true);
  assert.strictEqual(canAttendMeetings([]), true);
  assert.strictEqual(canAttendMeetings([[0, 5], [5, 10]]), true); // back to back is fine
  console.log('252 ok');
}
