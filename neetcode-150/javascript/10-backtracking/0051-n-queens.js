// 51. N-Queens — Hard
// https://leetcode.com/problems/n-queens/
// Pattern: Backtracking
// Time O(n!) | Space O(n)
//
// Idea: place one queen per row, so rows never conflict by construction. Three sets track
// the remaining conflicts, and the diagonal keys are the trick worth memorising:
//   "\" diagonal -> row - col   (constant along it)
//   "/" diagonal -> row + col

/**
 * @param {number} n
 * @return {string[][]}
 */
const solveNQueens = (n) => {
  const out = [];
  const cols = new Set();
  const diag = new Set(); // row - col
  const antiDiag = new Set(); // row + col
  const placement = []; // placement[row] = col

  const build = (row) => {
    if (row === n) {
      out.push(placement.map((col) => '.'.repeat(col) + 'Q' + '.'.repeat(n - col - 1)));
      return;
    }
    for (let col = 0; col < n; col++) {
      if (cols.has(col) || diag.has(row - col) || antiDiag.has(row + col)) continue;
      cols.add(col);
      diag.add(row - col);
      antiDiag.add(row + col);
      placement.push(col);

      build(row + 1);

      placement.pop();
      cols.delete(col);
      diag.delete(row - col);
      antiDiag.delete(row + col);
    }
  };

  build(0);
  return out;
};

module.exports = { solveNQueens };

if (require.main === module) {
  const assert = require('node:assert');
  assert.deepStrictEqual(solveNQueens(1), [['Q']]);
  assert.deepStrictEqual(solveNQueens(2), []); // impossible
  assert.deepStrictEqual(solveNQueens(3), []);
  assert.strictEqual(solveNQueens(4).length, 2);
  assert.strictEqual(solveNQueens(8).length, 92); // the classic count
  // Every board is n rows of n characters with exactly one queen per row.
  for (const board of solveNQueens(5)) {
    assert.strictEqual(board.length, 5);
    for (const row of board) {
      assert.strictEqual(row.length, 5);
      assert.strictEqual([...row].filter((c) => c === 'Q').length, 1);
    }
  }
  console.log('51 ok');
}
