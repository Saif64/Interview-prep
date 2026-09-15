// 104. Maximum Depth of Binary Tree — Easy
// https://leetcode.com/problems/maximum-depth-of-binary-tree/
// Pattern: Trees
// Time O(n) | Space O(h)
//
// Idea: depth(node) = 1 + max(depth(left), depth(right)). The base case carries the
// whole answer. An iterative BFS counting levels is the O(h)-stack-free alternative.

/**
 * @param {TreeNode} root
 * @return {number}
 */
const maxDepth = (root) => (root ? 1 + Math.max(maxDepth(root.left), maxDepth(root.right)) : 0);

module.exports = { maxDepth };

if (require.main === module) {
  const assert = require('node:assert');
  const { toTree } = require('../_lib');
  assert.strictEqual(maxDepth(toTree([3, 9, 20, null, null, 15, 7])), 3);
  assert.strictEqual(maxDepth(toTree([1, null, 2])), 2);
  assert.strictEqual(maxDepth(toTree([])), 0);
  console.log('104 ok');
}
