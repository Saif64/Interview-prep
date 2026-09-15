// 297. Serialize and Deserialize Binary Tree — Hard
// https://leetcode.com/problems/serialize-and-deserialize-binary-tree/
// Pattern: Trees
// Time O(n) both ways | Space O(n)
//
// Idea: preorder with an explicit marker for null. Recording the nulls is exactly what
// makes the shape recoverable — a preorder without them is ambiguous.
// Deserialising consumes the same sequence in the same order, so a cursor is enough.

const { TreeNode } = require('../_lib');
const NULL = '#';

/**
 * @param {TreeNode} root
 * @return {string}
 */
const serialize = (root) => {
  const out = [];
  const walk = (node) => {
    if (!node) {
      out.push(NULL);
      return;
    }
    out.push(String(node.val));
    walk(node.left);
    walk(node.right);
  };
  walk(root);
  return out.join(',');
};

/**
 * @param {string} data
 * @return {TreeNode}
 */
const deserialize = (data) => {
  const tokens = data.split(',');
  let i = 0;
  const build = () => {
    const token = tokens[i++];
    if (token === NULL) return null;
    const node = new TreeNode(Number(token));
    node.left = build();
    node.right = build();
    return node;
  };
  return build();
};

module.exports = { serialize, deserialize };

if (require.main === module) {
  const assert = require('node:assert');
  const { toTree, fromTree } = require('../_lib');
  const roundTrip = (arr) => assert.deepStrictEqual(fromTree(deserialize(serialize(toTree(arr)))), arr);
  roundTrip([1, 2, 3, null, null, 4, 5]);
  roundTrip([]);
  roundTrip([1]);
  roundTrip([1, 2]);
  roundTrip([-1, -2, -3]); // negative values must survive the string round trip
  roundTrip([1, null, 2, null, 3]);
  console.log('297 ok');
}
