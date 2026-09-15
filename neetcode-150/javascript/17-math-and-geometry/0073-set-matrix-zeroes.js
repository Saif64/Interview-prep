// 73. Set Matrix Zeroes — Medium
// https://leetcode.com/problems/set-matrix-zeroes/
// Pattern: Math & Geometry
// Time O(rows * cols) | Space O(1)
//
// Idea: the naive fix is two sets of flagged rows and columns, O(m + n) space. To reach
// O(1), store those flags in the matrix's own first row and column.
// The first column needs a separate boolean because cell [0][0] is shared between the two
// markers — that collision is the only real subtlety here.

/**
 * @param {number[][]} matrix
 * @return {void} modified in place
 */
const setZeroes = (matrix) => {
  const rows = matrix.length;
  const cols = matrix[0]?.length ?? 0;
  let firstColHasZero = false;

  for (let r = 0; r < rows; r++) {
    if (matrix[r][0] === 0) firstColHasZero = true;
    for (let c = 1; c < cols; c++) {
      if (matrix[r][c] === 0) {
        matrix[r][0] = 0;
        matrix[0][c] = 0;
      }
    }
  }

  // Apply the marks, working backwards so the markers are read before being overwritten.
  for (let r = rows - 1; r >= 0; r--) {
    for (let c = cols - 1; c >= 1; c--) {
      if (matrix[r][0] === 0 || matrix[0][c] === 0) matrix[r][c] = 0;
    }
    if (firstColHasZero) matrix[r][0] = 0;
  }
};

module.exports = { setZeroes };

if (require.main === module) {
  const assert = require('node:assert');
  const run = (m) => {
    setZeroes(m);
    return m;
  };
  assert.deepStrictEqual(run([[1, 1, 1], [1, 0, 1], [1, 1, 1]]), [[1, 0, 1], [0, 0, 0], [1, 0, 1]]);
  assert.deepStrictEqual(
    run([[0, 1, 2, 0], [3, 4, 5, 2], [1, 3, 1, 5]]),
    [[0, 0, 0, 0], [0, 4, 5, 0], [0, 3, 1, 0]]
  );
  assert.deepStrictEqual(run([[0]]), [[0]]);
  assert.deepStrictEqual(run([[1, 0]]), [[0, 0]]);
  assert.deepStrictEqual(run([[1], [0]]), [[0], [0]]);
  console.log('73 ok');
}
