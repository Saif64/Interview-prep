// 124. Binary Tree Maximum Path Sum — Hard
// https://leetcode.com/problems/binary-tree-maximum-path-sum/
// Pattern: Trees
// Time O(n) | Space O(h)
//
// Idea: two different quantities, and conflating them is the usual bug.
//   - what a node RETURNS: the best downward path through it, so its parent can extend it
//     (it must pick one child, not both);
//   - what a node CONTRIBUTES to the answer: a path that bends at this node, using both
//     children.
// Clamping negative child sums to 0 encodes "just don't take that branch".

/**
 * @param {TreeNode} root
 * @return {number}
 */
const maxPathSum = (root) => {
  let best = -Infinity;

  const gain = (node) => {
    if (!node) return 0;
    const left = Math.max(gain(node.left), 0);
    const right = Math.max(gain(node.right), 0);
    best = Math.max(best, node.val + left + right); // path bending here
    return node.val + Math.max(left, right); // path continuing upward
  };

  gain(root);
  return best;
};

module.exports = { maxPathSum };

if (require.main === module) {
  const assert = require('node:assert');
  const { toTree } = require('../_lib');
  assert.strictEqual(maxPathSum(toTree([1, 2, 3])), 6);
  assert.strictEqual(maxPathSum(toTree([-10, 9, 20, null, null, 15, 7])), 42);
  assert.strictEqual(maxPathSum(toTree([-3])), -3); // all-negative: must still pick one node
  assert.strictEqual(maxPathSum(toTree([2, -1])), 2);
  console.log('124 ok');
}
