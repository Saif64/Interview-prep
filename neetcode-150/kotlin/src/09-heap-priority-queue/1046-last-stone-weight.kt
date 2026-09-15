@file:JvmName("LastStoneWeight")
// 1046. Last Stone Weight — Easy
// https://leetcode.com/problems/last-stone-weight/
// Pattern: Heap
// Time O(n log n) | Space O(n)
//
// Idea: a max-heap is a direct translation of the rules — repeatedly take the two heaviest
// stones and push back the difference when they do not cancel out.
// Kotlin has no heap of its own, so java.util.PriorityQueue does the work; it is a min-heap,
// hence reverseOrder().

package neetcode.heap

import neetcode.lib.eq
import java.util.PriorityQueue

fun lastStoneWeight(stones: IntArray): Int {
    val heap = PriorityQueue<Int>(compareByDescending { it })
    for (stone in stones) heap.add(stone)

    while (heap.size > 1) {
        val first = heap.poll()
        val second = heap.poll()
        if (first != second) heap.add(first - second)
    }
    return heap.peek() ?: 0
}

fun main() {
    eq(lastStoneWeight(intArrayOf(2, 7, 4, 1, 8, 1)), 1)
    eq(lastStoneWeight(intArrayOf(1)), 1)
    eq(lastStoneWeight(intArrayOf(2, 2)), 0, "everything cancels")
    eq(lastStoneWeight(intArrayOf()), 0)
    eq(lastStoneWeight(intArrayOf(3, 7, 2)), 2)
    println("1046 ok")
}
