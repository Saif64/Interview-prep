// 621. Task Scheduler — Medium
// https://leetcode.com/problems/task-scheduler/
// Pattern: Heap / Greedy math
// Time O(n) | Space O(1)  (26 counters)
//
// Idea: the most frequent task dictates the schedule. Lay out (maxCount - 1) blocks of
// length (n + 1), then append every task tied for the maximum. Other tasks fill the idle
// slots for free — and if there are more tasks than slots, there is no idling at all, so
// the answer is simply tasks.length. Hence the Math.max.

/**
 * @param {character[]} tasks
 * @param {number} n
 * @return {number}
 */
const leastInterval = (tasks, n) => {
  const counts = new Array(26).fill(0);
  for (const task of tasks) counts[task.charCodeAt(0) - 65]++;

  const maxCount = Math.max(...counts);
  const tiedForMax = counts.filter((c) => c === maxCount).length;

  return Math.max(tasks.length, (maxCount - 1) * (n + 1) + tiedForMax);
};

module.exports = { leastInterval };

if (require.main === module) {
  const assert = require('node:assert');
  assert.strictEqual(leastInterval(['A', 'A', 'A', 'B', 'B', 'B'], 2), 8);
  assert.strictEqual(leastInterval(['A', 'A', 'A', 'B', 'B', 'B'], 0), 6); // no cooldown
  // 6 A's force 5 gaps of 2, and the other tasks cannot fill them all.
  assert.strictEqual(
    leastInterval(['A', 'A', 'A', 'A', 'A', 'A', 'B', 'C', 'D', 'E', 'F', 'G'], 2),
    16
  );
  // Same tasks, enough filler that idling disappears -> just tasks.length.
  assert.strictEqual(leastInterval(['A', 'A', 'A', 'A', 'B', 'C', 'D', 'E', 'F', 'G'], 2), 10);
  assert.strictEqual(leastInterval(['A'], 5), 1);
  // Dense enough that no idle slot is ever needed.
  assert.strictEqual(leastInterval(['A', 'B', 'C', 'D', 'A', 'B'], 1), 6);
  console.log('621 ok');
}
