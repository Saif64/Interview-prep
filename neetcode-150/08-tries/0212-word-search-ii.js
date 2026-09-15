// 212. Word Search II — Hard
// https://leetcode.com/problems/word-search-ii/
// Pattern: Tries + Backtracking
// Time O(rows * cols * 4^maxWordLength) worst case | Space O(total characters in words)
//
// Idea: running Word Search (79) once per word is far too slow. Instead put every word in a
// trie and walk the board once — the trie prunes a path the moment no word shares that
// prefix. Two details that matter a lot in practice:
//   - mark a cell as visited during the DFS and restore it afterwards;
//   - clear `node.word` once a word is found, so duplicates are not reported twice.

const { TrieNode } = require('./0208-implement-trie-prefix-tree');

/**
 * @param {character[][]} board
 * @param {string[]} words
 * @return {string[]}
 */
const findWords = (board, words) => {
  const root = new TrieNode();
  for (const word of words) {
    let node = root;
    for (const ch of word) {
      if (!node.children.has(ch)) node.children.set(ch, new TrieNode());
      node = node.children.get(ch);
    }
    node.word = word;
  }

  const rows = board.length;
  const cols = board[0]?.length ?? 0;
  const found = [];

  const dfs = (r, c, node) => {
    if (r < 0 || c < 0 || r >= rows || c >= cols) return;
    const ch = board[r][c];
    const next = node.children.get(ch);
    if (!next) return;

    if (next.word) {
      found.push(next.word);
      next.word = null; // report each word once
    }

    board[r][c] = '#'; // visited
    dfs(r + 1, c, next);
    dfs(r - 1, c, next);
    dfs(r, c + 1, next);
    dfs(r, c - 1, next);
    board[r][c] = ch; // restore
  };

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) dfs(r, c, root);
  }
  return found;
};

module.exports = { findWords };

if (require.main === module) {
  const assert = require('node:assert');
  const { sorted } = require('../_lib');
  const board = [
    ['o', 'a', 'a', 'n'],
    ['e', 't', 'a', 'e'],
    ['i', 'h', 'k', 'r'],
    ['i', 'f', 'l', 'v'],
  ];
  assert.deepStrictEqual(sorted(findWords(board, ['oath', 'pea', 'eat', 'rain'])), sorted(['oath', 'eat']));
  assert.deepStrictEqual(findWords([['a', 'b'], ['c', 'd']], ['abcb']), []); // no cell reuse
  assert.deepStrictEqual(findWords([['a']], ['a']), ['a']);
  // The board must be left exactly as it was found.
  const pristine = [['a', 'b'], ['c', 'd']];
  findWords(pristine, ['abcd']);
  assert.deepStrictEqual(pristine, [['a', 'b'], ['c', 'd']]);
  console.log('212 ok');
}
