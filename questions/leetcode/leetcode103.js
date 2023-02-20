/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[][]}
 */
const zigzagLevelOrder = (root) => {
    if (root === null) return [];

    let level = [root];
    let zigzag = [];
    while (level.length > 0) {
        zigzag.push(level.map(node => node.val));
        level = level.flatMap(node => [node.left, node.right]).filter(Boolean);
        // The flatMap() method returns a new array formed by applying a given callback function to each element of the array, and then flattening the result by one level. It is identical to a map() followed by a flat() of depth 1 (arr.map(...args).flat()), but slightly more efficient than calling those two methods separately.
    }

    return zigzag.map((level, index) => index % 2 === 1 ? level.reverse() : level);
};