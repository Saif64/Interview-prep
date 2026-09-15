// 62. Unique Paths — Medium
// https://leetcode.com/problems/unique-paths/
// Pattern: 2-D DP
// Time O(m * n) | Space O(n)
//
// Idea: paths(r, c) = paths(r-1, c) + paths(r, c-1), with the top row and left column all 1.
// Only the previous row is ever read, so one array suffices.
// Closed form worth mentioning: C(m+n-2, m-1).

/**
 * @param {number} m
 * @param {number} n
 * @return {number}
 */
const uniquePaths = (m, n) => {
  const row = new Array(n).fill(1);
  for (let r = 1; r < m; r++) {
    for (let c = 1; c < n; c++) row[c] += row[c - 1];
  }
  return row[n - 1];
};

module.exports = { uniquePaths };

if (require.main === module) {
  const assert = require('node:assert');
  assert.strictEqual(uniquePaths(3, 7), 28);
  assert.strictEqual(uniquePaths(3, 2), 3);
  assert.strictEqual(uniquePaths(1, 1), 1);
  assert.strictEqual(uniquePaths(1, 10), 1); // only one way along a single row
  assert.strictEqual(uniquePaths(10, 10), 48620);
  console.log('62 ok');
}
