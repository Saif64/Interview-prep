// 98. Validate Binary Search Tree — Medium
// https://leetcode.com/problems/validate-binary-search-tree/
// Pattern: Trees
// Time O(n) | Space O(h)
//
// Idea: carry an allowed (low, high) range down the tree. The classic wrong answer only
// compares a node to its immediate children — that accepts trees like [5,1,6,null,null,3,7]
// where 3 is below 5 but sits in the right subtree.

/**
 * @param {TreeNode} root
 * @return {boolean}
 */
const isValidBST = (root) => {
  const check = (node, low, high) => {
    if (!node) return true;
    if (node.val <= low || node.val >= high) return false;
    return check(node.left, low, node.val) && check(node.right, node.val, high);
  };
  return check(root, -Infinity, Infinity);
};

module.exports = { isValidBST };

if (require.main === module) {
  const assert = require('node:assert');
  const { toTree } = require('../_lib');
  assert.strictEqual(isValidBST(toTree([2, 1, 3])), true);
  assert.strictEqual(isValidBST(toTree([5, 1, 4, null, null, 3, 6])), false);
  assert.strictEqual(isValidBST(toTree([5, 1, 6, null, null, 3, 7])), false); // the deep violation
  assert.strictEqual(isValidBST(toTree([])), true);
  assert.strictEqual(isValidBST(toTree([1, 1])), false); // duplicates are not allowed
  console.log('98 ok');
}
