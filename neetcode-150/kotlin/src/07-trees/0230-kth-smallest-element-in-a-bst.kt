@file:JvmName("KthSmallestElementInABST")
// 230. Kth Smallest Element in a BST — Medium
// https://leetcode.com/problems/kth-smallest-element-in-a-bst/
// Pattern: Trees
// Time O(h + k) | Space O(h)
//
// Idea: an in-order traversal of a BST emits values in sorted order, so stop at the kth.
// The iterative stack version is used here because it can stop early — the recursive one
// tends to walk the whole tree unless you thread a flag through it.

package neetcode.trees

import neetcode.lib.TreeNode
import neetcode.lib.eq
import neetcode.lib.treeOf

fun kthSmallest(root: TreeNode?, k: Int): Int {
    val stack = ArrayDeque<TreeNode>()
    var node = root
    var remaining = k

    while (node != null || stack.isNotEmpty()) {
        while (node != null) {
            stack.addLast(node)
            node = node.left
        }
        node = stack.removeLast()
        if (--remaining == 0) return node.`val`
        node = node.right
    }
    return -1
}

fun main() {
    eq(kthSmallest(treeOf(3, 1, 4, null, 2), 1), 1)
    eq(kthSmallest(treeOf(5, 3, 6, 2, 4, null, null, 1), 3), 3)
    eq(kthSmallest(treeOf(1), 1), 1)
    eq(kthSmallest(treeOf(3, 1, 4, null, 2), 4), 4, "the largest")
    println("230 ok")
}
