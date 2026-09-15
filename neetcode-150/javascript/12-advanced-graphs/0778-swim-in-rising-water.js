// 778. Swim in Rising Water — Hard
// https://leetcode.com/problems/swim-in-rising-water/
// Pattern: Advanced Graphs (Dijkstra variant)
// Time O(n^2 log n) | Space O(n^2)
//
// Idea: Dijkstra where a path's cost is the MAXIMUM cell on it rather than the sum —
// you can wait for the water to rise, so only the worst cell matters.
// Swapping `distance + weight` for `max(distance, weight)` is the entire change. This
// "minimise the maximum edge" shape is also what a minimax path / bottleneck path means.

const { Heap } = require('../_lib');

/**
 * @param {number[][]} grid
 * @return {number}
 */
const swimInWater = (grid) => {
  const n = grid.length;
  const heap = new Heap((a, b) => a[0] - b[0], [[grid[0][0], 0, 0]]); // [time, r, c]
  const seen = new Set([0]);

  while (heap.size) {
    const [time, r, c] = heap.pop();
    if (r === n - 1 && c === n - 1) return time;
    for (const [dr, dc] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
      const nr = r + dr;
      const nc = c + dc;
      if (nr < 0 || nc < 0 || nr >= n || nc >= n) continue;
      const key = nr * n + nc;
      if (seen.has(key)) continue;
      seen.add(key);
      heap.push([Math.max(time, grid[nr][nc]), nr, nc]);
    }
  }
  return -1;
};

module.exports = { swimInWater };

if (require.main === module) {
  const assert = require('node:assert');
  assert.strictEqual(swimInWater([[0, 2], [1, 3]]), 3);
  assert.strictEqual(
    swimInWater([
      [0, 1, 2, 3, 4],
      [24, 23, 22, 21, 5],
      [12, 13, 14, 15, 16],
      [11, 17, 18, 19, 20],
      [10, 9, 8, 7, 6],
    ]),
    16
  );
  assert.strictEqual(swimInWater([[0]]), 0);
  // A detour over low cells beats a direct route over a high one.
  assert.strictEqual(swimInWater([[0, 9, 9], [1, 9, 9], [2, 3, 4]]), 4);
  console.log('778 ok');
}
