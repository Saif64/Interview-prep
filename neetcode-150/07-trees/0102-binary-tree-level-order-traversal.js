// 102. Binary Tree Level Order Traversal — Medium
// https://leetcode.com/problems/binary-tree-level-order-traversal/
// Pattern: Trees (BFS)
// Time O(n) | Space O(n)
//
// Idea: BFS, but snapshot the queue length at the top of each round so you know exactly
// how many nodes belong to the current level. That one line is what separates "level order"
// from a flat BFS, and it generalises to right-side-view, zigzag, and level averages.

/**
 * @param {TreeNode} root
 * @return {number[][]}
 */
const levelOrder = (root) => {
  if (!root) return [];
  const out = [];
  let queue = [root];

  while (queue.length) {
    const level = [];
    const next = [];
    for (const node of queue) {
      level.push(node.val);
      if (node.left) next.push(node.left);
      if (node.right) next.push(node.right);
    }
    out.push(level);
    queue = next;
  }
  return out;
};

module.exports = { levelOrder };

if (require.main === module) {
  const assert = require('node:assert');
  const { toTree } = require('../_lib');
  assert.deepStrictEqual(levelOrder(toTree([3, 9, 20, null, null, 15, 7])), [[3], [9, 20], [15, 7]]);
  assert.deepStrictEqual(levelOrder(toTree([1])), [[1]]);
  assert.deepStrictEqual(levelOrder(toTree([])), []);
  assert.deepStrictEqual(levelOrder(toTree([1, null, 2, null, 3])), [[1], [2], [3]]); // right spine
  console.log('102 ok');
}
