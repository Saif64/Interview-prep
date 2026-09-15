// 206. Reverse Linked List — Easy
// https://leetcode.com/problems/reverse-linked-list/
// Pattern: Linked List
// Time O(n) | Space O(1)
//
// The three-pointer shuffle that half this folder depends on. Save `next` before
// overwriting `current.next`, or you lose the rest of the list.

/**
 * @param {ListNode} head
 * @return {ListNode}
 */
const reverseList = (head) => {
  let prev = null;
  let current = head;
  while (current) {
    const next = current.next;
    current.next = prev;
    prev = current;
    current = next;
  }
  return prev;
};

/** Recursive variant — O(n) stack, sometimes asked as a follow-up. */
const reverseListRecursive = (head) => {
  if (!head || !head.next) return head;
  const newHead = reverseListRecursive(head.next);
  head.next.next = head;
  head.next = null;
  return newHead;
};

module.exports = { reverseList, reverseListRecursive };

if (require.main === module) {
  const assert = require('node:assert');
  const { toList, fromList } = require('../_lib');
  for (const fn of [reverseList, reverseListRecursive]) {
    assert.deepStrictEqual(fromList(fn(toList([1, 2, 3, 4, 5]))), [5, 4, 3, 2, 1]);
    assert.deepStrictEqual(fromList(fn(toList([1, 2]))), [2, 1]);
    assert.deepStrictEqual(fromList(fn(toList([]))), []);
    assert.deepStrictEqual(fromList(fn(toList([7]))), [7]);
  }
  console.log('206 ok');
}
