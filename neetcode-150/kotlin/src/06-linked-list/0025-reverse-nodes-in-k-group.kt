@file:JvmName("ReverseNodesInKGroup")
// 25. Reverse Nodes in k-Group — Hard
// https://leetcode.com/problems/reverse-nodes-in-k-group/
// Pattern: Linked List
// Time O(n) | Space O(1)
//
// Idea: for each group, first check that k nodes actually exist (a trailing partial group
// must be left alone), then reverse exactly k nodes and stitch the boundaries.
// The pointer bookkeeping is the whole difficulty — draw it before you type it.

package neetcode.linkedlist

import neetcode.lib.ListNode
import neetcode.lib.eq
import neetcode.lib.listOfNodes
import neetcode.lib.toList

fun reverseKGroup(head: ListNode?, k: Int): ListNode? {
    val dummy = ListNode(0, head)
    var groupPrev = dummy

    while (true) {
        // Does a full group of k remain?
        var scout: ListNode? = groupPrev
        repeat(k) { scout = scout?.next }
        if (scout == null) break

        val groupNext = scout!!.next
        var prev = groupNext
        var current = groupPrev.next
        repeat(k) {
            val next = current!!.next
            current!!.next = prev
            prev = current
            current = next
        }

        val newGroupPrev = groupPrev.next!! // old head is the new tail
        groupPrev.next = prev
        groupPrev = newGroupPrev
    }
    return dummy.next
}

fun main() {
    eq(reverseKGroup(listOfNodes(1, 2, 3, 4, 5), 2).toList(), listOf(2, 1, 4, 3, 5))
    eq(
        reverseKGroup(listOfNodes(1, 2, 3, 4, 5), 3).toList(),
        listOf(3, 2, 1, 4, 5),
        "partial tail untouched",
    )
    eq(reverseKGroup(listOfNodes(1, 2, 3, 4, 5), 1).toList(), listOf(1, 2, 3, 4, 5))
    eq(reverseKGroup(listOfNodes(1, 2), 3).toList(), listOf(1, 2), "shorter than k")
    eq(reverseKGroup(listOfNodes(), 2).toList(), emptyList())
    println("25 ok")
}
