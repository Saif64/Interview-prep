// 199. Binary Tree Right Side View — Medium
// https://leetcode.com/problems/binary-tree-right-side-view/
// Pattern: Trees (BFS)
// Time O(n) | Space O(n)
//
// Idea: level-order traversal, keep the last node of each level. "Rightmost at each depth"
// is not the same as "walk right children" — a deep left subtree can be visible when the
// right side ends early.

/**
 * @param {TreeNode} root
 * @return {number[]}
 */
const rightSideView = (root) => {
  if (!root) return [];
  const out = [];
  let queue = [root];

  while (queue.length) {
    out.push(queue.at(-1).val);
    const next = [];
    for (const node of queue) {
      if (node.left) next.push(node.left);
      if (node.right) next.push(node.right);
    }
    queue = next;
  }
  return out;
};

module.exports = { rightSideView };

if (require.main === module) {
  const assert = require('node:assert');
  const { toTree } = require('../_lib');
  assert.deepStrictEqual(rightSideView(toTree([1, 2, 3, null, 5, null, 4])), [1, 3, 4]);
  assert.deepStrictEqual(rightSideView(toTree([1, null, 3])), [1, 3]);
  assert.deepStrictEqual(rightSideView(toTree([])), []);
  assert.deepStrictEqual(rightSideView(toTree([1, 2, 3, 4])), [1, 3, 4]); // left subtree is deeper
  console.log('199 ok');
}
