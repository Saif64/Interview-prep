@file:JvmName("DiameterOfBinaryTree")
// 543. Diameter of Binary Tree — Easy
// https://leetcode.com/problems/diameter-of-binary-tree/
// Pattern: Trees
// Time O(n) | Space O(h)
//
// Idea: the two-quantity pattern — a node returns its height upward, while the answer it
// contributes is left + right (a path bending at this node).
// Diameter counts edges, not nodes, so a single node has diameter 0.

package neetcode.trees

import neetcode.lib.TreeNode
import neetcode.lib.eq
import neetcode.lib.treeOf

fun diameterOfBinaryTree(root: TreeNode?): Int {
    var best = 0
    fun height(node: TreeNode?): Int {
        if (node == null) return 0
        val left = height(node.left)
        val right = height(node.right)
        best = maxOf(best, left + right)
        return 1 + maxOf(left, right)
    }
    height(root)
    return best
}

fun main() {
    eq(diameterOfBinaryTree(treeOf(1, 2, 3, 4, 5)), 3)
    eq(diameterOfBinaryTree(treeOf(1, 2)), 1)
    eq(diameterOfBinaryTree(treeOf(1)), 0)
    eq(diameterOfBinaryTree(treeOf()), 0)
    // The longest path bends at node 2 here; any path through the root is shorter.
    eq(diameterOfBinaryTree(treeOf(1, 2, null, 4, 5, 6, 7, 8, 9)), 4)
    println("543 ok")
}
