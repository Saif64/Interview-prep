// 994. Rotting Oranges — Medium
// https://leetcode.com/problems/rotting-oranges/
// Pattern: Graphs (multi-source BFS)
// Time O(rows * cols) | Space O(rows * cols)
//
// Idea: every rotten orange starts rotting at minute 0, so seed the BFS queue with *all* of
// them at once. Multi-source BFS then advances every front in lockstep and the level count
// is the answer. DFS gives wrong answers here because the shortest rot time matters.

/**
 * @param {number[][]} grid
 * @return {number} minutes until nothing fresh remains, or -1 if impossible
 */
const orangesRotting = (grid) => {
  const rows = grid.length;
  const cols = grid[0]?.length ?? 0;
  let queue = [];
  let fresh = 0;

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (grid[r][c] === 2) queue.push([r, c]);
      else if (grid[r][c] === 1) fresh++;
    }
  }
  if (fresh === 0) return 0; // nothing to rot, even if the grid is empty

  let minutes = 0;
  while (queue.length && fresh > 0) {
    const next = [];
    for (const [r, c] of queue) {
      for (const [dr, dc] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
        const nr = r + dr;
        const nc = c + dc;
        if (nr < 0 || nc < 0 || nr >= rows || nc >= cols || grid[nr][nc] !== 1) continue;
        grid[nr][nc] = 2;
        fresh--;
        next.push([nr, nc]);
      }
    }
    queue = next;
    if (queue.length) minutes++;
  }
  return fresh === 0 ? minutes : -1;
};

module.exports = { orangesRotting };

if (require.main === module) {
  const assert = require('node:assert');
  assert.strictEqual(orangesRotting([[2, 1, 1], [1, 1, 0], [0, 1, 1]]), 4);
  assert.strictEqual(orangesRotting([[2, 1, 1], [0, 1, 1], [1, 0, 1]]), -1); // one is unreachable
  assert.strictEqual(orangesRotting([[0, 2]]), 0);
  assert.strictEqual(orangesRotting([[0]]), 0);
  assert.strictEqual(orangesRotting([[1]]), -1); // fresh with no source
  assert.strictEqual(orangesRotting([[2, 1]]), 1);
  console.log('994 ok');
}
