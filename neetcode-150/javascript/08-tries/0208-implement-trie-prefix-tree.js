// 208. Implement Trie (Prefix Tree) — Medium
// https://leetcode.com/problems/implement-trie-prefix-tree/
// Pattern: Tries
// Time O(len) per operation | Space O(total characters inserted)
//
// Idea: a tree where each edge is a character. `isWord` marks the end of a real word, which
// is the only difference between `search` ("apple" was inserted) and `startsWith`
// ("app" is a prefix of something). A Set of strings answers search in O(1) but cannot
// answer prefix queries without scanning everything — that is why the trie earns its keep.

class TrieNode {
  constructor() {
    this.children = new Map();
    this.isWord = false;
  }
}

class Trie {
  constructor() {
    this.root = new TrieNode();
  }

  /** @param {string} word */
  insert(word) {
    let node = this.root;
    for (const ch of word) {
      if (!node.children.has(ch)) node.children.set(ch, new TrieNode());
      node = node.children.get(ch);
    }
    node.isWord = true;
  }

  /** Walk the given characters, or return null if the path does not exist. */
  _find(prefix) {
    let node = this.root;
    for (const ch of prefix) {
      node = node.children.get(ch);
      if (!node) return null;
    }
    return node;
  }

  /** @param {string} word @return {boolean} */
  search(word) {
    return this._find(word)?.isWord ?? false;
  }

  /** @param {string} prefix @return {boolean} */
  startsWith(prefix) {
    return this._find(prefix) !== null;
  }
}

module.exports = { Trie, TrieNode };

if (require.main === module) {
  const assert = require('node:assert');
  const t = new Trie();
  t.insert('apple');
  assert.strictEqual(t.search('apple'), true);
  assert.strictEqual(t.search('app'), false); // a prefix is not a word
  assert.strictEqual(t.startsWith('app'), true);
  t.insert('app');
  assert.strictEqual(t.search('app'), true);
  assert.strictEqual(t.startsWith('apx'), false);
  assert.strictEqual(t.search(''), false);
  t.insert('');
  assert.strictEqual(t.search(''), true); // the root itself can be a word
  console.log('208 ok');
}
