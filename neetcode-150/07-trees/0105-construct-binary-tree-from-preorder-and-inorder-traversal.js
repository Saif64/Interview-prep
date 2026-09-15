// 105. Construct Binary Tree from Preorder and Inorder Traversal — Medium
// https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/
// Pattern: Trees
// Time O(n) | Space O(n)
//
// Idea: preorder hands you the root; inorder tells you how many nodes sit in its left
// subtree. Recurse on the two halves.
// The naive version does indexOf inside the recursion, which is O(n^2) — a precomputed
// value -> index map fixes that. This assumes distinct values, as the problem guarantees.

const { TreeNode } = require('../_lib');

/**
 * @param {number[]} preorder
 * @param {number[]} inorder
 * @return {TreeNode}
 */
const buildTree = (preorder, inorder) => {
  const position = new Map(inorder.map((val, i) => [val, i]));
  let preIndex = 0;

  const build = (left, right) => {
    if (left > right) return null;
    const node = new TreeNode(preorder[preIndex++]);
    const mid = position.get(node.val);
    node.left = build(left, mid - 1);
    node.right = build(mid + 1, right);
    return node;
  };
  return build(0, inorder.length - 1);
};

module.exports = { buildTree };

if (require.main === module) {
  const assert = require('node:assert');
  const { fromTree } = require('../_lib');
  assert.deepStrictEqual(fromTree(buildTree([3, 9, 20, 15, 7], [9, 3, 15, 20, 7])), [3, 9, 20, null, null, 15, 7]);
  assert.deepStrictEqual(fromTree(buildTree([-1], [-1])), [-1]);
  assert.deepStrictEqual(fromTree(buildTree([], [])), []);
  assert.deepStrictEqual(fromTree(buildTree([1, 2, 3], [3, 2, 1])), [1, 2, null, 3]); // left spine
  console.log('105 ok');
}
