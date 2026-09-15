@file:JvmName("LowestCommonAncestorBST")
// 235. Lowest Common Ancestor of a Binary Search Tree — Medium
// https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/
// Pattern: Trees
// Time O(h) | Space O(1)
//
// Idea: the BST ordering does all the work. If both targets are smaller than the current
// node, the answer is left; if both are larger, right; the first time they split (or one
// equals the node) you are standing on the LCA. No recursion needed.

package neetcode.trees

import neetcode.lib.TreeNode
import neetcode.lib.eq
import neetcode.lib.treeOf

fun lowestCommonAncestor(root: TreeNode?, p: TreeNode, q: TreeNode): TreeNode? {
    var node = root
    while (node != null) {
        when {
            p.`val` < node.`val` && q.`val` < node.`val` -> node = node.left
            p.`val` > node.`val` && q.`val` > node.`val` -> node = node.right
            else -> return node
        }
    }
    return null
}

fun main() {
    fun find(node: TreeNode?, value: Int): TreeNode {
        var current = node
        while (current!!.`val` != value) {
            current = if (value < current.`val`) current.left else current.right
        }
        return current
    }

    val tree = treeOf(6, 2, 8, 0, 4, 7, 9, null, null, 3, 5)!!
    eq(lowestCommonAncestor(tree, find(tree, 2), find(tree, 8))!!.`val`, 6)
    eq(
        lowestCommonAncestor(tree, find(tree, 2), find(tree, 4))!!.`val`,
        2,
        "ancestor is one of them",
    )
    eq(lowestCommonAncestor(tree, find(tree, 3), find(tree, 5))!!.`val`, 4)
    println("235 ok")
}
