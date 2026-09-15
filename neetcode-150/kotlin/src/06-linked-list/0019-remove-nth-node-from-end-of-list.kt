@file:JvmName("RemoveNthNodeFromEnd")
// 19. Remove Nth Node From End of List — Medium
// https://leetcode.com/problems/remove-nth-node-from-end-of-list/
// Pattern: Linked List (two pointers)
// Time O(n), one pass | Space O(1)
//
// Idea: send a scout n steps ahead, then advance both until the scout falls off the end; the
// trailing pointer is now just before the target. The dummy head is what makes "remove the
// first node" need no special case.

package neetcode.linkedlist

import neetcode.lib.ListNode
import neetcode.lib.eq
import neetcode.lib.listOfNodes
import neetcode.lib.toList

fun removeNthFromEnd(head: ListNode?, n: Int): ListNode? {
    val dummy = ListNode(0, head)
    var slow = dummy
    var fast = dummy

    repeat(n) { fast = fast.next!! }
    while (fast.next != null) {
        slow = slow.next!!
        fast = fast.next!!
    }
    slow.next = slow.next?.next
    return dummy.next
}

fun main() {
    eq(removeNthFromEnd(listOfNodes(1, 2, 3, 4, 5), 2).toList(), listOf(1, 2, 3, 5))
    eq(removeNthFromEnd(listOfNodes(1), 1).toList(), emptyList(), "list becomes empty")
    eq(removeNthFromEnd(listOfNodes(1, 2), 1).toList(), listOf(1))
    eq(removeNthFromEnd(listOfNodes(1, 2), 2).toList(), listOf(2), "removing the head")
    println("19 ok")
}
