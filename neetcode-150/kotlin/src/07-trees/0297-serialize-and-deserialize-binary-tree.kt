@file:JvmName("SerializeAndDeserializeBinaryTree")
// 297. Serialize and Deserialize Binary Tree — Hard
// https://leetcode.com/problems/serialize-and-deserialize-binary-tree/
// Pattern: Trees
// Time O(n) both ways | Space O(n)
//
// Idea: preorder with an explicit marker for null. Recording the nulls is exactly what makes
// the shape recoverable — a preorder without them is ambiguous.
// Deserialising consumes the same sequence in the same order, so a cursor is enough.

package neetcode.trees

import neetcode.lib.TreeNode
import neetcode.lib.eq
import neetcode.lib.toLevelOrder
import neetcode.lib.treeOf

private const val NULL = "#"

fun serialize(root: TreeNode?): String {
    val out = StringBuilder()
    fun walk(node: TreeNode?) {
        if (node == null) {
            out.append(NULL).append(',')
            return
        }
        out.append(node.`val`).append(',')
        walk(node.left)
        walk(node.right)
    }
    walk(root)
    return out.toString()
}

fun deserialize(data: String): TreeNode? {
    val tokens = data.split(',')
    var i = 0
    fun build(): TreeNode? {
        val token = tokens[i++]
        if (token == NULL) return null
        val node = TreeNode(token.toInt())
        node.left = build()
        node.right = build()
        return node
    }
    return build()
}

fun main() {
    fun roundTrip(values: Array<Int?>) =
        eq(deserialize(serialize(treeOf(*values))).toLevelOrder(), values.toList())

    roundTrip(arrayOf(1, 2, 3, null, null, 4, 5))
    roundTrip(arrayOf())
    roundTrip(arrayOf(1))
    roundTrip(arrayOf(1, 2))
    roundTrip(arrayOf(-1, -2, -3)) // negatives must survive the string round trip
    roundTrip(arrayOf(1, null, 2, null, 3))
    println("297 ok")
}
