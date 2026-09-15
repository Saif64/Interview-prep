// 200. Number of Islands — Medium
// https://leetcode.com/problems/number-of-islands/
// Pattern: Graphs (flood fill)
// Time O(rows * cols) | Space O(rows * cols) worst case
//
// Idea: every unvisited '1' starts one island; flood the whole island so it is counted
// once. Sinking visited land (writing '0') is the tidiest way to mark visited, but it
// mutates the input — worth flagging to an interviewer, and easy to swap for a visited set.

/**
 * @param {character[][]} grid
 * @return {number}
 */
const numIslands = (grid) => {
  const rows = grid.length;
  const cols = grid[0]?.length ?? 0;
  let islands = 0;

  // Iterative flood fill: a recursive one can blow the stack on a large all-land grid.
  const sink = (startR, startC) => {
    const stack = [[startR, startC]];
    while (stack.length) {
      const [r, c] = stack.pop();
      if (r < 0 || c < 0 || r >= rows || c >= cols || grid[r][c] !== '1') continue;
      grid[r][c] = '0';
      stack.push([r + 1, c], [r - 1, c], [r, c + 1], [r, c - 1]);
    }
  };

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (grid[r][c] === '1') {
        islands++;
        sink(r, c);
      }
    }
  }
  return islands;
};

module.exports = { numIslands };

if (require.main === module) {
  const assert = require('node:assert');
  assert.strictEqual(
    numIslands([
      ['1', '1', '1', '1', '0'],
      ['1', '1', '0', '1', '0'],
      ['1', '1', '0', '0', '0'],
      ['0', '0', '0', '0', '0'],
    ]),
    1
  );
  assert.strictEqual(
    numIslands([
      ['1', '1', '0', '0', '0'],
      ['1', '1', '0', '0', '0'],
      ['0', '0', '1', '0', '0'],
      ['0', '0', '0', '1', '1'],
    ]),
    3
  );
  assert.strictEqual(numIslands([]), 0);
  assert.strictEqual(numIslands([['0']]), 0);
  // Diagonals do not connect.
  assert.strictEqual(numIslands([['1', '0'], ['0', '1']]), 2);
  console.log('200 ok');
}
