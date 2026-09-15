// 572. Subtree of Another Tree — Easy
// https://leetcode.com/problems/subtree-of-another-tree/
// Pattern: Trees
// Time O(m * n) worst case | Space O(h)
//
// Idea: at every node of root, ask "is this exact tree equal to subRoot?" (problem 100).
// An empty subRoot is a subtree of anything.
// Faster alternative worth naming: serialise both and search with KMP for O(m + n).

const { isSameTree } = require('./0100-same-tree');

/**
 * @param {TreeNode} root
 * @param {TreeNode} subRoot
 * @return {boolean}
 */
const isSubtree = (root, subRoot) => {
  if (!subRoot) return true;
  if (!root) return false;
  if (isSameTree(root, subRoot)) return true;
  return isSubtree(root.left, subRoot) || isSubtree(root.right, subRoot);
};

module.exports = { isSubtree };

if (require.main === module) {
  const assert = require('node:assert');
  const { toTree } = require('../_lib');
  assert.strictEqual(isSubtree(toTree([3, 4, 5, 1, 2]), toTree([4, 1, 2])), true);
  assert.strictEqual(isSubtree(toTree([3, 4, 5, 1, 2, null, null, null, null, 0]), toTree([4, 1, 2])), false);
  assert.strictEqual(isSubtree(toTree([1, 1]), toTree([1])), true);
  assert.strictEqual(isSubtree(toTree([]), toTree([1])), false);
  console.log('572 ok');
}
