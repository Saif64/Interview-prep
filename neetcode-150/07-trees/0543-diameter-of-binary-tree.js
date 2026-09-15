// 543. Diameter of Binary Tree — Easy
// https://leetcode.com/problems/diameter-of-binary-tree/
// Pattern: Trees
// Time O(n) | Space O(h)
//
// Idea: same two-quantity shape as problem 124 — a node returns its height upward, while
// the answer it contributes is left + right (a path bending at this node).
// Diameter counts edges, not nodes, so a single node has diameter 0.

/**
 * @param {TreeNode} root
 * @return {number}
 */
const diameterOfBinaryTree = (root) => {
  let best = 0;
  const height = (node) => {
    if (!node) return 0;
    const left = height(node.left);
    const right = height(node.right);
    best = Math.max(best, left + right);
    return 1 + Math.max(left, right);
  };
  height(root);
  return best;
};

module.exports = { diameterOfBinaryTree };

if (require.main === module) {
  const assert = require('node:assert');
  const { toTree } = require('../_lib');
  assert.strictEqual(diameterOfBinaryTree(toTree([1, 2, 3, 4, 5])), 3);
  assert.strictEqual(diameterOfBinaryTree(toTree([1, 2])), 1);
  assert.strictEqual(diameterOfBinaryTree(toTree([1])), 0);
  assert.strictEqual(diameterOfBinaryTree(toTree([])), 0);
  // The longest path need not pass through the root: here it is 6-4-2-5-8, bending at
  // node 2, while any path through node 1 is shorter.
  assert.strictEqual(diameterOfBinaryTree(toTree([1, 2, null, 4, 5, 6, 7, 8, 9])), 4);
  console.log('543 ok');
}
