// 973. K Closest Points to Origin — Medium
// https://leetcode.com/problems/k-closest-points-to-origin/
// Pattern: Heap
// Time O(n log k) | Space O(k)
//
// Idea: a max-heap of size k keyed on distance; anything farther than its top is dropped.
// Compare squared distances — the square root is monotonic, so it changes no ordering and
// only costs precision and time.

const { Heap } = require('../_lib');

/**
 * @param {number[][]} points
 * @param {number} k
 * @return {number[][]}
 */
const kClosest = (points, k) => {
  const heap = new Heap((a, b) => b[0] - a[0]); // max-heap on squared distance
  for (const [x, y] of points) {
    heap.push([x * x + y * y, [x, y]]);
    if (heap.size > k) heap.pop();
  }
  return heap.items.map(([, point]) => point);
};

module.exports = { kClosest };

if (require.main === module) {
  const assert = require('node:assert');
  const { sorted } = require('../_lib');
  assert.deepStrictEqual(sorted(kClosest([[1, 3], [-2, 2]], 1)), sorted([[-2, 2]]));
  assert.deepStrictEqual(sorted(kClosest([[3, 3], [5, -1], [-2, 4]], 2)), sorted([[3, 3], [-2, 4]]));
  assert.deepStrictEqual(kClosest([[0, 1]], 1), [[0, 1]]);
  assert.strictEqual(kClosest([[1, 1], [2, 2], [3, 3]], 3).length, 3); // k equals the input size
  console.log('973 ok');
}
