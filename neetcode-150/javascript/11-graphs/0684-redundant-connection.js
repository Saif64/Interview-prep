// 684. Redundant Connection — Medium
// https://leetcode.com/problems/redundant-connection/
// Pattern: Graphs (union-find)
// Time O(E * α(V)) ~ O(E) | Space O(V)
//
// Idea: process edges in order and union them. The first edge whose endpoints are already
// connected is the one that closes a cycle — and since the problem asks for the last such
// edge in the input, processing in order and returning immediately gives exactly that.

/**
 * @param {number[][]} edges  1-indexed nodes
 * @return {number[]}
 */
const findRedundantConnection = (edges) => {
  const parent = Array.from({ length: edges.length + 1 }, (_, i) => i);
  const find = (x) => {
    while (parent[x] !== x) {
      parent[x] = parent[parent[x]];
      x = parent[x];
    }
    return x;
  };

  for (const [a, b] of edges) {
    const rootA = find(a);
    const rootB = find(b);
    if (rootA === rootB) return [a, b];
    parent[rootA] = rootB;
  }
  return [];
};

module.exports = { findRedundantConnection };

if (require.main === module) {
  const assert = require('node:assert');
  assert.deepStrictEqual(findRedundantConnection([[1, 2], [1, 3], [2, 3]]), [2, 3]);
  assert.deepStrictEqual(findRedundantConnection([[1, 2], [2, 3], [3, 4], [1, 4], [1, 5]]), [1, 4]);
  assert.deepStrictEqual(findRedundantConnection([[1, 2], [2, 3], [1, 3]]), [1, 3]);
  console.log('684 ok');
}
