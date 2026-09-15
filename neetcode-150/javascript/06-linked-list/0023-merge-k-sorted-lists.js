// 23. Merge k Sorted Lists — Hard
// https://leetcode.com/problems/merge-k-sorted-lists/
// Pattern: Linked List / Heap
// Time O(n log k) | Space O(1) extra
//
// Idea: merge lists pairwise in rounds, halving the count each round — log k rounds over
// n total nodes. A min-heap of list heads gives the same O(n log k) and is worth naming
// as the alternative; this version avoids needing a heap implementation at all.

const { mergeTwoLists } = require('./0021-merge-two-sorted-lists');

/**
 * @param {ListNode[]} lists
 * @return {ListNode}
 */
const mergeKLists = (lists) => {
  if (!lists.length) return null;
  let queue = lists;
  while (queue.length > 1) {
    const merged = [];
    for (let i = 0; i < queue.length; i += 2) {
      merged.push(mergeTwoLists(queue[i], queue[i + 1] ?? null));
    }
    queue = merged;
  }
  return queue[0];
};

module.exports = { mergeKLists };

if (require.main === module) {
  const assert = require('node:assert');
  const { toList, fromList } = require('../_lib');
  const run = (arrs) => fromList(mergeKLists(arrs.map(toList)));
  assert.deepStrictEqual(run([[1, 4, 5], [1, 3, 4], [2, 6]]), [1, 1, 2, 3, 4, 4, 5, 6]);
  assert.deepStrictEqual(run([]), []);
  assert.deepStrictEqual(run([[]]), []);
  assert.deepStrictEqual(run([[], [1]]), [1]); // odd count with an empty list
  assert.deepStrictEqual(run([[5], [1], [3], [2], [4]]), [1, 2, 3, 4, 5]);
  console.log('23 ok');
}
