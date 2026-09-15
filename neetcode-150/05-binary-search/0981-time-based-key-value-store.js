// 981. Time Based Key-Value Store — Medium
// https://leetcode.com/problems/time-based-key-value-store/
// Pattern: Binary Search
// Time: set O(1), get O(log n) | Space O(n)
//
// Idea: per key, an append-only list of [timestamp, value]. The problem guarantees
// timestamps arrive increasing, so the list is already sorted and `get` is a binary search
// for the largest timestamp <= the query — the "floor" flavour of binary search.

class TimeMap {
  constructor() {
    this.store = new Map(); // key -> [[timestamp, value], ...] ascending
  }

  /**
   * @param {string} key
   * @param {string} value
   * @param {number} timestamp
   */
  set(key, value, timestamp) {
    if (!this.store.has(key)) this.store.set(key, []);
    this.store.get(key).push([timestamp, value]);
  }

  /**
   * @param {string} key
   * @param {number} timestamp
   * @return {string}
   */
  get(key, timestamp) {
    const entries = this.store.get(key);
    if (!entries) return '';

    let lo = 0;
    let hi = entries.length - 1;
    let best = '';
    while (lo <= hi) {
      const mid = (lo + hi) >> 1;
      if (entries[mid][0] <= timestamp) {
        best = entries[mid][1]; // candidate; keep looking for a later one
        lo = mid + 1;
      } else {
        hi = mid - 1;
      }
    }
    return best;
  }
}

module.exports = { TimeMap };

if (require.main === module) {
  const assert = require('node:assert');
  const t = new TimeMap();
  t.set('foo', 'bar', 1);
  assert.strictEqual(t.get('foo', 1), 'bar');
  assert.strictEqual(t.get('foo', 3), 'bar'); // falls back to the latest <= 3
  t.set('foo', 'bar2', 4);
  assert.strictEqual(t.get('foo', 4), 'bar2');
  assert.strictEqual(t.get('foo', 5), 'bar2');
  assert.strictEqual(t.get('foo', 0), ''); // nothing set that early
  assert.strictEqual(t.get('missing', 1), '');
  console.log('981 ok');
}
