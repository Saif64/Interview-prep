// 211. Design Add and Search Words Data Structure — Medium
// https://leetcode.com/problems/design-add-and-search-words-data-structure/
// Pattern: Tries
// Time: add O(len); search O(len) with no wildcards, O(26^w * len) worst case | Space O(n)
//
// Idea: a trie plus backtracking. A '.' means "try every child", so search becomes a DFS
// over the trie rather than a straight walk.

const { TrieNode } = require('./0208-implement-trie-prefix-tree');

class WordDictionary {
  constructor() {
    this.root = new TrieNode();
  }

  /** @param {string} word */
  addWord(word) {
    let node = this.root;
    for (const ch of word) {
      if (!node.children.has(ch)) node.children.set(ch, new TrieNode());
      node = node.children.get(ch);
    }
    node.isWord = true;
  }

  /** @param {string} word @return {boolean} */
  search(word) {
    const dfs = (index, node) => {
      if (index === word.length) return node.isWord;
      const ch = word[index];
      if (ch === '.') {
        for (const child of node.children.values()) {
          if (dfs(index + 1, child)) return true;
        }
        return false;
      }
      const child = node.children.get(ch);
      return child ? dfs(index + 1, child) : false;
    };
    return dfs(0, this.root);
  }
}

module.exports = { WordDictionary };

if (require.main === module) {
  const assert = require('node:assert');
  const d = new WordDictionary();
  d.addWord('bad');
  d.addWord('dad');
  d.addWord('mad');
  assert.strictEqual(d.search('pad'), false);
  assert.strictEqual(d.search('bad'), true);
  assert.strictEqual(d.search('.ad'), true);
  assert.strictEqual(d.search('b..'), true);
  assert.strictEqual(d.search('...'), true);
  assert.strictEqual(d.search('....'), false); // wrong length
  assert.strictEqual(d.search('..'), false);
  console.log('211 ok');
}
