// 134. Gas Station — Medium
// https://leetcode.com/problems/gas-station/
// Pattern: Greedy
// Time O(n) | Space O(1)
//
// Idea: two facts do all the work.
//   1. If total gas >= total cost, a solution exists (and it is unique).
//   2. If the tank goes negative somewhere between station `start` and station i, then no
//      station in between can be the answer either — so jump start to i + 1.
// Together they give a single pass instead of trying all n starts.

/**
 * @param {number[]} gas
 * @param {number[]} cost
 * @return {number} starting index, or -1
 */
const canCompleteCircuit = (gas, cost) => {
  let total = 0;
  let tank = 0;
  let start = 0;

  for (let i = 0; i < gas.length; i++) {
    const diff = gas[i] - cost[i];
    total += diff;
    tank += diff;
    if (tank < 0) {
      start = i + 1;
      tank = 0;
    }
  }
  return total >= 0 ? start : -1;
};

module.exports = { canCompleteCircuit };

if (require.main === module) {
  const assert = require('node:assert');
  assert.strictEqual(canCompleteCircuit([1, 2, 3, 4, 5], [3, 4, 5, 1, 2]), 3);
  assert.strictEqual(canCompleteCircuit([2, 3, 4], [3, 4, 3]), -1);
  assert.strictEqual(canCompleteCircuit([5], [4]), 0);
  assert.strictEqual(canCompleteCircuit([3, 3], [4, 1]), 1);
  console.log('134 ok');
}
