// 19. Remove Nth Node From End of List — Medium
// https://leetcode.com/problems/remove-nth-node-from-end-of-list/
// Pattern: Linked List (two pointers)
// Time O(n), one pass | Space O(1)
//
// Idea: send a scout n steps ahead, then advance both until the scout falls off the end;
// the trailing pointer is now just before the target. The dummy head is what makes
// "remove the first node" need no special case.

const { ListNode } = require('../_lib');

/**
 * @param {ListNode} head
 * @param {number} n
 * @return {ListNode}
 */
const removeNthFromEnd = (head, n) => {
  const dummy = new ListNode(0, head);
  let slow = dummy;
  let fast = dummy;

  for (let i = 0; i < n; i++) fast = fast.next;
  while (fast.next) {
    slow = slow.next;
    fast = fast.next;
  }
  slow.next = slow.next.next;
  return dummy.next;
};

module.exports = { removeNthFromEnd };

if (require.main === module) {
  const assert = require('node:assert');
  const { toList, fromList } = require('../_lib');
  const run = (arr, n) => fromList(removeNthFromEnd(toList(arr), n));
  assert.deepStrictEqual(run([1, 2, 3, 4, 5], 2), [1, 2, 3, 5]);
  assert.deepStrictEqual(run([1], 1), []); // list becomes empty
  assert.deepStrictEqual(run([1, 2], 1), [1]);
  assert.deepStrictEqual(run([1, 2], 2), [2]); // removing the head
  console.log('19 ok');
}
