// 141. Linked List Cycle — Easy
// https://leetcode.com/problems/linked-list-cycle/
// Pattern: Linked List (Floyd's tortoise and hare)
// Time O(n) | Space O(1)
//
// Idea: a fast pointer moving two steps gains one step per iteration on a slow pointer.
// Inside a cycle the gap must eventually hit zero, so they meet. A Set of visited nodes
// also works but costs O(n) space — the whole point here is O(1).

/**
 * @param {ListNode} head
 * @return {boolean}
 */
const hasCycle = (head) => {
  let slow = head;
  let fast = head;
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
    if (slow === fast) return true;
  }
  return false;
};

module.exports = { hasCycle };

if (require.main === module) {
  const assert = require('node:assert');
  const { toList } = require('../_lib');

  const withCycle = (arr, pos) => {
    const head = toList(arr);
    if (pos < 0) return head;
    let tail = head;
    while (tail.next) tail = tail.next;
    let target = head;
    for (let i = 0; i < pos; i++) target = target.next;
    tail.next = target;
    return head;
  };

  assert.strictEqual(hasCycle(withCycle([3, 2, 0, -4], 1)), true);
  assert.strictEqual(hasCycle(withCycle([1, 2], 0)), true);
  assert.strictEqual(hasCycle(withCycle([1], -1)), false);
  assert.strictEqual(hasCycle(null), false);
  assert.strictEqual(hasCycle(withCycle([1], 0)), true); // self-loop
  console.log('141 ok');
}
