// 100. Same Tree — Easy
// https://leetcode.com/problems/same-tree/
// Pattern: Trees
// Time O(n) | Space O(h)
//
// Idea: structural recursion. Both null -> equal; one null -> not; otherwise values must
// match and both subtrees must match.

/**
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {boolean}
 */
const isSameTree = (p, q) => {
  if (!p && !q) return true;
  if (!p || !q || p.val !== q.val) return false;
  return isSameTree(p.left, q.left) && isSameTree(p.right, q.right);
};

module.exports = { isSameTree };

if (require.main === module) {
  const assert = require('node:assert');
  const { toTree } = require('../_lib');
  assert.strictEqual(isSameTree(toTree([1, 2, 3]), toTree([1, 2, 3])), true);
  assert.strictEqual(isSameTree(toTree([1, 2]), toTree([1, null, 2])), false); // shape matters
  assert.strictEqual(isSameTree(toTree([1, 2, 1]), toTree([1, 1, 2])), false);
  assert.strictEqual(isSameTree(toTree([]), toTree([])), true);
  console.log('100 ok');
}
