@file:JvmName("MergeKSortedLists")
// 23. Merge k Sorted Lists — Hard
// https://leetcode.com/problems/merge-k-sorted-lists/
// Pattern: Linked List / Heap
// Time O(n log k) | Space O(1) extra
//
// Idea: merge lists pairwise in rounds, halving the count each round — log k rounds over n
// total nodes. A min-heap of list heads gives the same O(n log k) and is worth naming as the
// alternative; this version needs no heap at all.

package neetcode.linkedlist

import neetcode.lib.ListNode
import neetcode.lib.eq
import neetcode.lib.listOfNodes
import neetcode.lib.toList

fun mergeKLists(lists: Array<ListNode?>): ListNode? {
    if (lists.isEmpty()) return null
    var queue = lists.toList()
    while (queue.size > 1) {
        val merged = ArrayList<ListNode?>((queue.size + 1) / 2)
        for (i in queue.indices step 2) {
            merged.add(mergeTwoLists(queue[i], queue.getOrNull(i + 1)))
        }
        queue = merged
    }
    return queue[0]
}

fun main() {
    fun run(arrays: List<List<Int>>) =
        mergeKLists(arrays.map { listOfNodes(*it.toIntArray()) }.toTypedArray()).toList()

    eq(run(listOf(listOf(1, 4, 5), listOf(1, 3, 4), listOf(2, 6))), listOf(1, 1, 2, 3, 4, 4, 5, 6))
    eq(run(emptyList()), emptyList())
    eq(run(listOf(emptyList())), emptyList())
    eq(run(listOf(emptyList(), listOf(1))), listOf(1), "odd count with an empty list")
    eq(run(listOf(listOf(5), listOf(1), listOf(3), listOf(2), listOf(4))), listOf(1, 2, 3, 4, 5))
    println("23 ok")
}
