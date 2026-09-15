// 74. Search a 2D Matrix — Medium
// https://leetcode.com/problems/search-a-2d-matrix/
// Pattern: Binary Search
// Time O(log(m * n)) | Space O(1)
//
// Idea: the matrix is one sorted list wearing a grid costume. Binary search indices
// 0..m*n-1 and convert with divmod. Searching for the row first and then within it is
// equally valid and the same complexity — this version is just shorter.

/**
 * @param {number[][]} matrix
 * @param {number} target
 * @return {boolean}
 */
const searchMatrix = (matrix, target) => {
  if (!matrix.length || !matrix[0].length) return false;
  const cols = matrix[0].length;
  let lo = 0;
  let hi = matrix.length * cols - 1;

  while (lo <= hi) {
    const mid = (lo + hi) >> 1;
    const value = matrix[Math.floor(mid / cols)][mid % cols];
    if (value === target) return true;
    if (value < target) lo = mid + 1;
    else hi = mid - 1;
  }
  return false;
};

module.exports = { searchMatrix };

if (require.main === module) {
  const assert = require('node:assert');
  const m = [[1, 3, 5, 7], [10, 11, 16, 20], [23, 30, 34, 60]];
  assert.strictEqual(searchMatrix(m, 3), true);
  assert.strictEqual(searchMatrix(m, 13), false);
  assert.strictEqual(searchMatrix(m, 60), true); // last cell
  assert.strictEqual(searchMatrix(m, 1), true); // first cell
  assert.strictEqual(searchMatrix([], 1), false);
  console.log('74 ok');
}
