// 269. Alien Dictionary — Hard (LeetCode Premium)
// https://leetcode.com/problems/alien-dictionary/
// Pattern: Advanced Graphs (topological sort)
// Time O(total characters) | Space O(1) — at most 26 nodes
//
// Idea: adjacent words reveal one ordering fact each — the first position where they differ.
// Build those as edges and topologically sort. Two traps:
//   - only the FIRST differing character is informative; later ones say nothing;
//   - ["abc", "ab"] is invalid input: a prefix must come first, so it means no valid order.

/**
 * @param {string[]} words
 * @return {string} a valid ordering, or '' if none exists
 */
const alienOrder = (words) => {
  const dependents = new Map();
  const indegree = new Map();
  for (const word of words) {
    for (const ch of word) {
      if (!dependents.has(ch)) dependents.set(ch, new Set());
      if (!indegree.has(ch)) indegree.set(ch, 0);
    }
  }

  for (let i = 0; i < words.length - 1; i++) {
    const a = words[i];
    const b = words[i + 1];
    if (a.length > b.length && a.startsWith(b)) return ''; // invalid: prefix sorted after
    const limit = Math.min(a.length, b.length);
    for (let j = 0; j < limit; j++) {
      if (a[j] === b[j]) continue;
      if (!dependents.get(a[j]).has(b[j])) {
        dependents.get(a[j]).add(b[j]);
        indegree.set(b[j], indegree.get(b[j]) + 1);
      }
      break; // only the first difference carries information
    }
  }

  const queue = [...indegree].filter(([, deg]) => deg === 0).map(([ch]) => ch);
  const order = [];
  while (queue.length) {
    const ch = queue.shift();
    order.push(ch);
    for (const next of dependents.get(ch)) {
      indegree.set(next, indegree.get(next) - 1);
      if (indegree.get(next) === 0) queue.push(next);
    }
  }
  return order.length === indegree.size ? order.join('') : ''; // short => cycle
};

module.exports = { alienOrder };

if (require.main === module) {
  const assert = require('node:assert');

  // Verify an ordering is consistent rather than pinning one of several valid answers.
  const consistent = (words, order) => {
    if (!order) return false;
    const rank = new Map([...order].map((ch, i) => [ch, i]));
    for (let i = 0; i < words.length - 1; i++) {
      const a = words[i];
      const b = words[i + 1];
      let decided = false;
      for (let j = 0; j < Math.min(a.length, b.length); j++) {
        if (a[j] === b[j]) continue;
        if (rank.get(a[j]) > rank.get(b[j])) return false;
        decided = true;
        break;
      }
      if (!decided && a.length > b.length) return false;
    }
    return true;
  };

  const words = ['wrt', 'wrf', 'er', 'ett', 'rftt'];
  assert.ok(consistent(words, alienOrder(words)));
  assert.strictEqual(alienOrder(['z', 'x', 'z']), ''); // cycle
  assert.strictEqual(alienOrder(['abc', 'ab']), ''); // prefix ordering violation
  assert.strictEqual(alienOrder(['z', 'x']), 'zx');
  assert.strictEqual(alienOrder(['a']), 'a');
  console.log('269 ok');
}
