// 743. Network Delay Time — Medium
// https://leetcode.com/problems/network-delay-time/
// Pattern: Advanced Graphs (Dijkstra)
// Time O(E log V) | Space O(V + E)
//
// Idea: textbook Dijkstra. The signal reaches every node at its shortest-path distance, so
// the answer is the largest of those — and -1 if any node is unreachable.
// The pop-and-skip-if-seen pattern is what makes a heap without decrease-key correct.

const { Heap } = require('../_lib');

/**
 * @param {number[][]} times  [source, target, weight]
 * @param {number} n
 * @param {number} k  starting node (1-indexed)
 * @return {number}
 */
const networkDelayTime = (times, n, k) => {
  const adjacency = new Map();
  for (const [from, to, weight] of times) {
    if (!adjacency.has(from)) adjacency.set(from, []);
    adjacency.get(from).push([to, weight]);
  }

  const heap = new Heap((a, b) => a[0] - b[0], [[0, k]]); // [distance, node]
  const seen = new Set();
  let last = 0;

  while (heap.size) {
    const [distance, node] = heap.pop();
    if (seen.has(node)) continue; // a shorter route already settled this node
    seen.add(node);
    last = distance;
    for (const [next, weight] of adjacency.get(node) ?? []) {
      if (!seen.has(next)) heap.push([distance + weight, next]);
    }
  }
  return seen.size === n ? last : -1;
};

module.exports = { networkDelayTime };

if (require.main === module) {
  const assert = require('node:assert');
  assert.strictEqual(networkDelayTime([[2, 1, 1], [2, 3, 1], [3, 4, 1]], 4, 2), 2);
  assert.strictEqual(networkDelayTime([[1, 2, 1]], 2, 1), 1);
  assert.strictEqual(networkDelayTime([[1, 2, 1]], 2, 2), -1); // node 1 unreachable
  assert.strictEqual(networkDelayTime([], 1, 1), 0);
  // A long cheap path must beat a short expensive one.
  assert.strictEqual(networkDelayTime([[1, 2, 100], [1, 3, 1], [3, 2, 1]], 3, 1), 2);
  console.log('743 ok');
}
