@file:JvmName("SubtreeOfAnotherTree")
// 572. Subtree of Another Tree — Easy
// https://leetcode.com/problems/subtree-of-another-tree/
// Pattern: Trees
// Time O(m * n) worst case | Space O(h)
//
// Idea: at every node of root, ask "is this exact tree equal to subRoot?" (problem 100).
// An empty subRoot is a subtree of anything.
// Faster alternative worth naming: serialise both and search with KMP for O(m + n).

package neetcode.trees

import neetcode.lib.TreeNode
import neetcode.lib.eq
import neetcode.lib.treeOf

fun isSubtree(root: TreeNode?, subRoot: TreeNode?): Boolean {
    if (subRoot == null) return true
    if (root == null) return false
    if (isSameTree(root, subRoot)) return true
    return isSubtree(root.left, subRoot) || isSubtree(root.right, subRoot)
}

fun main() {
    eq(isSubtree(treeOf(3, 4, 5, 1, 2), treeOf(4, 1, 2)), true)
    eq(
        isSubtree(treeOf(3, 4, 5, 1, 2, null, null, null, null, 0), treeOf(4, 1, 2)),
        false,
    )
    eq(isSubtree(treeOf(1, 1), treeOf(1)), true)
    eq(isSubtree(treeOf(), treeOf(1)), false)
    println("572 ok")
}
