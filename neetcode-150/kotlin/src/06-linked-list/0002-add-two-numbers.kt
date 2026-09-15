@file:JvmName("AddTwoNumbers")
// 2. Add Two Numbers — Medium
// https://leetcode.com/problems/add-two-numbers/
// Pattern: Linked List
// Time O(max(m, n)) | Space O(max(m, n)) for the output
//
// Idea: schoolbook addition, least significant digit first (which is how the list is already
// stored). The loop condition includes `carry` so a final 1 still gets a node.

package neetcode.linkedlist

import neetcode.lib.ListNode
import neetcode.lib.eq
import neetcode.lib.listOfNodes
import neetcode.lib.toList

fun addTwoNumbers(l1: ListNode?, l2: ListNode?): ListNode? {
    val dummy = ListNode()
    var tail = dummy
    var a = l1
    var b = l2
    var carry = 0

    while (a != null || b != null || carry != 0) {
        val sum = (a?.`val` ?: 0) + (b?.`val` ?: 0) + carry
        carry = sum / 10
        tail.next = ListNode(sum % 10)
        tail = tail.next!!
        a = a?.next
        b = b?.next
    }
    return dummy.next
}

fun main() {
    eq(addTwoNumbers(listOfNodes(2, 4, 3), listOfNodes(5, 6, 4)).toList(), listOf(7, 0, 8))
    eq(addTwoNumbers(listOfNodes(0), listOfNodes(0)).toList(), listOf(0))
    eq(
        addTwoNumbers(listOfNodes(9, 9, 9, 9, 9, 9, 9), listOfNodes(9, 9, 9, 9)).toList(),
        listOf(8, 9, 9, 9, 0, 0, 0, 1),
    )
    eq(addTwoNumbers(listOfNodes(5), listOfNodes(5)).toList(), listOf(0, 1), "carry adds a node")
    println("2 ok")
}
