// 25. Reverse Nodes in k-Group — Hard
// https://leetcode.com/problems/reverse-nodes-in-k-group/
// Pattern: Linked List
// Time O(n) | Space O(1)
//
// Idea: for each group, first check that k nodes actually exist (a trailing partial group
// must be left alone), then reverse exactly k nodes and stitch the boundaries.
// The pointer bookkeeping is the whole difficulty — draw it before you type it.

const { ListNode } = require('../_lib');

/**
 * @param {ListNode} head
 * @param {number} k
 * @return {ListNode}
 */
const reverseKGroup = (head, k) => {
  const dummy = new ListNode(0, head);
  let groupPrev = dummy;

  while (true) {
    // Does a full group of k remain?
    let scout = groupPrev;
    for (let i = 0; i < k && scout; i++) scout = scout.next;
    if (!scout) break;

    const groupNext = scout.next;
    let prev = groupNext;
    let current = groupPrev.next;
    for (let i = 0; i < k; i++) {
      const next = current.next;
      current.next = prev;
      prev = current;
      current = next;
    }

    const newGroupPrev = groupPrev.next; // old head is the new tail
    groupPrev.next = prev;
    groupPrev = newGroupPrev;
  }
  return dummy.next;
};

module.exports = { reverseKGroup };

if (require.main === module) {
  const assert = require('node:assert');
  const { toList, fromList } = require('../_lib');
  const run = (arr, k) => fromList(reverseKGroup(toList(arr), k));
  assert.deepStrictEqual(run([1, 2, 3, 4, 5], 2), [2, 1, 4, 3, 5]);
  assert.deepStrictEqual(run([1, 2, 3, 4, 5], 3), [3, 2, 1, 4, 5]); // partial tail untouched
  assert.deepStrictEqual(run([1, 2, 3, 4, 5], 1), [1, 2, 3, 4, 5]);
  assert.deepStrictEqual(run([1, 2], 3), [1, 2]); // shorter than k
  assert.deepStrictEqual(run([], 2), []);
  console.log('25 ok');
}
