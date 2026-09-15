// 417. Pacific Atlantic Water Flow — Medium
// https://leetcode.com/problems/pacific-atlantic-water-flow/
// Pattern: Graphs
// Time O(rows * cols) | Space O(rows * cols)
//
// Idea: reverse the flow. Asking "can this cell reach an ocean?" from every cell is
// O((rc)^2); instead start at each ocean's border and walk *uphill* (to cells at least as
// high). That yields the set of cells that drain to that ocean, and the answer is the
// intersection of the two sets.

/**
 * @param {number[][]} heights
 * @return {number[][]}
 */
const pacificAtlantic = (heights) => {
  const rows = heights.length;
  const cols = heights[0]?.length ?? 0;
  if (!rows || !cols) return [];

  const climb = (starts) => {
    const seen = new Set();
    const stack = [...starts];
    while (stack.length) {
      const [r, c] = stack.pop();
      const key = r * cols + c;
      if (seen.has(key)) continue;
      seen.add(key);
      for (const [dr, dc] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
        const nr = r + dr;
        const nc = c + dc;
        if (nr < 0 || nc < 0 || nr >= rows || nc >= cols) continue;
        if (heights[nr][nc] < heights[r][c]) continue; // water would not flow this way
        stack.push([nr, nc]);
      }
    }
    return seen;
  };

  const pacificStarts = [];
  const atlanticStarts = [];
  for (let r = 0; r < rows; r++) {
    pacificStarts.push([r, 0]);
    atlanticStarts.push([r, cols - 1]);
  }
  for (let c = 0; c < cols; c++) {
    pacificStarts.push([0, c]);
    atlanticStarts.push([rows - 1, c]);
  }

  const pacific = climb(pacificStarts);
  const atlantic = climb(atlanticStarts);

  const out = [];
  for (const key of pacific) {
    if (atlantic.has(key)) out.push([Math.floor(key / cols), key % cols]);
  }
  return out;
};

module.exports = { pacificAtlantic };

if (require.main === module) {
  const assert = require('node:assert');
  const { sorted } = require('../_lib');
  assert.deepStrictEqual(
    sorted(
      pacificAtlantic([
        [1, 2, 2, 3, 5],
        [3, 2, 3, 4, 4],
        [2, 4, 5, 3, 1],
        [6, 7, 1, 4, 5],
        [5, 1, 1, 2, 4],
      ])
    ),
    sorted([[0, 4], [1, 3], [1, 4], [2, 2], [3, 0], [3, 1], [4, 0]])
  );
  assert.deepStrictEqual(pacificAtlantic([[1]]), [[0, 0]]);
  assert.deepStrictEqual(pacificAtlantic([]), []);
  // A flat grid drains everywhere.
  assert.strictEqual(pacificAtlantic([[1, 1], [1, 1]]).length, 4);
  console.log('417 ok');
}
