// 54. Spiral Matrix — Medium
// https://leetcode.com/problems/spiral-matrix/
// Pattern: Math & Geometry
// Time O(rows * cols) | Space O(1) extra
//
// Idea: four shrinking boundaries. Walk right along the top, down the right, left along the
// bottom, up the left, then tighten. The two guards before the bottom and left passes are
// essential: without them a single leftover row or column is emitted twice.

/**
 * @param {number[][]} matrix
 * @return {number[]}
 */
const spiralOrder = (matrix) => {
  if (!matrix.length || !matrix[0].length) return [];
  const out = [];
  let top = 0;
  let bottom = matrix.length - 1;
  let left = 0;
  let right = matrix[0].length - 1;

  while (top <= bottom && left <= right) {
    for (let c = left; c <= right; c++) out.push(matrix[top][c]);
    top++;

    for (let r = top; r <= bottom; r++) out.push(matrix[r][right]);
    right--;

    if (top <= bottom) {
      for (let c = right; c >= left; c--) out.push(matrix[bottom][c]);
      bottom--;
    }
    if (left <= right) {
      for (let r = bottom; r >= top; r--) out.push(matrix[r][left]);
      left++;
    }
  }
  return out;
};

module.exports = { spiralOrder };

if (require.main === module) {
  const assert = require('node:assert');
  assert.deepStrictEqual(spiralOrder([[1, 2, 3], [4, 5, 6], [7, 8, 9]]), [1, 2, 3, 6, 9, 8, 7, 4, 5]);
  assert.deepStrictEqual(
    spiralOrder([[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12]]),
    [1, 2, 3, 4, 8, 12, 11, 10, 9, 5, 6, 7]
  );
  assert.deepStrictEqual(spiralOrder([[1]]), [1]);
  assert.deepStrictEqual(spiralOrder([[1, 2, 3]]), [1, 2, 3]); // single row
  assert.deepStrictEqual(spiralOrder([[1], [2], [3]]), [1, 2, 3]); // single column
  assert.deepStrictEqual(spiralOrder([]), []);
  console.log('54 ok');
}
