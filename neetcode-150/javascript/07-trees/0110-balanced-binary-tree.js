// 110. Balanced Binary Tree — Easy
// https://leetcode.com/problems/balanced-binary-tree/
// Time O(n) | Space O(h)
//
// Idea: compute height and balance in the same pass, using -1 as a poison value meaning
// "already unbalanced below here". Calling a separate height() at every node instead would
// make this O(n^2) — that regression is the actual point of the problem.

/**
 * @param {TreeNode} root
 * @return {boolean}
 */
const isBalanced = (root) => {
  const height = (node) => {
    if (!node) return 0;
    const left = height(node.left);
    if (left === -1) return -1;
    const right = height(node.right);
    if (right === -1) return -1;
    if (Math.abs(left - right) > 1) return -1;
    return 1 + Math.max(left, right);
  };
  return height(root) !== -1;
};

module.exports = { isBalanced };

if (require.main === module) {
  const assert = require('node:assert');
  const { toTree } = require('../_lib');
  assert.strictEqual(isBalanced(toTree([3, 9, 20, null, null, 15, 7])), true);
  assert.strictEqual(isBalanced(toTree([1, 2, 2, 3, 3, null, null, 4, 4])), false);
  assert.strictEqual(isBalanced(toTree([])), true);
  assert.strictEqual(isBalanced(toTree([1, 2, null, 3])), false); // imbalance deep on the left
  console.log('110 ok');
}
