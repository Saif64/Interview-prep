// 21. Merge Two Sorted Lists — Easy
// https://leetcode.com/problems/merge-two-sorted-lists/
// Pattern: Linked List
// Time O(m + n) | Space O(1) — nodes are relinked, not copied
//
// Idea: the merge step of merge sort. A dummy head removes the "is this the first node?"
// branch, and when one list runs out the other can be attached wholesale.

const { ListNode } = require('../_lib');

/**
 * @param {ListNode} list1
 * @param {ListNode} list2
 * @return {ListNode}
 */
const mergeTwoLists = (list1, list2) => {
  const dummy = new ListNode();
  let tail = dummy;

  while (list1 && list2) {
    if (list1.val <= list2.val) {
      tail = tail.next = list1;
      list1 = list1.next;
    } else {
      tail = tail.next = list2;
      list2 = list2.next;
    }
  }
  tail.next = list1 ?? list2;
  return dummy.next;
};

module.exports = { mergeTwoLists };

if (require.main === module) {
  const assert = require('node:assert');
  const { toList, fromList } = require('../_lib');
  const run = (a, b) => fromList(mergeTwoLists(toList(a), toList(b)));
  assert.deepStrictEqual(run([1, 2, 4], [1, 3, 4]), [1, 1, 2, 3, 4, 4]);
  assert.deepStrictEqual(run([], []), []);
  assert.deepStrictEqual(run([], [0]), [0]);
  assert.deepStrictEqual(run([1, 2, 3], []), [1, 2, 3]);
  console.log('21 ok');
}
