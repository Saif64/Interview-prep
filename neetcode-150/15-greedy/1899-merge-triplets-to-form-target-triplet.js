// 1899. Merge Triplets to Form Target Triplet — Medium
// https://leetcode.com/problems/merge-triplets-to-form-target-triplet/
// Pattern: Greedy
// Time O(n) | Space O(1)
//
// Idea: merging takes the element-wise maximum, which can never decrease a value. So any
// triplet exceeding the target in ANY position is permanently disqualified — using it would
// overshoot forever. Among the survivors, simply check that each of the three positions is
// matched exactly by at least one of them.

/**
 * @param {number[][]} triplets
 * @param {number[]} target
 * @return {boolean}
 */
const mergeTriplets = (triplets, target) => {
  const matched = [false, false, false];

  for (const triplet of triplets) {
    if (triplet.some((value, i) => value > target[i])) continue; // would overshoot
    triplet.forEach((value, i) => {
      if (value === target[i]) matched[i] = true;
    });
  }
  return matched.every(Boolean);
};

module.exports = { mergeTriplets };

if (require.main === module) {
  const assert = require('node:assert');
  assert.strictEqual(mergeTriplets([[2, 5, 3], [1, 8, 4], [1, 7, 5]], [2, 7, 5]), true);
  assert.strictEqual(mergeTriplets([[3, 4, 5], [4, 5, 6]], [3, 2, 5]), false);
  assert.strictEqual(
    mergeTriplets([[2, 5, 3], [2, 3, 4], [1, 2, 5], [5, 2, 3]], [5, 5, 5]),
    true
  );
  assert.strictEqual(mergeTriplets([[1, 1, 1]], [1, 1, 1]), true);
  assert.strictEqual(mergeTriplets([[9, 1, 1]], [1, 1, 1]), false); // only candidate overshoots
  console.log('1899 ok');
}
