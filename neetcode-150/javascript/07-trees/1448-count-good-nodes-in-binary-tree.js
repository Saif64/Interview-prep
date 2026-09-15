// 1448. Count Good Nodes in Binary Tree — Medium
// https://leetcode.com/problems/count-good-nodes-in-binary-tree/
// Pattern: Trees
// Time O(n) | Space O(h)
//
// Idea: carry the maximum seen on the path from the root. A node is "good" when nothing on
// that path was larger. The root is always good, which the -Infinity seed handles for free.

/**
 * @param {TreeNode} root
 * @return {number}
 */
const goodNodes = (root) => {
  const walk = (node, maxSoFar) => {
    if (!node) return 0;
    const isGood = node.val >= maxSoFar ? 1 : 0;
    const nextMax = Math.max(maxSoFar, node.val);
    return isGood + walk(node.left, nextMax) + walk(node.right, nextMax);
  };
  return walk(root, -Infinity);
};

module.exports = { goodNodes };

if (require.main === module) {
  const assert = require('node:assert');
  const { toTree } = require('../_lib');
  assert.strictEqual(goodNodes(toTree([3, 1, 4, 3, null, 1, 5])), 4);
  assert.strictEqual(goodNodes(toTree([3, 3, null, 4, 2])), 3); // ties count as good
  assert.strictEqual(goodNodes(toTree([1])), 1);
  assert.strictEqual(goodNodes(toTree([])), 0);
  console.log('1448 ok');
}
