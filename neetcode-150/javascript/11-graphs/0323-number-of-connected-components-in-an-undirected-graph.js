// 323. Number of Connected Components in an Undirected Graph — Medium (LeetCode Premium)
// https://leetcode.com/problems/number-of-connected-components-in-an-undirected-graph/
// Pattern: Graphs (union-find)
// Time O(E * α(V)) ~ O(E) | Space O(V)
//
// Idea: start with n components and subtract one every time an edge merges two distinct
// sets. Edges within an already-merged component change nothing.
// Union by rank keeps the trees flat; with path compression the find is near constant.

/**
 * @param {number} n
 * @param {number[][]} edges
 * @return {number}
 */
const countComponents = (n, edges) => {
  const parent = Array.from({ length: n }, (_, i) => i);
  const rank = new Array(n).fill(1);

  const find = (x) => {
    while (parent[x] !== x) {
      parent[x] = parent[parent[x]];
      x = parent[x];
    }
    return x;
  };

  let components = n;
  for (const [a, b] of edges) {
    const rootA = find(a);
    const rootB = find(b);
    if (rootA === rootB) continue;
    if (rank[rootA] < rank[rootB]) parent[rootA] = rootB;
    else if (rank[rootA] > rank[rootB]) parent[rootB] = rootA;
    else {
      parent[rootB] = rootA;
      rank[rootA]++;
    }
    components--;
  }
  return components;
};

module.exports = { countComponents };

if (require.main === module) {
  const assert = require('node:assert');
  assert.strictEqual(countComponents(5, [[0, 1], [1, 2], [3, 4]]), 2);
  assert.strictEqual(countComponents(5, [[0, 1], [1, 2], [2, 3], [3, 4]]), 1);
  assert.strictEqual(countComponents(4, []), 4); // all isolated
  assert.strictEqual(countComponents(1, []), 1);
  assert.strictEqual(countComponents(3, [[0, 1], [0, 1]]), 2); // a repeated edge is harmless
  console.log('323 ok');
}
