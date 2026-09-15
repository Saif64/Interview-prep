// 143. Reorder List — Medium
// https://leetcode.com/problems/reorder-list/
// Pattern: Linked List
// Time O(n) | Space O(1)
//
// Idea: three standard sub-routines glued together — find the middle (slow/fast), reverse
// the second half, then weave the halves together. Recognising a problem as a composition
// of primitives you already know is most of what "being good at linked lists" means.

/**
 * @param {ListNode} head
 * @return {void} modified in place
 */
const reorderList = (head) => {
  if (!head || !head.next) return;

  // 1. middle
  let slow = head;
  let fast = head.next;
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
  }

  // 2. reverse the second half, and cut it off the first
  let second = slow.next;
  slow.next = null;
  let prev = null;
  while (second) {
    const next = second.next;
    second.next = prev;
    prev = second;
    second = next;
  }

  // 3. weave
  let first = head;
  second = prev;
  while (second) {
    const n1 = first.next;
    const n2 = second.next;
    first.next = second;
    second.next = n1;
    first = n1;
    second = n2;
  }
};

module.exports = { reorderList };

if (require.main === module) {
  const assert = require('node:assert');
  const { toList, fromList } = require('../_lib');
  const run = (arr) => {
    const head = toList(arr);
    reorderList(head);
    return fromList(head);
  };
  assert.deepStrictEqual(run([1, 2, 3, 4]), [1, 4, 2, 3]);
  assert.deepStrictEqual(run([1, 2, 3, 4, 5]), [1, 5, 2, 4, 3]);
  assert.deepStrictEqual(run([1]), [1]);
  assert.deepStrictEqual(run([1, 2]), [1, 2]);
  assert.deepStrictEqual(run([1, 2, 3]), [1, 3, 2]);
  console.log('143 ok');
}
