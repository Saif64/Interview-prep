@file:JvmName("LinkedListCycle")
// 141. Linked List Cycle — Easy
// https://leetcode.com/problems/linked-list-cycle/
// Pattern: Linked List (Floyd's tortoise and hare)
// Time O(n) | Space O(1)
//
// Idea: a fast pointer moving two steps gains one step per iteration on a slow pointer.
// Inside a cycle the gap must eventually hit zero, so they meet. A HashSet of visited nodes
// also works but costs O(n) space — the whole point here is O(1).

package neetcode.linkedlist

import neetcode.lib.ListNode
import neetcode.lib.eq
import neetcode.lib.listOfNodes

fun hasCycle(head: ListNode?): Boolean {
    var slow = head
    var fast = head
    while (fast?.next != null) {
        slow = slow!!.next
        fast = fast.next!!.next
        if (slow === fast) return true
    }
    return false
}

fun main() {
    fun withCycle(values: IntArray, pos: Int): ListNode? {
        val head = listOfNodes(*values) ?: return null
        if (pos < 0) return head
        var tail = head
        while (tail.next != null) tail = tail.next!!
        var target = head
        repeat(pos) { target = target.next!! }
        tail.next = target
        return head
    }

    eq(hasCycle(withCycle(intArrayOf(3, 2, 0, -4), 1)), true)
    eq(hasCycle(withCycle(intArrayOf(1, 2), 0)), true)
    eq(hasCycle(withCycle(intArrayOf(1), -1)), false)
    eq(hasCycle(null), false)
    eq(hasCycle(withCycle(intArrayOf(1), 0)), true, "self-loop")
    println("141 ok")
}
