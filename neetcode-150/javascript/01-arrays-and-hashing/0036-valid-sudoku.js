// 36. Valid Sudoku — Medium
// https://leetcode.com/problems/valid-sudoku/
// Pattern: Arrays & Hashing
// Time O(1) (the board is always 9x9) | Space O(1)
//
// Idea: one pass, three sets of sets. The only trick is the box index: (row/3)*3 + col/3.

/**
 * @param {character[][]} board
 * @return {boolean}
 */
const isValidSudoku = (board) => {
  const rows = Array.from({ length: 9 }, () => new Set());
  const cols = Array.from({ length: 9 }, () => new Set());
  const boxes = Array.from({ length: 9 }, () => new Set());

  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      const val = board[r][c];
      if (val === '.') continue;
      const b = Math.floor(r / 3) * 3 + Math.floor(c / 3);
      if (rows[r].has(val) || cols[c].has(val) || boxes[b].has(val)) return false;
      rows[r].add(val);
      cols[c].add(val);
      boxes[b].add(val);
    }
  }
  return true;
};

module.exports = { isValidSudoku };

if (require.main === module) {
  const assert = require('node:assert');
  const valid = [
    ['5', '3', '.', '.', '7', '.', '.', '.', '.'],
    ['6', '.', '.', '1', '9', '5', '.', '.', '.'],
    ['.', '9', '8', '.', '.', '.', '.', '6', '.'],
    ['8', '.', '.', '.', '6', '.', '.', '.', '3'],
    ['4', '.', '.', '8', '.', '3', '.', '.', '1'],
    ['7', '.', '.', '.', '2', '.', '.', '.', '6'],
    ['.', '6', '.', '.', '.', '.', '2', '8', '.'],
    ['.', '.', '.', '4', '1', '9', '.', '.', '5'],
    ['.', '.', '.', '.', '8', '.', '.', '7', '9'],
  ];
  assert.strictEqual(isValidSudoku(valid), true);
  const dupInBox = valid.map((row) => [...row]);
  dupInBox[0][0] = '8'; // now the top-left box holds two 8s
  assert.strictEqual(isValidSudoku(dupInBox), false);
  console.log('36 ok');
}
