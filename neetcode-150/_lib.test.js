// Tests for the shared helpers. Run: node neetcode-150/_lib.test.js
const assert = require('node:assert');
const { Heap, toList, fromList, toTree, fromTree } = require('./_lib');

// Heap behaves like a sorted drain, and agrees with Array.sort on random input.
for (let trial = 0; trial < 200; trial++) {
  const values = Array.from({ length: Math.floor(Math.random() * 30) }, () =>
    Math.floor(Math.random() * 100)
  );

  const minHeap = new Heap();
  for (const v of values) minHeap.push(v);
  const drainedMin = [];
  while (minHeap.size) drainedMin.push(minHeap.pop());
  assert.deepStrictEqual(drainedMin, [...values].sort((a, b) => a - b));

  const maxHeap = new Heap((a, b) => b - a);
  for (const v of values) maxHeap.push(v);
  const drainedMax = [];
  while (maxHeap.size) drainedMax.push(maxHeap.pop());
  assert.deepStrictEqual(drainedMax, [...values].sort((a, b) => b - a));

  // The heapify constructor must match push-one-at-a-time.
  const heapified = new Heap((a, b) => a - b, values);
  const drainedHeapified = [];
  while (heapified.size) drainedHeapified.push(heapified.pop());
  assert.deepStrictEqual(drainedHeapified, [...values].sort((a, b) => a - b));
}

assert.strictEqual(new Heap().pop(), undefined);
assert.strictEqual(new Heap().peek(), undefined);

// Comparator on tuples, the shape most problems here use.
const bySecond = new Heap((a, b) => a[1] - b[1]);
bySecond.push(['a', 3]).push(['b', 1]).push(['c', 2]);
assert.deepStrictEqual(bySecond.pop(), ['b', 1]);

// List and tree round trips.
assert.deepStrictEqual(fromList(toList([1, 2, 3])), [1, 2, 3]);
assert.deepStrictEqual(fromList(toList([])), []);
assert.deepStrictEqual(fromTree(toTree([3, 9, 20, null, null, 15, 7])), [3, 9, 20, null, null, 15, 7]);
assert.deepStrictEqual(fromTree(toTree([])), []);
assert.deepStrictEqual(fromTree(toTree([1, null, 2])), [1, null, 2]);

console.log('_lib ok');
