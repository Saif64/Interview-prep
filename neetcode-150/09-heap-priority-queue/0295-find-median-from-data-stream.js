// 295. Find Median from Data Stream — Hard
// https://leetcode.com/problems/find-median-from-data-stream/
// Pattern: Heap
// Time: addNum O(log n), findMedian O(1) | Space O(n)
//
// Idea: two heaps facing each other. A max-heap holds the smaller half, a min-heap the
// larger half. The median is then either the top of the bigger heap or the average of both
// tops. Two invariants keep it honest: every element in `low` <= every element in `high`,
// and the sizes never differ by more than one.

const { Heap } = require('../_lib');

class MedianFinder {
  constructor() {
    this.low = new Heap((a, b) => b - a); // max-heap, smaller half
    this.high = new Heap((a, b) => a - b); // min-heap, larger half
  }

  /** @param {number} num */
  addNum(num) {
    this.low.push(num);
    this.high.push(this.low.pop()); // route through low to preserve the ordering invariant
    if (this.high.size > this.low.size) this.low.push(this.high.pop());
  }

  /** @return {number} */
  findMedian() {
    if (this.low.size === this.high.size) return (this.low.peek() + this.high.peek()) / 2;
    return this.low.peek();
  }
}

module.exports = { MedianFinder };

if (require.main === module) {
  const assert = require('node:assert');
  const m = new MedianFinder();
  m.addNum(1);
  assert.strictEqual(m.findMedian(), 1);
  m.addNum(2);
  assert.strictEqual(m.findMedian(), 1.5);
  m.addNum(3);
  assert.strictEqual(m.findMedian(), 2);

  // Cross-check against a sorted array on random input.
  const f = new MedianFinder();
  const seen = [];
  for (let i = 0; i < 300; i++) {
    const v = Math.floor(Math.random() * 1000) - 500;
    f.addNum(v);
    seen.push(v);
    seen.sort((a, b) => a - b);
    const mid = seen.length >> 1;
    const expected = seen.length % 2 ? seen[mid] : (seen[mid - 1] + seen[mid]) / 2;
    assert.strictEqual(f.findMedian(), expected);
  }
  console.log('295 ok');
}
