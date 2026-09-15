// 226. Invert Binary Tree — Easy
// https://leetcode.com/problems/invert-binary-tree/
// Pattern: Trees
// Time O(n) | Space O(h)
//
// Swap the children, recurse. Famous mostly as the problem Max Howell was rejected over.

/**
 * @param {TreeNode} root
 * @return {TreeNode}
 */
const invertTree = (root) => {
  if (!root) return null;
  [root.left, root.right] = [invertTree(root.right), invertTree(root.left)];
  return root;
};

module.exports = { invertTree };

if (require.main === module) {
  const assert = require('node:assert');
  const { toTree, fromTree } = require('../_lib');
  assert.deepStrictEqual(fromTree(invertTree(toTree([4, 2, 7, 1, 3, 6, 9]))), [4, 7, 2, 9, 6, 3, 1]);
  assert.deepStrictEqual(fromTree(invertTree(toTree([2, 1, 3]))), [2, 3, 1]);
  assert.deepStrictEqual(fromTree(invertTree(toTree([]))), []);
  console.log('226 ok');
}
