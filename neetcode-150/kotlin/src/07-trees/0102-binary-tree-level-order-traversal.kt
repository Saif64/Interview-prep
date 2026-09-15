@file:JvmName("BinaryTreeLevelOrderTraversal")
// 102. Binary Tree Level Order Traversal — Medium
// https://leetcode.com/problems/binary-tree-level-order-traversal/
// Pattern: Trees (BFS)
// Time O(n) | Space O(n)
//
// Idea: BFS one level at a time — process the whole current level before building the next.
// That is what separates "level order" from a flat BFS, and it generalises to right-side
// view, zigzag, and level averages.

package neetcode.trees

import neetcode.lib.TreeNode
import neetcode.lib.eq
import neetcode.lib.treeOf

fun levelOrder(root: TreeNode?): List<List<Int>> {
    if (root == null) return emptyList()
    val out = ArrayList<List<Int>>()
    var queue = listOf(root)

    while (queue.isNotEmpty()) {
        out.add(queue.map { it.`val` })
        queue = queue.flatMap { listOfNotNull(it.left, it.right) }
    }
    return out
}

fun main() {
    eq(
        levelOrder(treeOf(3, 9, 20, null, null, 15, 7)),
        listOf(listOf(3), listOf(9, 20), listOf(15, 7)),
    )
    eq(levelOrder(treeOf(1)), listOf(listOf(1)))
    eq(levelOrder(treeOf()), emptyList())
    eq(
        levelOrder(treeOf(1, null, 2, null, 3)),
        listOf(listOf(1), listOf(2), listOf(3)),
        "right spine",
    )
    println("102 ok")
}
