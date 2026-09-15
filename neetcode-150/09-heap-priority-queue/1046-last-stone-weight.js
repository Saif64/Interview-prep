// 1046. Last Stone Weight — Easy
// https://leetcode.com/problems/last-stone-weight/
// Pattern: Heap
// Time O(n log n) | Space O(n)
//
// Idea: a max-heap is a direct translation of the rules — repeatedly take the two heaviest
// stones and push back the difference when they do not cancel out.
// Re-sorting the array each round would also work but costs O(n^2 log n).

const { Heap } = require('../_lib');

/**
 * @param {number[]} stones
 * @return {number}
 */
const lastStoneWeight = (stones) => {
  const heap = new Heap((a, b) => b - a, stones); // max-heap, built in O(n)
  while (heap.size > 1) {
    const first = heap.pop();
    const second = heap.pop();
    if (first !== second) heap.push(first - second);
  }
  return heap.size ? heap.peek() : 0;
};

module.exports = { lastStoneWeight };

if (require.main === module) {
  const assert = require('node:assert');
  assert.strictEqual(lastStoneWeight([2, 7, 4, 1, 8, 1]), 1);
  assert.strictEqual(lastStoneWeight([1]), 1);
  assert.strictEqual(lastStoneWeight([2, 2]), 0); // everything cancels
  assert.strictEqual(lastStoneWeight([]), 0);
  assert.strictEqual(lastStoneWeight([3, 7, 2]), 2);
  console.log('1046 ok');
}
