// 79. Word Search — Medium
// https://leetcode.com/problems/word-search/
// Pattern: Backtracking
// Time O(rows * cols * 4^len) | Space O(len)
//
// Idea: DFS from every cell, matching one character per depth. A cell cannot be reused
// within a single path, so mark it before recursing and restore it after — mutating the
// board in place avoids allocating a visited grid, but the restore is mandatory or later
// starting cells see a corrupted board.

/**
 * @param {character[][]} board
 * @param {string} word
 * @return {boolean}
 */
const exist = (board, word) => {
  const rows = board.length;
  const cols = board[0]?.length ?? 0;
  if (word.length > rows * cols) return false;

  const dfs = (r, c, index) => {
    if (index === word.length) return true;
    if (r < 0 || c < 0 || r >= rows || c >= cols || board[r][c] !== word[index]) return false;

    const ch = board[r][c];
    board[r][c] = '#';
    const found =
      dfs(r + 1, c, index + 1) ||
      dfs(r - 1, c, index + 1) ||
      dfs(r, c + 1, index + 1) ||
      dfs(r, c - 1, index + 1);
    board[r][c] = ch;
    return found;
  };

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) if (dfs(r, c, 0)) return true;
  }
  return false;
};

module.exports = { exist };

if (require.main === module) {
  const assert = require('node:assert');
  const board = () => [
    ['A', 'B', 'C', 'E'],
    ['S', 'F', 'C', 'S'],
    ['A', 'D', 'E', 'E'],
  ];
  assert.strictEqual(exist(board(), 'ABCCED'), true);
  assert.strictEqual(exist(board(), 'SEE'), true);
  assert.strictEqual(exist(board(), 'ABCB'), false); // would need to reuse B
  assert.strictEqual(exist([['a']], 'a'), true);
  assert.strictEqual(exist([['a']], 'ab'), false);
  const pristine = board();
  exist(pristine, 'ABCCED');
  assert.deepStrictEqual(pristine, board()); // board restored
  console.log('79 ok');
}
