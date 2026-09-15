// 130. Surrounded Regions — Medium
// https://leetcode.com/problems/surrounded-regions/
// Pattern: Graphs
// Time O(rows * cols) | Space O(rows * cols)
//
// Idea: invert the question. Instead of finding enclosed regions, find the ones that are
// *not* enclosed — every 'O' reachable from a border. Mark those safe, flip everything
// else to 'X', then restore. Attacking it directly means tracking "did this region touch an
// edge?" through the traversal, which is fiddlier and easier to get wrong.

/**
 * @param {character[][]} board
 * @return {void} modified in place
 */
const solve = (board) => {
  const rows = board.length;
  const cols = board[0]?.length ?? 0;
  if (!rows || !cols) return;

  const markSafe = (startR, startC) => {
    const stack = [[startR, startC]];
    while (stack.length) {
      const [r, c] = stack.pop();
      if (r < 0 || c < 0 || r >= rows || c >= cols || board[r][c] !== 'O') continue;
      board[r][c] = 'S';
      stack.push([r + 1, c], [r - 1, c], [r, c + 1], [r, c - 1]);
    }
  };

  for (let r = 0; r < rows; r++) {
    markSafe(r, 0);
    markSafe(r, cols - 1);
  }
  for (let c = 0; c < cols; c++) {
    markSafe(0, c);
    markSafe(rows - 1, c);
  }

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      board[r][c] = board[r][c] === 'S' ? 'O' : 'X';
    }
  }
};

module.exports = { solve };

if (require.main === module) {
  const assert = require('node:assert');
  const b = [
    ['X', 'X', 'X', 'X'],
    ['X', 'O', 'O', 'X'],
    ['X', 'X', 'O', 'X'],
    ['X', 'O', 'X', 'X'],
  ];
  solve(b);
  assert.deepStrictEqual(b, [
    ['X', 'X', 'X', 'X'],
    ['X', 'X', 'X', 'X'],
    ['X', 'X', 'X', 'X'],
    ['X', 'O', 'X', 'X'], // touches the bottom edge, so it survives
  ]);

  const single = [['O']];
  solve(single);
  assert.deepStrictEqual(single, [['O']]);
  console.log('130 ok');
}
