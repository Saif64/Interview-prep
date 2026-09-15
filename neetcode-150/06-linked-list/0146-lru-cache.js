// 146. LRU Cache — Medium
// https://leetcode.com/problems/lru-cache/
// Pattern: Linked List + Hash Map
// Time O(1) per operation | Space O(capacity)
//
// Idea: the textbook answer is a hash map plus a doubly linked list. In JavaScript, Map
// already keeps insertion order and exposes it cheaply, so delete-then-set moves a key to
// the "most recent" end and `keys().next().value` is the least recent.
// Know the manual version too — an interviewer may specifically ask for it.

class LRUCache {
  /** @param {number} capacity */
  constructor(capacity) {
    this.capacity = capacity;
    this.map = new Map();
  }

  /**
   * @param {number} key
   * @return {number} -1 when absent
   */
  get(key) {
    if (!this.map.has(key)) return -1;
    const value = this.map.get(key);
    this.map.delete(key);
    this.map.set(key, value); // reinsert => now the most recently used
    return value;
  }

  /**
   * @param {number} key
   * @param {number} value
   */
  put(key, value) {
    if (this.map.has(key)) this.map.delete(key);
    this.map.set(key, value);
    if (this.map.size > this.capacity) {
      this.map.delete(this.map.keys().next().value); // evict least recently used
    }
  }
}

module.exports = { LRUCache };

if (require.main === module) {
  const assert = require('node:assert');
  const c = new LRUCache(2);
  c.put(1, 1);
  c.put(2, 2);
  assert.strictEqual(c.get(1), 1);
  c.put(3, 3); // evicts key 2 (1 was just used)
  assert.strictEqual(c.get(2), -1);
  c.put(4, 4); // evicts key 1
  assert.strictEqual(c.get(1), -1);
  assert.strictEqual(c.get(3), 3);
  assert.strictEqual(c.get(4), 4);

  const one = new LRUCache(1);
  one.put(1, 1);
  one.put(2, 2);
  assert.strictEqual(one.get(1), -1);

  const update = new LRUCache(2);
  update.put(1, 1);
  update.put(2, 2);
  update.put(1, 10); // update must also refresh recency
  update.put(3, 3);
  assert.strictEqual(update.get(2), -1);
  assert.strictEqual(update.get(1), 10);
  console.log('146 ok');
}
