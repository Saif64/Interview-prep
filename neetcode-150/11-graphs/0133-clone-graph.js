// 133. Clone Graph — Medium
// https://leetcode.com/problems/clone-graph/
// Pattern: Graphs
// Time O(V + E) | Space O(V)
//
// Idea: DFS with a map from original node to its clone. The map is doing two jobs at once —
// it stores the result and it is the visited set, which is what stops a cycle from
// recursing forever. Create the clone and record it *before* recursing into neighbours.

class GraphNode {
  constructor(val = 0, neighbors = []) {
    this.val = val;
    this.neighbors = neighbors;
  }
}

/**
 * @param {GraphNode} node
 * @return {GraphNode}
 */
const cloneGraph = (node) => {
  const clones = new Map();

  const dfs = (original) => {
    if (!original) return null;
    if (clones.has(original)) return clones.get(original);

    const clone = new GraphNode(original.val);
    clones.set(original, clone); // record before recursing, or a cycle loops forever
    for (const neighbor of original.neighbors) clone.neighbors.push(dfs(neighbor));
    return clone;
  };

  return dfs(node);
};

module.exports = { cloneGraph, GraphNode };

if (require.main === module) {
  const assert = require('node:assert');

  // Build from an adjacency list where index i is node i+1.
  const build = (adj) => {
    if (!adj.length) return null;
    const nodes = adj.map((_, i) => new GraphNode(i + 1));
    adj.forEach((neighbors, i) => {
      nodes[i].neighbors = neighbors.map((n) => nodes[n - 1]);
    });
    return nodes[0];
  };
  const dump = (start) => {
    if (!start) return [];
    const seen = new Map();
    const stack = [start];
    while (stack.length) {
      const n = stack.pop();
      if (seen.has(n.val)) continue;
      seen.set(n.val, n.neighbors.map((x) => x.val).sort((a, b) => a - b));
      stack.push(...n.neighbors);
    }
    return [...seen.entries()].sort((a, b) => a[0] - b[0]);
  };

  for (const adj of [[[2, 4], [1, 3], [2, 4], [1, 3]], [[]], [], [[2], [1]]]) {
    const original = build(adj);
    const copy = cloneGraph(original);
    assert.deepStrictEqual(dump(copy), dump(original));
    if (original) assert.notStrictEqual(copy, original); // genuinely a copy
  }
  console.log('133 ok');
}
