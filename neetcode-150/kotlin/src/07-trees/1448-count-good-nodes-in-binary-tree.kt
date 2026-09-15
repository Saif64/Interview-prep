@file:JvmName("CountGoodNodesInBinaryTree")
// 1448. Count Good Nodes in Binary Tree — Medium
// https://leetcode.com/problems/count-good-nodes-in-binary-tree/
// Pattern: Trees
// Time O(n) | Space O(h)
//
// Idea: carry the maximum seen on the path from the root. A node is "good" when nothing on
// that path was larger. The root is always good, which the MIN_VALUE seed handles for free.

package neetcode.trees

import neetcode.lib.TreeNode
import neetcode.lib.eq
import neetcode.lib.treeOf

fun goodNodes(root: TreeNode?): Int {
    fun walk(node: TreeNode?, maxSoFar: Int): Int {
        if (node == null) return 0
        val isGood = if (node.`val` >= maxSoFar) 1 else 0
        val nextMax = maxOf(maxSoFar, node.`val`)
        return isGood + walk(node.left, nextMax) + walk(node.right, nextMax)
    }
    return walk(root, Int.MIN_VALUE)
}

fun main() {
    eq(goodNodes(treeOf(3, 1, 4, 3, null, 1, 5)), 4)
    eq(goodNodes(treeOf(3, 3, null, 4, 2)), 3, "ties count as good")
    eq(goodNodes(treeOf(1)), 1)
    eq(goodNodes(treeOf()), 0)
    println("1448 ok")
}
