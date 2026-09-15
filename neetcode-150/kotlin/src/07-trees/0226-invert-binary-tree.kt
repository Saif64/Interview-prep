@file:JvmName("InvertBinaryTree")
// 226. Invert Binary Tree — Easy
// https://leetcode.com/problems/invert-binary-tree/
// Pattern: Trees
// Time O(n) | Space O(h)
//
// Swap the children, recurse. Famous mostly as the problem Max Howell was rejected over.

package neetcode.trees

import neetcode.lib.TreeNode
import neetcode.lib.eq
import neetcode.lib.toLevelOrder
import neetcode.lib.treeOf

fun invertTree(root: TreeNode?): TreeNode? {
    if (root == null) return null
    val left = invertTree(root.left)
    root.left = invertTree(root.right)
    root.right = left
    return root
}

fun main() {
    eq(
        invertTree(treeOf(4, 2, 7, 1, 3, 6, 9)).toLevelOrder(),
        listOf<Int?>(4, 7, 2, 9, 6, 3, 1),
    )
    eq(invertTree(treeOf(2, 1, 3)).toLevelOrder(), listOf<Int?>(2, 3, 1))
    eq(invertTree(treeOf()).toLevelOrder(), emptyList())
    println("226 ok")
}
