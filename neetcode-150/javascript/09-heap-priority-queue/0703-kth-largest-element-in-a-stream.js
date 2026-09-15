// 703. Kth Largest Element in a Stream — Easy
// https://leetcode.com/problems/kth-largest-element-in-a-stream/
// Pattern: Heap
// Time: add O(log k) | Space O(k)
//
// Idea: problem 215 made incremental. Hold a min-heap capped at k; its top is always the
// kth largest seen so far. The cap is what keeps memory O(k) instead of O(stream length).

const { Heap } = require('../_lib');

class KthLargest {
  /**
   * @param {number} k
   * @param {number[]} nums
   */
  constructor(k, nums) {
    this.k = k;
    this.heap = new Heap();
    for (const n of nums) this.add(n);
  }

  /**
   * @param {number} val
   * @return {number}
   */
  add(val) {
    this.heap.push(val);
    if (this.heap.size > this.k) this.heap.pop();
    return this.heap.peek();
  }
}

module.exports = { KthLargest };

if (require.main === module) {
  const assert = require('node:assert');
  const s = new KthLargest(3, [4, 5, 8, 2]);
  assert.strictEqual(s.add(3), 4);
  assert.strictEqual(s.add(5), 5);
  assert.strictEqual(s.add(10), 5);
  assert.strictEqual(s.add(9), 8);
  assert.strictEqual(s.add(4), 8);

  const empty = new KthLargest(1, []); // fewer than k elements to start
  assert.strictEqual(empty.add(-3), -3);
  assert.strictEqual(empty.add(-2), -2);
  console.log('703 ok');
}
