// 695. Max Area of Island — Medium
// https://leetcode.com/problems/max-area-of-island/
// Pattern: Graphs (flood fill)
// Time O(rows * cols) | Space O(rows * cols)
//
// Idea: problem 200, but the flood fill returns a count instead of just marking.

/**
 * @param {number[][]} grid
 * @return {number}
 */
const maxAreaOfIsland = (grid) => {
  const rows = grid.length;
  const cols = grid[0]?.length ?? 0;
  let best = 0;

  const floodFill = (startR, startC) => {
    let area = 0;
    const stack = [[startR, startC]];
    while (stack.length) {
      const [r, c] = stack.pop();
      if (r < 0 || c < 0 || r >= rows || c >= cols || grid[r][c] !== 1) continue;
      grid[r][c] = 0;
      area++;
      stack.push([r + 1, c], [r - 1, c], [r, c + 1], [r, c - 1]);
    }
    return area;
  };

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (grid[r][c] === 1) best = Math.max(best, floodFill(r, c));
    }
  }
  return best;
};

module.exports = { maxAreaOfIsland };

if (require.main === module) {
  const assert = require('node:assert');
  assert.strictEqual(
    maxAreaOfIsland([
      [0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0],
      [0, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 1, 0, 0, 1, 1, 0, 0, 1, 0, 1, 0, 0],
      [0, 1, 0, 0, 1, 1, 0, 0, 1, 1, 1, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
    ]),
    6
  );
  assert.strictEqual(maxAreaOfIsland([[0, 0, 0, 0, 0, 0, 0, 0]]), 0);
  assert.strictEqual(maxAreaOfIsland([[1]]), 1);
  console.log('695 ok');
}
