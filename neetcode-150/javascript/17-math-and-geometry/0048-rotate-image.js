// 48. Rotate Image — Medium
// https://leetcode.com/problems/rotate-image/
// Pattern: Math & Geometry
// Time O(n^2) | Space O(1)
//
// Idea: transpose (mirror across the main diagonal), then reverse each row.
// That composition equals a 90-degree clockwise rotation, and both halves are trivial to
// get right — far easier than juggling four-way cell swaps.
// Counter-clockwise: transpose, then reverse each column instead.

/**
 * @param {number[][]} matrix
 * @return {void} modified in place
 */
const rotate = (matrix) => {
  const n = matrix.length;

  for (let r = 0; r < n; r++) {
    for (let c = r + 1; c < n; c++) {
      [matrix[r][c], matrix[c][r]] = [matrix[c][r], matrix[r][c]];
    }
  }
  for (const row of matrix) row.reverse();
};

module.exports = { rotate };

if (require.main === module) {
  const assert = require('node:assert');
  const run = (m) => {
    rotate(m);
    return m;
  };
  assert.deepStrictEqual(run([[1, 2, 3], [4, 5, 6], [7, 8, 9]]), [[7, 4, 1], [8, 5, 2], [9, 6, 3]]);
  assert.deepStrictEqual(run([[1, 2], [3, 4]]), [[3, 1], [4, 2]]);
  assert.deepStrictEqual(run([[1]]), [[1]]);
  // Four rotations return to the original.
  const m = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];
  for (let i = 0; i < 4; i++) rotate(m);
  assert.deepStrictEqual(m, [[1, 2, 3], [4, 5, 6], [7, 8, 9]]);
  console.log('48 ok');
}
