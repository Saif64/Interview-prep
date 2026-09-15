@file:JvmName("ReverseLinkedList")
// 206. Reverse Linked List — Easy
// https://leetcode.com/problems/reverse-linked-list/
// Pattern: Linked List
// Time O(n) | Space O(1)
//
// The three-pointer shuffle that half this folder depends on. Save `next` before overwriting
// `current.next`, or you lose the rest of the list.

package neetcode.linkedlist

import neetcode.lib.ListNode
import neetcode.lib.eq
import neetcode.lib.listOfNodes
import neetcode.lib.toList

fun reverseList(head: ListNode?): ListNode? {
    var prev: ListNode? = null
    var current = head
    while (current != null) {
        val next = current.next
        current.next = prev
        prev = current
        current = next
    }
    return prev
}

/** Recursive variant — O(n) stack, sometimes asked as a follow-up. */
fun reverseListRecursive(head: ListNode?): ListNode? {
    if (head?.next == null) return head
    val newHead = reverseListRecursive(head.next)
    head.next!!.next = head
    head.next = null
    return newHead
}

fun main() {
    for (reverse in listOf(::reverseList, ::reverseListRecursive)) {
        eq(reverse(listOfNodes(1, 2, 3, 4, 5)).toList(), listOf(5, 4, 3, 2, 1))
        eq(reverse(listOfNodes(1, 2)).toList(), listOf(2, 1))
        eq(reverse(listOfNodes()).toList(), emptyList())
        eq(reverse(listOfNodes(7)).toList(), listOf(7))
    }
    println("206 ok")
}
