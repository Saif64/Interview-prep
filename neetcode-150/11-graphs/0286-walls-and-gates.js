// 286. Walls and Gates — Medium (LeetCode Premium)
// https://leetcode.com/problems/walls-and-gates/
// Pattern: Graphs (multi-source BFS)
// Time O(rows * cols) | Space O(rows * cols)
//
// Idea: same shape as rotting oranges. Running a BFS from each empty room would be
// O((rc)^2); instead run one BFS outward from every gate at once. Because BFS reaches each
// cell by the shortest path first, the first write to a cell is already final.

const INF = 2147483647;

/**
 * @param {number[][]} rooms  -1 wall, 0 gate, INF empty
 * @return {void} modified in place
 */
const wallsAndGates = (rooms) => {
  const rows = rooms.length;
  const cols = rooms[0]?.length ?? 0;
  let queue = [];

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) if (rooms[r][c] === 0) queue.push([r, c]);
  }

  let distance = 0;
  while (queue.length) {
    distance++;
    const next = [];
    for (const [r, c] of queue) {
      for (const [dr, dc] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
        const nr = r + dr;
        const nc = c + dc;
        if (nr < 0 || nc < 0 || nr >= rows || nc >= cols || rooms[nr][nc] !== INF) continue;
        rooms[nr][nc] = distance;
        next.push([nr, nc]);
      }
    }
    queue = next;
  }
};

module.exports = { wallsAndGates, INF };

if (require.main === module) {
  const assert = require('node:assert');
  const rooms = [
    [INF, -1, 0, INF],
    [INF, INF, INF, -1],
    [INF, -1, INF, -1],
    [0, -1, INF, INF],
  ];
  wallsAndGates(rooms);
  assert.deepStrictEqual(rooms, [
    [3, -1, 0, 1],
    [2, 2, 1, -1],
    [1, -1, 2, -1],
    [0, -1, 3, 4],
  ]);

  const unreachable = [[INF]];
  wallsAndGates(unreachable);
  assert.deepStrictEqual(unreachable, [[INF]]); // no gate: left as-is
  console.log('286 ok');
}
