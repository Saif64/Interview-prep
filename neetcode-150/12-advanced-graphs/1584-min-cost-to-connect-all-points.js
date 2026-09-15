// 1584. Min Cost to Connect All Points — Medium
// https://leetcode.com/problems/min-cost-to-connect-all-points/
// Pattern: Advanced Graphs (minimum spanning tree, Prim's)
// Time O(n^2 log n) | Space O(n^2)
//
// Idea: a complete graph on the points with Manhattan-distance weights; the answer is its
// minimum spanning tree. Prim's grows one tree: repeatedly take the cheapest edge leaving
// the tree. Kruskal + union-find gives the same answer and is the other standard route.

const { Heap } = require('../_lib');

/**
 * @param {number[][]} points
 * @return {number}
 */
const minCostConnectPoints = (points) => {
  const n = points.length;
  if (n <= 1) return 0;

  const heap = new Heap((a, b) => a[0] - b[0], [[0, 0]]); // [cost, pointIndex]
  const inTree = new Set();
  let total = 0;

  while (inTree.size < n) {
    const [cost, i] = heap.pop();
    if (inTree.has(i)) continue;
    inTree.add(i);
    total += cost;

    for (let j = 0; j < n; j++) {
      if (inTree.has(j)) continue;
      const distance =
        Math.abs(points[i][0] - points[j][0]) + Math.abs(points[i][1] - points[j][1]);
      heap.push([distance, j]);
    }
  }
  return total;
};

module.exports = { minCostConnectPoints };

if (require.main === module) {
  const assert = require('node:assert');
  assert.strictEqual(minCostConnectPoints([[0, 0], [2, 2], [3, 10], [5, 2], [7, 0]]), 20);
  assert.strictEqual(minCostConnectPoints([[3, 12], [-2, 5], [-4, 1]]), 18);
  assert.strictEqual(minCostConnectPoints([[0, 0]]), 0);
  assert.strictEqual(minCostConnectPoints([[0, 0], [1, 1]]), 2);
  assert.strictEqual(minCostConnectPoints([[0, 0], [0, 1], [0, 2]]), 2); // collinear
  console.log('1584 ok');
}
