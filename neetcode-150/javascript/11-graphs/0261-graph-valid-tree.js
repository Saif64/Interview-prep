// 261. Graph Valid Tree — Medium (LeetCode Premium)
// https://leetcode.com/problems/graph-valid-tree/
// Pattern: Graphs (union-find)
// Time O(E * α(V)) ~ O(E) | Space O(V)
//
// Idea: a graph on n nodes is a tree exactly when it has n - 1 edges AND is fully connected.
// Check the edge count first (it is O(1) and rules out most inputs), then union every edge —
// if a union ever joins two nodes already in the same set, that edge closes a cycle.

/**
 * @param {number} n
 * @param {number[][]} edges
 * @return {boolean}
 */
const validTree = (n, edges) => {
  if (edges.length !== n - 1) return false; // too few => disconnected, too many => cycle

  const parent = Array.from({ length: n }, (_, i) => i);
  const find = (x) => {
    while (parent[x] !== x) {
      parent[x] = parent[parent[x]]; // path halving
      x = parent[x];
    }
    return x;
  };

  for (const [a, b] of edges) {
    const rootA = find(a);
    const rootB = find(b);
    if (rootA === rootB) return false; // cycle
    parent[rootA] = rootB;
  }
  return true;
};

module.exports = { validTree };

if (require.main === module) {
  const assert = require('node:assert');
  assert.strictEqual(validTree(5, [[0, 1], [0, 2], [0, 3], [1, 4]]), true);
  assert.strictEqual(validTree(5, [[0, 1], [1, 2], [2, 3], [1, 3], [1, 4]]), false); // cycle
  assert.strictEqual(validTree(1, []), true);
  assert.strictEqual(validTree(2, []), false); // disconnected
  assert.strictEqual(validTree(4, [[0, 1], [2, 3], [1, 2]]), true);
  console.log('261 ok');
}
