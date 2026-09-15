// 127. Word Ladder — Hard
// https://leetcode.com/problems/word-ladder/
// Pattern: Graphs (BFS)
// Time O(n * L^2) for n words of length L | Space O(n * L)
//
// Idea: words are nodes, one-letter changes are edges, and "shortest transformation" is
// plain BFS. Comparing every pair of words to build edges is O(n^2 * L); instead bucket
// words by wildcard patterns ("h*t"), so neighbours are a map lookup.

/**
 * @param {string} beginWord
 * @param {string} endWord
 * @param {string[]} wordList
 * @return {number} number of words in the shortest chain, or 0
 */
const ladderLength = (beginWord, endWord, wordList) => {
  const words = new Set(wordList);
  if (!words.has(endWord)) return 0;

  const buckets = new Map(); // "h*t" -> [hot, hat, ...]
  for (const word of [beginWord, ...wordList]) {
    for (let i = 0; i < word.length; i++) {
      const pattern = word.slice(0, i) + '*' + word.slice(i + 1);
      if (!buckets.has(pattern)) buckets.set(pattern, []);
      buckets.get(pattern).push(word);
    }
  }

  const seen = new Set([beginWord]);
  let queue = [beginWord];
  let steps = 1;

  while (queue.length) {
    const next = [];
    for (const word of queue) {
      if (word === endWord) return steps;
      for (let i = 0; i < word.length; i++) {
        const pattern = word.slice(0, i) + '*' + word.slice(i + 1);
        for (const neighbor of buckets.get(pattern) ?? []) {
          if (seen.has(neighbor)) continue;
          seen.add(neighbor);
          next.push(neighbor);
        }
      }
    }
    queue = next;
    steps++;
  }
  return 0;
};

module.exports = { ladderLength };

if (require.main === module) {
  const assert = require('node:assert');
  assert.strictEqual(ladderLength('hit', 'cog', ['hot', 'dot', 'dog', 'lot', 'log', 'cog']), 5);
  assert.strictEqual(ladderLength('hit', 'cog', ['hot', 'dot', 'dog', 'lot', 'log']), 0); // end missing
  assert.strictEqual(ladderLength('a', 'c', ['a', 'b', 'c']), 2);
  assert.strictEqual(ladderLength('hot', 'dog', ['hot', 'dog']), 0); // no single-letter bridge
  console.log('127 ok');
}
