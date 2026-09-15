@file:JvmName("BalancedBinaryTree")
// 110. Balanced Binary Tree — Easy
// https://leetcode.com/problems/balanced-binary-tree/
// Pattern: Trees
// Time O(n) | Space O(h)
//
// Idea: compute height and balance in one pass, using -1 as a poison value meaning "already
// unbalanced below here". Calling a separate height() at every node would make this O(n^2) —
// that regression is the actual point of the problem.

package neetcode.trees

import neetcode.lib.TreeNode
import neetcode.lib.eq
import neetcode.lib.treeOf

fun isBalanced(root: TreeNode?): Boolean {
    fun height(node: TreeNode?): Int {
        if (node == null) return 0
        val left = height(node.left)
        if (left == -1) return -1
        val right = height(node.right)
        if (right == -1) return -1
        if (kotlin.math.abs(left - right) > 1) return -1
        return 1 + maxOf(left, right)
    }
    return height(root) != -1
}

fun main() {
    eq(isBalanced(treeOf(3, 9, 20, null, null, 15, 7)), true)
    eq(isBalanced(treeOf(1, 2, 2, 3, 3, null, null, 4, 4)), false)
    eq(isBalanced(treeOf()), true)
    eq(isBalanced(treeOf(1, 2, null, 3)), false, "imbalance deep on the left")
    println("110 ok")
}
