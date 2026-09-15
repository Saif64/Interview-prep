@file:JvmName("MaximumDepthOfBinaryTree")
// 104. Maximum Depth of Binary Tree — Easy
// https://leetcode.com/problems/maximum-depth-of-binary-tree/
// Pattern: Trees
// Time O(n) | Space O(h)
//
// Idea: depth(node) = 1 + max(depth(left), depth(right)). The base case carries the whole
// answer. An iterative BFS counting levels is the stack-free alternative.

package neetcode.trees

import neetcode.lib.TreeNode
import neetcode.lib.eq
import neetcode.lib.treeOf

fun maxDepth(root: TreeNode?): Int =
    if (root == null) 0 else 1 + maxOf(maxDepth(root.left), maxDepth(root.right))

fun main() {
    eq(maxDepth(treeOf(3, 9, 20, null, null, 15, 7)), 3)
    eq(maxDepth(treeOf(1, null, 2)), 2)
    eq(maxDepth(treeOf()), 0)
    println("104 ok")
}
