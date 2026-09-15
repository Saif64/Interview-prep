@file:JvmName("BinaryTreeMaximumPathSum")
// 124. Binary Tree Maximum Path Sum — Hard
// https://leetcode.com/problems/binary-tree-maximum-path-sum/
// Pattern: Trees
// Time O(n) | Space O(h)
//
// Idea: two different quantities, and conflating them is the usual bug.
//   - what a node RETURNS: the best downward path through it, so its parent can extend it
//     (it must pick one child, not both);
//   - what a node CONTRIBUTES to the answer: a path that bends here, using both children.
// Clamping negative child sums to 0 encodes "just don't take that branch".

package neetcode.trees

import neetcode.lib.TreeNode
import neetcode.lib.eq
import neetcode.lib.treeOf

fun maxPathSum(root: TreeNode?): Int {
    var best = Int.MIN_VALUE

    fun gain(node: TreeNode?): Int {
        if (node == null) return 0
        val left = maxOf(gain(node.left), 0)
        val right = maxOf(gain(node.right), 0)
        best = maxOf(best, node.`val` + left + right) // path bending here
        return node.`val` + maxOf(left, right) // path continuing upward
    }

    gain(root)
    return best
}

fun main() {
    eq(maxPathSum(treeOf(1, 2, 3)), 6)
    eq(maxPathSum(treeOf(-10, 9, 20, null, null, 15, 7)), 42)
    eq(maxPathSum(treeOf(-3)), -3, "all-negative: must still pick one node")
    eq(maxPathSum(treeOf(2, -1)), 2)
    println("124 ok")
}
