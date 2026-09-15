// 235. Lowest Common Ancestor of a Binary Search Tree — Medium
// https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/
// Pattern: Trees
// Time O(h) | Space O(1)
//
// Idea: the BST ordering does all the work. If both targets are smaller than the current
// node, the answer is left; if both are larger, right; the first time they split (or one
// equals the node) you are standing on the LCA. No recursion needed.

/**
 * @param {TreeNode} root
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {TreeNode}
 */
const lowestCommonAncestor = (root, p, q) => {
  let node = root;
  while (node) {
    if (p.val < node.val && q.val < node.val) node = node.left;
    else if (p.val > node.val && q.val > node.val) node = node.right;
    else return node;
  }
  return null;
};

module.exports = { lowestCommonAncestor };

if (require.main === module) {
  const assert = require('node:assert');
  const { toTree } = require('../_lib');
  const find = (node, val) => {
    if (!node) return null;
    if (node.val === val) return node;
    return find(val < node.val ? node.left : node.right, val);
  };
  const tree = toTree([6, 2, 8, 0, 4, 7, 9, null, null, 3, 5]);
  assert.strictEqual(lowestCommonAncestor(tree, find(tree, 2), find(tree, 8)).val, 6);
  assert.strictEqual(lowestCommonAncestor(tree, find(tree, 2), find(tree, 4)).val, 2); // ancestor is one of them
  assert.strictEqual(lowestCommonAncestor(tree, find(tree, 3), find(tree, 5)).val, 4);
  console.log('235 ok');
}
