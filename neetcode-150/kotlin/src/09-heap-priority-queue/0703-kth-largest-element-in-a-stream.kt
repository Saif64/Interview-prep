@file:JvmName("KthLargestInStream")
// 703. Kth Largest Element in a Stream — Easy
// https://leetcode.com/problems/kth-largest-element-in-a-stream/
// Pattern: Heap
// Time: add O(log k) | Space O(k)
//
// Idea: problem 215 made incremental. Hold a min-heap capped at k; its top is always the kth
// largest seen so far. The cap is what keeps memory O(k) rather than O(stream length).

package neetcode.heap

import neetcode.lib.eq
import java.util.PriorityQueue

class KthLargest(private val k: Int, nums: IntArray) {
    private val heap = PriorityQueue<Int>()

    init {
        for (n in nums) add(n)
    }

    fun add(value: Int): Int {
        heap.add(value)
        if (heap.size > k) heap.poll()
        return heap.peek()
    }
}

fun main() {
    val s = KthLargest(3, intArrayOf(4, 5, 8, 2))
    eq(s.add(3), 4)
    eq(s.add(5), 5)
    eq(s.add(10), 5)
    eq(s.add(9), 8)
    eq(s.add(4), 8)

    val empty = KthLargest(1, intArrayOf()) // fewer than k elements to start
    eq(empty.add(-3), -3)
    eq(empty.add(-2), -2)
    println("703 ok")
}
