@file:JvmName("KthLargestElementInAnArray")
// 215. Kth Largest Element in an Array — Medium
// https://leetcode.com/problems/kth-largest-element-in-an-array/
// Pattern: Heap
// Time O(n log k) | Space O(k)
//
// Idea: keep a min-heap of size k. The smallest thing in it is the kth largest overall, and
// anything smaller than that can be discarded immediately.
// Sorting is O(n log n); Quickselect averages O(n) but degrades to O(n^2) — name all three
// and pick based on whether k is small.

package neetcode.heap

import neetcode.lib.eq
import java.util.PriorityQueue

fun findKthLargest(nums: IntArray, k: Int): Int {
    val heap = PriorityQueue<Int>() // min-heap
    for (n in nums) {
        heap.add(n)
        if (heap.size > k) heap.poll()
    }
    return heap.peek()
}

fun main() {
    eq(findKthLargest(intArrayOf(3, 2, 1, 5, 6, 4), 2), 5)
    eq(findKthLargest(intArrayOf(3, 2, 3, 1, 2, 4, 5, 5, 6), 4), 4)
    eq(findKthLargest(intArrayOf(1), 1), 1)
    eq(findKthLargest(intArrayOf(2, 2, 2), 2), 2, "duplicates count separately")
    eq(findKthLargest(intArrayOf(7, 6, 5, 4, 3, 2, 1), 7), 1)
    println("215 ok")
}
