@file:JvmName("MergeTwoSortedLists")
// 21. Merge Two Sorted Lists — Easy
// https://leetcode.com/problems/merge-two-sorted-lists/
// Pattern: Linked List
// Time O(m + n) | Space O(1) — nodes are relinked, not copied
//
// Idea: the merge step of merge sort. A dummy head removes the "is this the first node?"
// branch, and when one list runs out the other can be attached wholesale.

package neetcode.linkedlist

import neetcode.lib.ListNode
import neetcode.lib.eq
import neetcode.lib.listOfNodes
import neetcode.lib.toList

fun mergeTwoLists(list1: ListNode?, list2: ListNode?): ListNode? {
    val dummy = ListNode()
    var tail = dummy
    var a = list1
    var b = list2

    while (a != null && b != null) {
        if (a.`val` <= b.`val`) {
            tail.next = a
            a = a.next
        } else {
            tail.next = b
            b = b.next
        }
        tail = tail.next!!
    }
    tail.next = a ?: b
    return dummy.next
}

fun main() {
    eq(mergeTwoLists(listOfNodes(1, 2, 4), listOfNodes(1, 3, 4)).toList(), listOf(1, 1, 2, 3, 4, 4))
    eq(mergeTwoLists(listOfNodes(), listOfNodes()).toList(), emptyList())
    eq(mergeTwoLists(listOfNodes(), listOfNodes(0)).toList(), listOf(0))
    eq(mergeTwoLists(listOfNodes(1, 2, 3), listOfNodes()).toList(), listOf(1, 2, 3))
    println("21 ok")
}
