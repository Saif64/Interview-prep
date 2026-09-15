@file:JvmName("ConstructBinaryTreeFromPreorderAndInorder")
// 105. Construct Binary Tree from Preorder and Inorder Traversal — Medium
// https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/
// Pattern: Trees
// Time O(n) | Space O(n)
//
// Idea: preorder hands you the root; inorder tells you how many nodes sit in its left
// subtree. Recurse on the two halves.
// The naive version does an indexOf inside the recursion, which is O(n^2) — a precomputed
// value -> index map fixes that. Assumes distinct values, as the problem guarantees.

package neetcode.trees

import neetcode.lib.TreeNode
import neetcode.lib.eq
import neetcode.lib.toLevelOrder

fun buildTree(preorder: IntArray, inorder: IntArray): TreeNode? {
    val position = HashMap<Int, Int>()
    inorder.forEachIndexed { i, value -> position[value] = i }
    var preIndex = 0

    fun build(left: Int, right: Int): TreeNode? {
        if (left > right) return null
        val node = TreeNode(preorder[preIndex++])
        val mid = position[node.`val`]!!
        node.left = build(left, mid - 1)
        node.right = build(mid + 1, right)
        return node
    }
    return build(0, inorder.size - 1)
}

fun main() {
    eq(
        buildTree(intArrayOf(3, 9, 20, 15, 7), intArrayOf(9, 3, 15, 20, 7)).toLevelOrder(),
        listOf<Int?>(3, 9, 20, null, null, 15, 7),
    )
    eq(buildTree(intArrayOf(-1), intArrayOf(-1)).toLevelOrder(), listOf<Int?>(-1))
    eq(buildTree(intArrayOf(), intArrayOf()).toLevelOrder(), emptyList())
    eq(
        buildTree(intArrayOf(1, 2, 3), intArrayOf(3, 2, 1)).toLevelOrder(),
        listOf<Int?>(1, 2, null, 3),
        "left spine",
    )
    println("105 ok")
}
