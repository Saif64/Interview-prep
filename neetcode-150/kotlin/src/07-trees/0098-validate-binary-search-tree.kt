@file:JvmName("ValidateBinarySearchTree")
// 98. Validate Binary Search Tree — Medium
// https://leetcode.com/problems/validate-binary-search-tree/
// Pattern: Trees
// Time O(n) | Space O(h)
//
// Idea: carry an allowed (low, high) range down the tree. The classic wrong answer only
// compares a node to its immediate children — that accepts trees like [5,1,6,null,null,3,7]
// where 3 is below 5 but sits in the right subtree.
//
// Long is used for the bounds so that a node holding Int.MIN_VALUE or MAX_VALUE still works.

package neetcode.trees

import neetcode.lib.TreeNode
import neetcode.lib.eq
import neetcode.lib.treeOf

fun isValidBST(root: TreeNode?): Boolean {
    fun check(node: TreeNode?, low: Long, high: Long): Boolean {
        if (node == null) return true
        if (node.`val` <= low || node.`val` >= high) return false
        return check(node.left, low, node.`val`.toLong()) &&
            check(node.right, node.`val`.toLong(), high)
    }
    return check(root, Long.MIN_VALUE, Long.MAX_VALUE)
}

fun main() {
    eq(isValidBST(treeOf(2, 1, 3)), true)
    eq(isValidBST(treeOf(5, 1, 4, null, null, 3, 6)), false)
    eq(isValidBST(treeOf(5, 1, 6, null, null, 3, 7)), false, "the deep violation")
    eq(isValidBST(treeOf()), true)
    eq(isValidBST(treeOf(1, 1)), false, "duplicates are not allowed")
    eq(isValidBST(treeOf(Int.MIN_VALUE)), true, "extreme value must not trip the bounds")
    println("98 ok")
}
