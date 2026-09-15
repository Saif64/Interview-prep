// 138. Copy List with Random Pointer — Medium
// https://leetcode.com/problems/copy-list-with-random-pointer/
// Pattern: Linked List + Hash Map
// Time O(n) | Space O(n)
//
// Idea: two passes. The first creates every clone and records original -> clone, so the
// second pass can wire `next` and `random` by lookup. One pass fails because `random` can
// point at a node you have not created yet — the map is what removes the ordering problem.
// Follow-up worth mentioning: interleaving clones into the original list gets it to O(1).

class RandomNode {
  constructor(val = 0, next = null, random = null) {
    this.val = val;
    this.next = next;
    this.random = random;
  }
}

/**
 * @param {RandomNode} head
 * @return {RandomNode}
 */
const copyRandomList = (head) => {
  const clones = new Map([[null, null]]);

  for (let node = head; node; node = node.next) {
    clones.set(node, new RandomNode(node.val));
  }
  for (let node = head; node; node = node.next) {
    const clone = clones.get(node);
    clone.next = clones.get(node.next) ?? null;
    clone.random = clones.get(node.random) ?? null;
  }
  return clones.get(head) ?? null;
};

module.exports = { copyRandomList, RandomNode };

if (require.main === module) {
  const assert = require('node:assert');

  // Build from LeetCode's [[val, randomIndex], ...] format.
  const build = (spec) => {
    const nodes = spec.map(([val]) => new RandomNode(val));
    nodes.forEach((node, i) => {
      node.next = nodes[i + 1] ?? null;
      node.random = spec[i][1] === null ? null : nodes[spec[i][1]];
    });
    return nodes[0] ?? null;
  };
  const dump = (head) => {
    const order = new Map();
    for (let n = head, i = 0; n; n = n.next, i++) order.set(n, i);
    const out = [];
    for (let n = head; n; n = n.next) out.push([n.val, n.random === null ? null : order.get(n.random)]);
    return out;
  };

  for (const spec of [
    [[7, null], [13, 0], [11, 4], [10, 2], [1, 0]],
    [[1, 1], [2, 1]],
    [[3, null], [3, 0], [3, null]],
    [],
  ]) {
    const original = build(spec);
    const copy = copyRandomList(original);
    assert.deepStrictEqual(dump(copy), spec);
    // It must be a deep copy, not the same nodes.
    for (let a = original, b = copy; a; a = a.next, b = b.next) assert.notStrictEqual(a, b);
  }
  console.log('138 ok');
}
