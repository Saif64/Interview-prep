// 230. Kth Smallest Element in a BST — Medium
// https://leetcode.com/problems/kth-smallest-element-in-a-bst/
// Pattern: Trees
// Time O(h + k) | Space O(h)
//
// Idea: an in-order traversal of a BST emits values in sorted order, so stop at the kth.
// The iterative stack version is used here because it can stop early — the recursive one
// tends to walk the whole tree unless you thread a flag through it.

/**
 * @param {TreeNode} root
 * @param {number} k
 * @return {number}
 */
const kthSmallest = (root, k) => {
  const stack = [];
  let node = root;

  while (node || stack.length) {
    while (node) {
      stack.push(node);
      node = node.left;
    }
    node = stack.pop();
    if (--k === 0) return node.val;
    node = node.right;
  }
  return -1;
};

module.exports = { kthSmallest };

if (require.main === module) {
  const assert = require('node:assert');
  const { toTree } = require('../_lib');
  assert.strictEqual(kthSmallest(toTree([3, 1, 4, null, 2]), 1), 1);
  assert.strictEqual(kthSmallest(toTree([5, 3, 6, 2, 4, null, null, 1]), 3), 3);
  assert.strictEqual(kthSmallest(toTree([1]), 1), 1);
  assert.strictEqual(kthSmallest(toTree([3, 1, 4, null, 2]), 4), 4); // the largest
  console.log('230 ok');
}
