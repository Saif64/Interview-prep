// 2. Add Two Numbers — Medium
// https://leetcode.com/problems/add-two-numbers/
// Pattern: Linked List
// Time O(max(m, n)) | Space O(max(m, n)) for the output
//
// Idea: schoolbook addition, least significant digit first (which is how the list is
// already stored). The loop condition includes `carry` so a final 1 still gets a node.

const { ListNode } = require('../_lib');

/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
const addTwoNumbers = (l1, l2) => {
  const dummy = new ListNode();
  let tail = dummy;
  let carry = 0;

  while (l1 || l2 || carry) {
    const sum = (l1?.val ?? 0) + (l2?.val ?? 0) + carry;
    carry = Math.floor(sum / 10);
    tail = tail.next = new ListNode(sum % 10);
    l1 = l1?.next ?? null;
    l2 = l2?.next ?? null;
  }
  return dummy.next;
};

module.exports = { addTwoNumbers };

if (require.main === module) {
  const assert = require('node:assert');
  const { toList, fromList } = require('../_lib');
  const add = (a, b) => fromList(addTwoNumbers(toList(a), toList(b)));
  assert.deepStrictEqual(add([2, 4, 3], [5, 6, 4]), [7, 0, 8]);
  assert.deepStrictEqual(add([0], [0]), [0]);
  assert.deepStrictEqual(add([9, 9, 9, 9, 9, 9, 9], [9, 9, 9, 9]), [8, 9, 9, 9, 0, 0, 0, 1]);
  assert.deepStrictEqual(add([5], [5]), [0, 1]); // carry creates a new node
  console.log('2 ok');
}
