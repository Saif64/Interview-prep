@file:JvmName("ReorderList")
// 143. Reorder List — Medium
// https://leetcode.com/problems/reorder-list/
// Pattern: Linked List
// Time O(n) | Space O(1)
//
// Idea: three standard sub-routines glued together — find the middle (slow/fast), reverse the
// second half, then weave the halves together. Recognising a problem as a composition of
// primitives you already know is most of what "being good at linked lists" means.

package neetcode.linkedlist

import neetcode.lib.ListNode
import neetcode.lib.eq
import neetcode.lib.listOfNodes
import neetcode.lib.toList

fun reorderList(head: ListNode?) {
    if (head?.next == null) return

    // 1. middle
    var slow = head
    var fast = head.next
    while (fast?.next != null) {
        slow = slow!!.next
        fast = fast.next!!.next
    }

    // 2. reverse the second half, cutting it off the first
    var second = slow!!.next
    slow.next = null
    var prev: ListNode? = null
    while (second != null) {
        val next = second.next
        second.next = prev
        prev = second
        second = next
    }

    // 3. weave
    var first: ListNode? = head
    second = prev
    while (second != null) {
        val n1 = first!!.next
        val n2 = second.next
        first.next = second
        second.next = n1
        first = n1
        second = n2
    }
}

fun main() {
    fun run(values: IntArray): List<Int> {
        val head = listOfNodes(*values)
        reorderList(head)
        return head.toList()
    }
    eq(run(intArrayOf(1, 2, 3, 4)), listOf(1, 4, 2, 3))
    eq(run(intArrayOf(1, 2, 3, 4, 5)), listOf(1, 5, 2, 4, 3))
    eq(run(intArrayOf(1)), listOf(1))
    eq(run(intArrayOf(1, 2)), listOf(1, 2))
    eq(run(intArrayOf(1, 2, 3)), listOf(1, 3, 2))
    println("143 ok")
}
