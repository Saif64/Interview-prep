// 329. Longest Increasing Path in a Matrix — Hard
// https://leetcode.com/problems/longest-increasing-path-in-a-matrix/
// Pattern: 2-D DP (memoised DFS)
// Time O(rows * cols) | Space O(rows * cols)
//
// Idea: DFS from every cell, memoising the best path length starting there.
// No visited set is needed: paths must strictly increase, so the graph is acyclic by
// construction and each cell is computed exactly once.

/**
 * @param {number[][]} matrix
 * @return {number}
 */
const longestIncreasingPath = (matrix) => {
  const rows = matrix.length;
  const cols = matrix[0]?.length ?? 0;
  if (!rows || !cols) return 0;

  const memo = Array.from({ length: rows }, () => new Array(cols).fill(0));

  const dfs = (r, c) => {
    if (memo[r][c]) return memo[r][c];
    let best = 1;
    for (const [dr, dc] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
      const nr = r + dr;
      const nc = c + dc;
      if (nr < 0 || nc < 0 || nr >= rows || nc >= cols) continue;
      if (matrix[nr][nc] <= matrix[r][c]) continue;
      best = Math.max(best, 1 + dfs(nr, nc));
    }
    memo[r][c] = best;
    return best;
  };

  let answer = 0;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) answer = Math.max(answer, dfs(r, c));
  }
  return answer;
};

module.exports = { longestIncreasingPath };

if (require.main === module) {
  const assert = require('node:assert');
  assert.strictEqual(longestIncreasingPath([[9, 9, 4], [6, 6, 8], [2, 1, 1]]), 4);
  assert.strictEqual(longestIncreasingPath([[3, 4, 5], [3, 2, 6], [2, 2, 1]]), 4);
  assert.strictEqual(longestIncreasingPath([[1]]), 1);
  assert.strictEqual(longestIncreasingPath([]), 0);
  assert.strictEqual(longestIncreasingPath([[1, 1], [1, 1]]), 1); // equal values do not count
  console.log('329 ok');
}
