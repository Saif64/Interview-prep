@file:JvmName("SameTree")
// 100. Same Tree — Easy
// https://leetcode.com/problems/same-tree/
// Pattern: Trees
// Time O(n) | Space O(h)
//
// Idea: structural recursion. Both null -> equal; one null -> not; otherwise values must
// match and both subtrees must match.

package neetcode.trees

import neetcode.lib.TreeNode
import neetcode.lib.eq
import neetcode.lib.treeOf

fun isSameTree(p: TreeNode?, q: TreeNode?): Boolean {
    if (p == null && q == null) return true
    if (p == null || q == null || p.`val` != q.`val`) return false
    return isSameTree(p.left, q.left) && isSameTree(p.right, q.right)
}

fun main() {
    eq(isSameTree(treeOf(1, 2, 3), treeOf(1, 2, 3)), true)
    eq(isSameTree(treeOf(1, 2), treeOf(1, null, 2)), false, "shape matters")
    eq(isSameTree(treeOf(1, 2, 1), treeOf(1, 1, 2)), false)
    eq(isSameTree(treeOf(), treeOf()), true)
    println("100 ok")
}
