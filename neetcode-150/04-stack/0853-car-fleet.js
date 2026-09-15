// 853. Car Fleet — Medium
// https://leetcode.com/problems/car-fleet/
// Pattern: Stack
// Time O(n log n) (the sort dominates) | Space O(n)
//
// Idea: sort by position descending and walk from the car closest to the target backwards.
// A car whose arrival time is <= the fleet ahead of it catches up and merges; otherwise it
// starts a new fleet. Counting fleets is then just counting how many times the running
// "slowest arrival ahead" gets replaced.

/**
 * @param {number} target
 * @param {number[]} position
 * @param {number[]} speed
 * @return {number}
 */
const carFleet = (target, position, speed) => {
  const cars = position
    .map((pos, i) => [pos, (target - pos) / speed[i]])
    .sort((a, b) => b[0] - a[0]); // closest to the target first

  let fleets = 0;
  let slowestAhead = 0;
  for (const [, time] of cars) {
    if (time > slowestAhead) {
      fleets++;
      slowestAhead = time; // this car cannot catch up, it leads a new fleet
    }
  }
  return fleets;
};

module.exports = { carFleet };

if (require.main === module) {
  const assert = require('node:assert');
  assert.strictEqual(carFleet(12, [10, 8, 0, 5, 3], [2, 4, 1, 1, 3]), 3);
  assert.strictEqual(carFleet(10, [3], [3]), 1);
  assert.strictEqual(carFleet(100, [0, 2, 4], [4, 2, 1]), 1); // all merge into one
  assert.strictEqual(carFleet(10, [6, 8], [3, 2]), 2);
  console.log('853 ok');
}
