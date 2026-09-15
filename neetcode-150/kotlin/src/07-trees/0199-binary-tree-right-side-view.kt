@file:JvmName("BinaryTreeRightSideView")
// 199. Binary Tree Right Side View — Medium
// https://leetcode.com/problems/binary-tree-right-side-view/
// Pattern: Trees (BFS)
// Time O(n) | Space O(n)
//
// Idea: level-order traversal, keep the last node of each level. "Rightmost at each depth" is
// not the same as "walk right children" — a deep left subtree can be visible when the right
// side ends early.

package neetcode.trees

import neetcode.lib.TreeNode
import neetcode.lib.eq
import neetcode.lib.treeOf

fun rightSideView(root: TreeNode?): List<Int> {
    if (root == null) return emptyList()
    val out = ArrayList<Int>()
    var queue = listOf(root)

    while (queue.isNotEmpty()) {
        out.add(queue.last().`val`)
        queue = queue.flatMap { listOfNotNull(it.left, it.right) }
    }
    return out
}

fun main() {
    eq(rightSideView(treeOf(1, 2, 3, null, 5, null, 4)), listOf(1, 3, 4))
    eq(rightSideView(treeOf(1, null, 3)), listOf(1, 3))
    eq(rightSideView(treeOf()), emptyList())
    eq(rightSideView(treeOf(1, 2, 3, 4)), listOf(1, 3, 4), "left subtree is deeper")
    println("199 ok")
}
